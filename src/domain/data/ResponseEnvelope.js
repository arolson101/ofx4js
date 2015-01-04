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
var MessageSetType = require("./MessageSetType");
var ResponseMessageSet = require("./ResponseMessageSet");

/**
 * Envelope for enclosing an OFX response.
 *
 * @class
 * See "Section 2.4.3, OFX Spec"
 */
function ResponseEnvelope () {

  /**
   * @name ResponseEnvelope#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = ApplicationSecurity.NONE;

  /**
   * @name ResponseEnvelope#UID
   * @type String
   * @access private
   */
  this.UID = null;

  /**
   * @name ResponseEnvelope#messageSets
   * @type ResponseMessageSet[]
   * @access private
   */
  this.messageSets = null;
}



Aggregate.add("OFX", ResponseEnvelope);


/**
 * The security of this envelope.
 *
 * @return {ApplicationSecurity} The security of this envelope.
 * See "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.getSecurity = function() {
  return this.security;
};
Header.add(ResponseEnvelope, {name: "SECURITY", attributeType: ApplicationSecurity, readMethod: "getSecurity", writeMethod: "setSecurity"});


/**
 * The security of this envelope.
 *
 * @param {ApplicationSecurity} security The security of this envelope.
 * See "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * The UID for the envelope.
 *
 * @return {String} The UID for the envelope.
 * See "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.getUID = function() {
  return this.UID;
};
Header.add(ResponseEnvelope, {name: "NEWFILEUID", attributeType: String, readMethod: "getUID", writeMethod: "setUID"});


/**
 * The UID for the envelope.
 *
 * @param {String} UID The UID for the envelope.
 * See "Section 2.2, OFX spec"
 */
ResponseEnvelope.prototype.setUID = function(UID) {
  this.UID = UID;
};


/**
 * The message sets that make up the content of this response.
 *
 * @return {ResponseMessageSet[]} The message sets that make up the content of this response.
 * See "Section 2.4.5, OFX Spec"
 */
ResponseEnvelope.prototype.getMessageSets = function() {
  return this.messageSets;
};
ChildAggregate.add(ResponseEnvelope, {order: 1, attributeType: Array, collectionEntryType: ResponseMessageSet, readMethod: "getMessageSets", writeMethod: "setMessageSets"});


/**
 * The message sets that make up the content of this response.
 *
 * @param {ResponseMessageSet[]} messageSets The message sets that make up the content of this response.
 * See "Section 2.4.5, OFX Spec"
 */
ResponseEnvelope.prototype.setMessageSets = function(messageSets) {
  this.messageSets = messageSets;
};


/**
 * Helper method for looking up the signon response.
 *
 * @return {SignonResponse} The signon response, or null if none found.
 */
ResponseEnvelope.prototype.getSignonResponse = function() {
  var type = MessageSetType.signon;
  var message = this.getMessageSet(type);

  if (message) {
    return message.getSignonResponse();
  }
  else {
    return null;
  }
};


/**
 * Get the message set of the specified type.
 *
 * @param {MessageSetType} type The type.
 * @return {ResponseMessageSet} The message set, or null.
 */
ResponseEnvelope.prototype.getMessageSet = function(type) {
  var message = null;
  if (this.messageSets) {
    for (var i=0; i<this.messageSets.length; i++) {
      var messageSet = this.messageSets[i];
      if (messageSet.getType() == type) {
        message = messageSet;
        break;
      }
    }
  }
  return message;
};




module.exports = ResponseEnvelope;
