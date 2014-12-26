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

var Aggregate = require("../../meta/Aggregate");
var ChildAggregate = require("../../meta/ChildAggregate");
var Header = require("../../meta/Header");
var ApplicationSecurity = require("./ApplicationSecurity");
var UUID = require("uuid");

/**
 * Envelope for enclosing an OFX request.
 *
 * @class
 * @see "Section 2.4.3, OFX Spec"
 */
function RequestEnvelope () {

  /**
   * @name RequestEnvelope#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = ApplicationSecurity.NONE;

  /**
   * @name RequestEnvelope#UID
   * @type String
   * @access private
   */
  this.UID = null;

  /**
   * @name RequestEnvelope#lastProcessedUID
   * @type String
   * @access private
   */
  this.lastProcessedUID = null;

  /**
   * @name RequestEnvelope#messageSets
   * @type SortedSet<RequestMessageSet>
   * @access private
   */
  this.messageSets = null;
}



Aggregate.add("OFX", RequestEnvelope);


//headers
//content
RequestEnvelope.prototype.RequestEnvelope = function() {
  this.UID = UUID.v4();
};


RequestEnvelope.prototype.RequestEnvelope = function(/*String*/ UID) {
  this.UID = UID;
};


/**
 * The security of this envelope.
 *
 * @return {ApplicationSecurity} The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getSecurity = function() {
  return this.security;
};
Header.add(RequestEnvelope, {name: "SECURITY", attributeType: ApplicationSecurity, readMethod: "getSecurity", writeMethod: "setSecurity"});


/**
 * The security of this envelope.
 *
 * @param {ApplicationSecurity} security The security of this envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * The UID for the envelope.
 *
 * @return {String} The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getUID = function() {
  return this.UID;
};
Header.add(RequestEnvelope, {name: "NEWFILEUID", attributeType: String, readMethod: "getUID", writeMethod: "setUID"});


/**
 * The UID for the envelope.
 *
 * @param {String} UID The UID for the envelope.
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setUID = function(UID) {
  this.UID = UID;
};


/**
 * The UID of the last-processed request/response (used for file-based error recovery).
 *
 * @return {String} The UID of the last-processed request/response (used for file-based error recovery).
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.getLastProcessedUID = function() {
  return this.lastProcessedUID;
};
Header.add(RequestEnvelope, {name: "OLDFILEUID", attributeType: String, readMethod: "getLastProcessedUID", writeMethod: "setLastProcessedUID"});


/**
 * The UID of the last-processed request/response (used for file-based error recovery).
 *
 * @param {String} lastProcessedUID The UID of the last-processed request/response (used for file-based error recovery).
 * @see "Section 2.2, OFX spec"
 */
RequestEnvelope.prototype.setLastProcessedUID = function(lastProcessedUID) {
  this.lastProcessedUID = lastProcessedUID;
};


/**
 * The message sets that make up the content of this request.
 *
 * @return {SortedSet<RequestMessageSet>} The message sets that make up the content of this request.
 * @see "Section 2.4.5, OFX Spec"
 */
RequestEnvelope.prototype.getMessageSets = function() {
  return this.messageSets;
};
ChildAggregate.add(RequestEnvelope, {order: 1, attributeType: SortedSet<RequestMessageSet>, readMethod: "getMessageSets", writeMethod: "setMessageSets"});


/**
 * The message sets that make up the content of this request.
 *
 * @param {SortedSet<RequestMessageSet>} messageSets The message sets that make up the content of this request.
 * @see "Section 2.4.5, OFX Spec"
 */
RequestEnvelope.prototype.setMessageSets = function(messageSets) {
  this.messageSets = messageSets;
};




module.exports = RequestEnvelope;
