///*
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *   http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */
//
//"use strict";
//
//var inherit = require("../inherit");
//
//var RequestEnvelope = require("domain/data/RequestEnvelope");
//var ResponseEnvelope = require("domain/data/ResponseEnvelope");
//var OFXParseException = require("io/OFXParseException");
//var OFXWriter = require("io/OFXWriter");
//var AggregateMarshaller = require("io/AggregateMarshaller");
//var OFXV1Writer = require("io/v1/OFXV1Writer");
//var AggregateUnmarshaller = require("io/AggregateUnmarshaller");
//
///**
// * Base implementation for an OFX connection.
// *
// * @class
// */
//function OFXV1Connection () {
//
//  /**
//   * @name OFXV1Connection#LOG
//   * @type Log
//   */
//  this.LOG = LogFactory.getLog(OFXV1Connection.class);
//
//  /**
//   * @name OFXV1Connection#marshaller
//   * @type AggregateMarshaller
//   * @access private
//   */
//  this.marshaller = new AggregateMarshaller();
//
//  /**
//   * @name OFXV1Connection#unmarshaller
//   * @type AggregateUnmarshaller<ResponseEnvelope>
//   * @access private
//   */
//  this.unmarshaller = new AggregateUnmarshaller<ResponseEnvelope>(ResponseEnvelope.class);
//}
//
//inherit(OFXV1Connection, "implements", OFXConnection);
//
//
//
//
//// Inherited.
//OFXV1Connection.prototype.sendRequest = function(/*RequestEnvelope*/ request, /*URL*/ url) {
//  try {
//    if (!url.getProtocol().toLowerCase().startsWith("http")) {
//      throw new IllegalArgumentException("Invalid URL: " + url + " only http(s) is supported.");
//    }
//
//    //marshal to memory so we can determine the size...
//    ByteArrayOutputStream outBuffer = new ByteArrayOutputStream();
//    OFXWriter ofxWriter = newOFXWriter(outBuffer);
//    getMarshaller().marshal(request, ofxWriter);
//    ofxWriter.close();
//    logRequest(outBuffer);
//    InputStream in = sendBuffer(url, outBuffer);
//    return unmarshal(in);
//  }
//  catch (IOException e) {
//    throw new OFXConnectionException(e);
//  }
//};
//
//
///**
// * Log a request buffer.
// *
// * @param {ByteArrayOutputStream} outBuffer The buffer to log.
// */
//OFXV1Connection.prototype.logRequest = function(outBuffer) {
//  if (LOG.isInfoEnabled()) {
//    LOG.info("Marshalling " + outBuffer.size() + " bytes of the OFX request.");
//    if (LOG.isDebugEnabled()) {
//      LOG.debug(outBuffer.toString("utf-8"));
//    }
//  }
//};
//
//
///**
// * Send the specified buffer to the specified URL.
// *
// * @param {URL} url The URL.
// * @param {ByteArrayOutputStream} outBuffer The buffer.
// * @return {InputStream} The response.
// */
//OFXV1Connection.prototype.sendBuffer = function(url, outBuffer) {
//  HttpURLConnection connection = openConnection(url);
//  connection.setRequestMethod("POST");
//  connection.setRequestProperty("Content-Type", "application/x-ofx");
//  connection.setRequestProperty("Content-Length", String.valueOf(outBuffer.size()));
//  connection.setRequestProperty("Accept", "*/*, application/x-ofx");
//  connection.setDoOutput(true);
//  connection.connect();
//
//  OutputStream out  = connection.getOutputStream();
//  out.write(outBuffer.toByteArray());
//
//  InputStream in;
//  int responseCode = connection.getResponseCode();
//  if (responseCode >= 200 && responseCode < 300) {
//    in = connection.getInputStream();
//  }
//  else if (responseCode >= 400 && responseCode < 500) {
//    throw new OFXServerException("Error with client request: " + connection.getResponseMessage(), responseCode);
//  }
//  else {
//    throw new OFXServerException("Invalid response code from OFX server: " + connection.getResponseMessage(), responseCode);
//  }
//
//  return in;
//};
//
//
///**
// * Unmarshal the input stream.
// *
// * @param {InputStream} in The input stream.
// * @return {ResponseEnvelope} The response envelope.
// */
//OFXV1Connection.prototype.unmarshal = function(in) {
//  try {
//    return getUnmarshaller().unmarshal(in);
//  }
//  catch (OFXParseException e) {
//    throw new OFXConnectionException("Unable to parse the OFX response.", e);
//  }
//};
//
//
///**
// * Open a connection to the specified URL.
// *
// * @param {URL} url The URL.
// * @return {HttpURLConnection} The connection.
// */
//OFXV1Connection.prototype.openConnection = function(url) {
//  return (HttpURLConnection) url.openConnection();
//};
//
//
///**
// * Create a new OFX writer.
// *
// * @param {OutputStream} out The output stream for the writer.
// * @return {OFXWriter} The OFX writer.
// */
//OFXV1Connection.prototype.newOFXWriter = function(out) {
//  return new OFXV1Writer(out);
//};
//
//
///**
// * The marshaller.
// *
// * @return {AggregateMarshaller} The marshaller.
// */
//OFXV1Connection.prototype.getMarshaller = function() {
//  return marshaller;
//};
//
//
///**
// * The marshaller.
// *
// * @param {AggregateMarshaller} marshaller The marshaller.
// */
//OFXV1Connection.prototype.setMarshaller = function(marshaller) {
//  this.marshaller = marshaller;
//};
//
//
///**
// * The unmarshaller.
// *
// * @return {AggregateUnmarshaller<ResponseEnvelope>} The unmarshaller.
// */
//OFXV1Connection.prototype.getUnmarshaller = function() {
//  return unmarshaller;
//};
//
//
///**
// * The unmarshaller.
// *
// * @param {AggregateUnmarshaller<ResponseEnvelope>} unmarshaller The unmarshaller.
// */
//OFXV1Connection.prototype.setUnmarshaller = function(unmarshaller) {
//  this.unmarshaller = unmarshaller;
//};
//
//
//
//
//module.exports = OFXV1Connection;
