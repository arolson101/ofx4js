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

/*global XMLHttpRequest*/

"use strict";

var inherit = require("../../util/inherit");

var ResponseEnvelope = require("../../domain/data/ResponseEnvelope");
var OFXConnection = require("./OFXConnection");
var AggregateMarshaller = require("../../io/AggregateMarshaller");
var OFXV1Writer = require("../../io/v1/OFXV1Writer");
var AggregateUnmarshaller = require("../../io/AggregateUnmarshaller");
var LOG = require("../../util/log");

/**
 * Base implementation for an OFX connection.
 *
 * @class
 */
function OFXV1Connection () {

  /**
   * @name OFXV1Connection#marshaller
   * @type AggregateMarshaller
   * @access private
   */
  this.marshaller = new AggregateMarshaller();

  /**
   * @name OFXV1Connection#unmarshaller
   * @type AggregateUnmarshaller<ResponseEnvelope>
   * @access private
   */
  this.unmarshaller = new AggregateUnmarshaller(ResponseEnvelope);
  
  /**
   * @name OFXV1Connection#async
   * @type bool
   * @access private
   */
  this.async = true;
}

inherit(OFXV1Connection, "implements", OFXConnection);




// Inherited.
OFXV1Connection.prototype.sendRequest = function(/*RequestEnvelope*/ request, /*URL*/ url) {
  //marshal to memory so we can determine the size...
  var outBuffer = [];
  var ofxWriter = this.newOFXWriter(outBuffer);
  this.getMarshaller().marshal(request, ofxWriter);
  ofxWriter.close();
  this.logRequest(outBuffer);
  var self = this;
  return self.sendBuffer(url, outBuffer)
  .then(function(in_) {
    self.logResponse(in_);
    return self.unmarshal(in_);
  });
};


/**
 * Log a request buffer.
 *
 * @param {ByteArrayOutputStream} outBuffer The buffer to log.
 */
OFXV1Connection.prototype.logRequest = function(outBuffer) {
  if (LOG.network) {
    console.log("Sending OFX request:", outBuffer.join(""));
  }
};


/**
 * Log a response buffer.
 *
 * @param {ByteArrayOutputStream} outBuffer The buffer to log.
 */
OFXV1Connection.prototype.logResponse = function(inBuffer) {
  if (LOG.network) {
    console.log("Received OFX response:", inBuffer);
  }
};


/**
 * Send the specified buffer to the specified URL.
 *
 * @param {URL} url The URL.
 * @param {ByteArrayOutputStream} outBuffer The buffer.
 * @return {Promise<string>} The response.
 */
OFXV1Connection.prototype.sendBuffer = function(url, outBuffer) {
  var outText = outBuffer.join("");
  //outText = outText.replace(/(\r\n|\n|\r)/gm, "\r\n");
  var async = this.getAsync();
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    var onloadCalled = false;
    request.open("POST", url, async);
    request.setRequestHeader("Content-Type", "application/x-ofx");
    //request.setRequestHeader("Content-Length", outBuffer.length);
    request.setRequestHeader("Accept", "*/*, application/x-ofx");
    request.onload = function() {
      onloadCalled = true;
      if (request.status >= 200 && request.status < 300) {
        resolve(request.responseText);
      } else if (request.status >= 400 && request.status < 500) {
        reject(Error("Error " + request.status + " with client request: " + request.responseText));
      } else {
        reject(Error("Invalid response code from OFX server: " + request.status));
      }
    };
    request.onerror = function() {
      reject(Error("Network error"));
    };
    
    request.send(outText);
    
    if (!async && !onloadCalled) {
      request.onload();
    }
  });
};


/**
 * Unmarshal the input stream.
 *
 * @param {string} in_ The input text.
 * @return {ResponseEnvelope} The response envelope.
 */
OFXV1Connection.prototype.unmarshal = function(in_) {
  return this.getUnmarshaller().unmarshal(in_);
};


/**
 * Create a new OFX writer.
 *
 * @param {OutputStream} out The output stream for the writer.
 * @return {OFXWriter} The OFX writer.
 */
OFXV1Connection.prototype.newOFXWriter = function(out) {
  return new OFXV1Writer(out);
};


/**
 * The marshaller.
 *
 * @return {AggregateMarshaller} The marshaller.
 */
OFXV1Connection.prototype.getMarshaller = function() {
  return this.marshaller;
};


/**
 * The marshaller.
 *
 * @param {AggregateMarshaller} marshaller The marshaller.
 */
OFXV1Connection.prototype.setMarshaller = function(marshaller) {
  this.marshaller = marshaller;
};


/**
 * The unmarshaller.
 *
 * @return {AggregateUnmarshaller<ResponseEnvelope>} The unmarshaller.
 */
OFXV1Connection.prototype.getUnmarshaller = function() {
  return this.unmarshaller;
};


/**
 * The unmarshaller.
 *
 * @param {AggregateUnmarshaller<ResponseEnvelope>} unmarshaller The unmarshaller.
 */
OFXV1Connection.prototype.setUnmarshaller = function(unmarshaller) {
  this.unmarshaller = unmarshaller;
};



/**
 * Async mode
 *
 * @return {bool} Whether in async mode.
 */
OFXV1Connection.prototype.getAsync = function() {
  return this.async;
};


/**
 * Async mode
 *
 * @param {bool} async async mode.
 */
OFXV1Connection.prototype.setAsync = function(async) {
  this.async = async;
};



module.exports = OFXV1Connection;
