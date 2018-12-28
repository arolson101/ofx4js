/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SAXParser } from "sax";
import * as sax from "sax";
import { Log, LogFactory } from "../log/Log";
import { OFXReader } from "./OFXReader";
import { OFXHandler } from "./OFXHandler";
import { DefaultHandler } from "./DefaultHandler";
import { StringReader } from "./StringReader";
import { OFXParseException } from "./OFXParseException";
import { OFXV2ContentHandler } from "./OFXV2ContentHandler";

var LOG: Log;

function arraysEqual(a1: Array<string>, a2: Array<string>) {
  if(a1.length !== a2.length) {
    return false;
  }
  for(var i=0; i<a1.length; i++) {
    if(a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}


/**
 * Base class for an OFX reader.  Parses the headers and determines whether we're parsing an
 * OFX v2 or OFX v1 element.  For OFX v2, uses a standard SAX library.
 *
 * @author Ryan Heaton
 */
export /*abstract*/ class BaseOFXReader implements OFXReader {
  public static OFX_2_PROCESSING_INSTRUCTION_PATTERN: RegExp = /<\\?OFX ([^\\?]+)\\?>/;
  private contentHandler: OFXHandler;

  constructor() {
    this.contentHandler = new DefaultHandler();
  }

  /**
   * The content handler.
   *
   * @return The content handler.
   */
  public getContentHandler(): OFXHandler {
    return this.contentHandler;
  }

  /**
   * The content handler.
   *
   * @param handler The content handler.
   */
  public setContentHandler(handler: OFXHandler): void {
    this.contentHandler = handler;
  }

  /**
   * Parse the reader, including the headers.
   *
   * @param reader The reader.
   */
  public parse(reader: StringReader): void  {
    var header: string = "";
    var firstElementStart = this.getFirstElementStart();
    var buffer: Array<string> = new Array(firstElementStart.length);
    reader.mark(/*firstElementStart.length*/);
    var ch: any = reader.read(buffer);
    while ((ch != -1) && (!arraysEqual(buffer, firstElementStart))) {
      if (!this.contains(buffer, '<')) {
        //if the buffer contains a '<', then we might already have marked the beginning.
        reader.mark(/*firstElementStart.length*/);
      }
      ch = reader.read();
      var shifted: string = this.shiftAndAppend(buffer, ch);
      header += shifted;
    }

    if (ch == -1) {
      throw new OFXParseException("Invalid OFX: no root <OFX> element!");
    }
    else {
      var matches = BaseOFXReader.OFX_2_PROCESSING_INSTRUCTION_PATTERN.exec(header);
      if (matches) {
        if (LOG.isInfoEnabled()) {
          LOG.info("Processing OFX 2 header...");
        }

        this.processOFXv2Headers(matches[1]);
        reader.reset();
        this.parseV2FromFirstElement(reader.remainder());
      }
      else {
        LOG.info("Processing OFX 1 headers...");
        this.processOFXv1Headers(header);
        reader.reset();
        this.parseV1FromFirstElement(reader.remainder());
      }
    }
  }

  /**
   * The first characters of the first OFX element, '<', 'O', 'F', 'X'
   *
   * @return The first characters of the OFX element.
   */
  protected getFirstElementStart(): Array<string> {
    return [ '<', 'O', 'F', 'X' ];
  }

  /**
   * Whether the specified buffer contains the specified character.
   *
   * @param buffer The buffer.
   * @param c The character to search for.
   * @return Whether the specified buffer contains the specified character.
   */
  private contains(buffer: Array<string>, c: string): boolean {
    for (var i=0; i<buffer.length; i++) {
      var ch = buffer[i];
      if (ch === c) {
        return true;
      }
    }
    return false;
  }

  private shiftAndAppend(buffer: Array<string>, c: string): string {
    var shifted = buffer[0];
    for (var i = 0; i + 1 < buffer.length; i++) {
      buffer[i] = buffer[i + 1];
    }
    buffer[buffer.length - 1] = c;
    return shifted;
  }

  /**
   * Parse an OFX version 1 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
   *
   * @param text The text.
   */
  protected parseV1FromFirstElement(text: string): void {
    var strict = false;
    var parser: SAXParser = sax.parser(strict, {});
    var handler = new OFXV2ContentHandler(this.getContentHandler());
    handler.install(parser);
    parser.write(text);
  }

  /**
   * Parse an OFX version 2 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
   *
   * @param text The text.
   */
  protected parseV2FromFirstElement(text: string): void {
    var strict = true;
    var parser: SAXParser = sax.parser(strict, {});
    var handler = new OFXV2ContentHandler(this.getContentHandler());
    handler.install(parser);
    parser.write(text);
  }

  /**
   * Process the given characters as OFX version 1 headers.
   *
   * @param chars The characters to process.
   */
  protected processOFXv1Headers(chars: string): void {
    var lines: Array<string> = chars.split(/(\n|\r\n)/);
    for(var i=0; i<lines.length; i++) {
      var line: string = lines[i];
      var colonIndex: number = line.indexOf(':');
      if (colonIndex >= 0) {
        var name: string = line.substring(0, colonIndex);
        var value: string = line.length > colonIndex ? line.substring(colonIndex + 1) : "";
        this.contentHandler.onHeader(name, value);
      }
    }
  }

  /**
   * Process the given characters as OFX version 2 headers.
   *
   * @param chars The characters to process.
   */
  protected processOFXv2Headers(chars: string) /*throws OFXParseException*/: void {
    var nameValuePairs: string[] = chars.split("\\s+");
    for (var nameValuePair of nameValuePairs) {
      var equalsIndex: number = nameValuePair.indexOf('=');
      if (equalsIndex >= 0) {
        var name: string = nameValuePair.substring(0, equalsIndex);
        var value: string = nameValuePair.length > equalsIndex ? nameValuePair.substring(equalsIndex + 1) : "";
        value = value.replace('"', ' ');
        value = value.replace('\'', ' ');
        value = value.trim();
        this.contentHandler.onHeader(name, value);
      }
    }
  }
}

LOG = LogFactory.getLog(BaseOFXReader);
