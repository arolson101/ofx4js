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
import { OFXV1Writer } from "../v1/OFXV1Writer";
import { OutputBuffer, StreamWriter } from "../StreamWriter";
import { StringMap } from "../../collections/collections";
import { OFXException } from "../../OFXException";


/**
 * OFX writer to XML, suitable for OFX version 2.0.
 *
 * @author Ryan Heaton
 */
export class OFXV2Writer extends OFXV1Writer {

  constructor(out: OutputBuffer | StreamWriter) {
    super(out);
  }

  //@Override
  protected newWriter(out: OutputBuffer) /*throws UnsupportedEncodingException*/: StreamWriter {
    return new StreamWriter(out, "UTF-8");
  }

  public writeHeaders(headers: StringMap) /*throws IOException*/: void {
    if (this.headersWritten) {
      throw new OFXException("Headers have already been written!");
    }

    //write out the XML PI
    this.print("<?xml version=\"1.0\" encoding=\"utf-8\" ?>");
    var security: string = headers["SECURITY"];
    if (security == null) {
      security = "NONE";
    }
    var olduid: string = headers["OLDFILEUID"];
    if (olduid == null) {
      olduid = "NONE";
    }
    // println(olduid);
    var uid: string = headers["NEWFILEUID"];
    if (uid == null) {
      uid = "NONE";
    }

    this.print("<?OFX OFXHEADER=\"200\" VERSION=\"202\" SECURITY=\"" + security + "\" OLDFILEUID=\"" + olduid + "\" NEWFILEUID=\"" + uid + "\"?>");
    this.headersWritten = true;
  }

  public writeElement(name: string, value: string): void {
    super.writeElement(name, value);
    this.print("</");
    this.print(name);
    this.print('>');
  }

  //@Override
  public isWriteAttributesOnNewLine(): boolean {
    return false;
  }
}
