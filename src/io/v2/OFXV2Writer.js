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

var OFXV1Writer = require("../v1/OFXV1Writer");
var OutputStreamWriter = require("../../util/OutputStreamWriter");

/**
 * OFX writer to XML, suitable for OFX version 2.0.
 *
 * @class
 */
function OFXV2Writer () {
  OFXV1Writer.apply(this, arguments);
}

inherit(OFXV2Writer, "extends", OFXV1Writer);



// @Override
OFXV2Writer.prototype.newWriter = function(/*OutputStream*/ out) {
  return new OutputStreamWriter(out, "UTF-8");
};


OFXV2Writer.prototype.writeHeaders = function(/*object*/ headers) {
  if (this.headersWritten) {
    throw new Error("Headers have already been written!");
  }

  //write out the XML PI
  this.print("<?xml version=\"1.0\" encoding=\"utf-8\" ?>");
  var security = headers.get("SECURITY");
  if (!security) {
    security = "NONE";
  }
  var olduid = headers.get("OLDFILEUID");
  if (!olduid) {
    olduid = "NONE";
  }
  // println(olduid);
  var uid = headers.get("NEWFILEUID");
  if (!uid) {
    uid = "NONE";
  }

  this.print(String.format("<?OFX OFXHEADER=\"200\" VERSION=\"202\" SECURITY=\"%s\" OLDFILEUID=\"%s\" NEWFILEUID=\"%s\"?>", security, olduid, uid));
  this.headersWritten = true;
};


OFXV2Writer.prototype.writeElement = function(/*String*/ name, /*String*/ value) {
  OFXV1Writer.prototype.writeElement.call(this, name, value);
  this.print("</");
  this.print(name);
  this.print('>');
};


// @Override
OFXV2Writer.prototype.isWriteAttributesOnNewLine = function() {
  return false;
};




module.exports = OFXV2Writer;
