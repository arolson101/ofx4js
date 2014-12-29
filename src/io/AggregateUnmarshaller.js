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

//var NanoXMLOFXReader = require("io/nanoxml/NanoXMLOFXReader");
var DefaultStringConversion = require("./DefaultStringConversion");
var AggregateStackContentHandler = require("./AggregateStackContentHandler");
var BaseOFXReader = require("./BaseOFXReader");

/**
 * Unmarshaller for aggregate objects.
 * 
 * @class
 */
function AggregateUnmarshaller (clazz) {

  /**
   * @name AggregateUnmarshaller#clazz
   * @type Class
   * @access private
   */
  this.clazz = clazz;

  /**
   * @name AggregateUnmarshaller#conversion
   * @type StringConversion
   * @access private
   */
  this.conversion = new DefaultStringConversion();
}




AggregateUnmarshaller.prototype.unmarshal = function(/*InputStream*/ stream) {
  var aggregate = this.clazz.newInstance();
  var reader = this.newReader();
  reader.setContentHandler(new AggregateStackContentHandler(aggregate, this.getConversion()));
  reader.parse(stream);
  return aggregate;
};


AggregateUnmarshaller.prototype.unmarshal = function(/*Reader*/ reader) {
  var aggregate = this.clazz.newInstance();
  var ofxReader = this.newReader();
  ofxReader.setContentHandler(new AggregateStackContentHandler(aggregate, this.getConversion()));
  ofxReader.parse(reader);
  return aggregate;
};


/**
 * New OFX reader.
 *
 * @return {OFXReader} new OFX reader.
 */
AggregateUnmarshaller.prototype.newReader = function() {
  return new BaseOFXReader/*NanoXMLOFXReader*/();
};


/**
 * The conversion.
 *
 * @return {StringConversion} The conversion.
 */
AggregateUnmarshaller.prototype.getConversion = function() {
  return this.conversion;
};


/**
 * The conversion.
 *
 * @param {StringConversion} conversion The conversion.
 */
AggregateUnmarshaller.prototype.setConversion = function(conversion) {
  this.conversion = conversion;
};




module.exports = AggregateUnmarshaller;
