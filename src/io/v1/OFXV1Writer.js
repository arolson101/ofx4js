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

var inherit = require("../../util/inherit");
var OutputStreamWriter = require("../../util/OutputStreamWriter");
var OFXWriter = require("../OFXWriter");

/**
 * OFX writer to SGML, suitable for OFX versions < 2.0.
 *
 * @class
 */
function OFXV1Writer (/*Uint8Array*/ out) {

  /**
   * @name OFXV1Writer#LINE_SEPARATOR
   * @type String
   */
  this.LINE_SEPARATOR = "\r\n";

  /**
   * @name OFXV1Writer#headersWritten
   * @type boolean
   * @access protected
   */
  this.headersWritten = false;

  /**
   * @name OFXV1Writer#writer
   * @type OutputStreamWriter
   * @access protected
   */
  this.writer = this.newWriter(out);

  /**
   * @name OFXV1Writer#writeAttributesOnNewLine
   * @type boolean
   * @access private
   */
  this.writeAttributesOnNewLine = false;
}

inherit(OFXV1Writer, "implements", OFXWriter);



OFXV1Writer.prototype.newWriter = function(/*OutputStream*/ out) {
  return new OutputStreamWriter(out, "ISO-8859-1");
};


OFXV1Writer.prototype.writeHeaders = function(/*object*/ headers) {
  if (this.headersWritten) {
    throw new Error("Headers have already been written!");
  }

  //write out the 1.0 headers
  this.println("OFXHEADER:100");
  this.println("DATA:OFXSGML");
  this.println("VERSION:102");

  this.print("SECURITY:");
  var security = headers["SECURITY"];
  if (!security) {
    security = "NONE";
  }
  this.println(security);
  this.println("ENCODING:USASCII"); //too many ofx v1 servers don't read unicode...
  this.println("CHARSET:1252"); //windows-compatible.
  this.println("COMPRESSION:NONE");
  this.print("OLDFILEUID:");
  var olduid = headers["OLDFILEUID"];
  if (!olduid) {
    olduid = "NONE";
  }
  this.println(olduid);
  this.print("NEWFILEUID:");
  var uid = headers["NEWFILEUID"];
  if (!uid) {
    uid = "NONE";
  }
  this.println(uid);
  this.println();

  this.headersWritten = true;
};


OFXV1Writer.prototype.writeStartAggregate = function(/*String*/ aggregateName) {
  this.print('<');
  this.print(aggregateName);
  this.print('>');
  if (this.isWriteAttributesOnNewLine()) {
    this.println();
  }
};


OFXV1Writer.prototype.writeElement = function(/*String*/ name, /*String*/ value) {
  if (!value) {
    throw new Error("Illegal element value for element '" + name + "' (value must not be null or empty).");
  }

  //todo: optimize performance of the character escaping
  if (value.indexOf('&') >= 0) {
    value = value.replaceAll("\\&", "&amp;");
  }

  if (value.indexOf('<') >= 0) {
    value = value.replaceAll("<", "&lt;");
  }

  if (value.indexOf('>') >= 0) {
    value = value.replaceAll(">", "&gt;");
  }
  
  this.print('<');
  this.print(name);
  this.print('>');
  this.print(value);
  if (this.isWriteAttributesOnNewLine()) {
    this.println();
  }
};


OFXV1Writer.prototype.writeEndAggregate = function(/*String*/ aggregateName) {
  this.print("</");
  this.print(aggregateName);
  this.print('>');
  if (this.isWriteAttributesOnNewLine()) {
    this.println();
  }
};


OFXV1Writer.prototype.isWriteAttributesOnNewLine = function() {
  return this.writeAttributesOnNewLine;
};


OFXV1Writer.prototype.setWriteAttributesOnNewLine = function(/*boolean*/ writeAttributesOnNewLine) {
  this.writeAttributesOnNewLine = writeAttributesOnNewLine;
};


OFXV1Writer.prototype.close = function() {
  this.flush();
  this.writer.close();
};


OFXV1Writer.prototype.flush = function() {
  this.writer.flush();
};


OFXV1Writer.prototype.println = function(/*String*/ line) {
  if(line !== undefined && line !== null) {
    this.print(line);
  }
  this.writer.write(this.LINE_SEPARATOR);
};


OFXV1Writer.prototype.print = function(/*String*/ line) {
  this.writer.write(!line ? "null" : line);
};



module.exports = OFXV1Writer;
