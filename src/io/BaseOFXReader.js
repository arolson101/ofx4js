/*
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

"use strict";

var inherit = require("../util/inherit");
var DefaultHandler = require("./DefaultHandler");
var OFXReader = require("./OFXReader");
var OFXV2ContentHandler = require("./OFXV2ContentHandler");
var StringReader = require("../util/StringReader");
var LOG = require("../util/log");
var sax = require("sax");


/**
 * @type RegExp
 */
var OFX_2_PROCESSING_INSTRUCTION_PATTERN = /<\\?OFX ([^\\?]+)\\?>/;


/**
 * Base class for an OFX reader.  Parses the headers and determines whether we're parsing an
 * OFX v2 or OFX v1 element.  For OFX v2, uses a standard SAX library.
 *
 * @class
 */
function BaseOFXReader () {
  /**
   * @name BaseOFXReader#contentHandler
   * @type OFXHandler
   * @access private
   */
  this.contentHandler = new DefaultHandler();
}

inherit(BaseOFXReader, "implements", OFXReader);




/**
 * The content handler.
 *
 * @return {OFXHandler} The content handler.
 */
BaseOFXReader.prototype.getContentHandler = function() {
  return this.contentHandler;
};


/**
 * The content handler.
 *
 * @param {OFXHandler} handler The content handler.
 */
BaseOFXReader.prototype.setContentHandler = function(handler) {
  this.contentHandler = handler;
};


function arraysEqual(a1, a2) {
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
 * Parse the text, including the headers.
 *
 * @param {String} text The text to parse.
 */
BaseOFXReader.prototype.parse = function(text) {
  var header = "";
  var reader = new StringReader(text);
  var firstElementStart = this.getFirstElementStart();
  var buffer = new Array(firstElementStart.length);
  reader.mark(firstElementStart.length);
  var ch = reader.read(buffer);
  while ((ch != -1) && (!arraysEqual(buffer, firstElementStart))) {
    if (!this.contains(buffer, '<')) {
      //if the buffer contains a '<', then we might already have marked the beginning.
      reader.mark(firstElementStart.length);
    }
    ch = reader.read();
    var shifted = this.shiftAndAppend(buffer, ch);
    header += shifted;
  }

  if (ch == -1) {
    throw new Error("Invalid OFX: no root <OFX> element!");
  }
  else {
    var matches = OFX_2_PROCESSING_INSTRUCTION_PATTERN.exec(header);
    if (matches) {
      if (LOG.enabled) {
        console.log("Processing OFX 2 header...");
      }
      this.processOFXv2Headers(matches[1]);
      reader.reset();
      this.parseV2FromFirstElement(reader.remainder());
    }
    else {
      if (LOG.enabled) {
        console.log("Processing OFX 1 headers...");
      }
      this.processOFXv1Headers(header);
      reader.reset();
      this.parseV1FromFirstElement(reader.remainder());
    }
  }
};


/**
 * The first characters of the first OFX element, '<', 'O', 'F', 'X'
 *
 * @return {} The first characters of the OFX element.
 */
BaseOFXReader.prototype.getFirstElementStart = function() {
  return [ '<', 'O', 'F', 'X' ];
};


/**
 * Whether the specified buffer contains the specified character.
 *
 * @param {} buffer The buffer.
 * @param {} c The character to search for.
 * @return {boolean} Whether the specified buffer contains the specified character.
 */
BaseOFXReader.prototype.contains = function(buffer, /*char*/ c) {
  for (var i=0; i<buffer.length; i++) {
    var ch = buffer[i];
    if (ch === c) {
      return true;
    }
  }
  return false;
};


BaseOFXReader.prototype.shiftAndAppend = function(buffer, /*char*/ c) {
  var shifted = buffer[0];
  for (var i = 0; i + 1 < buffer.length; i++) {
    buffer[i] = buffer[i + 1];
  }
  buffer[buffer.length - 1] = c;
  return shifted;
};


/**
 * Parse an OFX version 1 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
 *
 * @param {Reader} reader The reader.
 */
BaseOFXReader.prototype.parseV1FromFirstElement = function(text) {
  var strict = false;
  var parser = sax.parser(strict);
  var handler = new OFXV2ContentHandler(this.getContentHandler());
  handler.install(parser);
  parser.write(text);
};


/**
 * Parse an OFX version 2 stream from the first OFX element (defined by the {@link #getFirstElementStart() first element characters}).
 *
 * @param {string} text The text.
 */
BaseOFXReader.prototype.parseV2FromFirstElement = function(text) {
  var strict = true;
  var parser = sax.parser(strict);
  var handler = new OFXV2ContentHandler(this.getContentHandler());
  handler.install(parser);
  parser.write(text);
};

/**
 * Process the given characters as OFX version 1 headers.
 *
 * @param {String} chars The characters to process.
 */
BaseOFXReader.prototype.processOFXv1Headers = function(chars) {
  var lines = chars.split(/(\n|\r\n)/);
  for(var line in lines) {
    var colonIndex = line.indexOf(':');
    if (colonIndex >= 0) {
      var name = line.substring(0, colonIndex);
      var value = line.length > colonIndex ? line.substring(colonIndex + 1) : "";
      this.contentHandler.onHeader(name, value);
    }
  }
};

/**
 * Process the given characters as OFX version 2 headers.
 *
 * @param {String} chars The characters to process.
 */
BaseOFXReader.prototype.processOFXv2Headers = function(chars) {
  var nameValuePairs = chars.split("\\s+");
  for (var nameValuePair in nameValuePairs) {
    var equalsIndex = nameValuePair.indexOf('=');
    if (equalsIndex >= 0) {
      var name = nameValuePair.substring(0, equalsIndex);
      var value = nameValuePair.length > equalsIndex ? nameValuePair.substring(equalsIndex + 1) : "";
      value = value.replace('"', ' ');
      value = value.replace('\'', ' ');
      value = value.trim();
      this.contentHandler.onHeader(name, value);
    }
  }
};




module.exports = BaseOFXReader;
