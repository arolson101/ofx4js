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

var inherit = require("../../../util/inherit");

var StatusHolder = require("../common/StatusHolder");
var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * The signon response message.
 *
 * @class
 * @augments ResponseMessage
 * @augments StatusHolder
 * @see "Section 2.5.1.2, OFX Spec."
 */
function SignonResponse () {

  /**
   * @name SignonResponse#status
   * @type Status
   * @access private
   */
  this.status = null;

  /**
   * @name SignonResponse#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name SignonResponse#userKey
   * @type String
   * @access private
   */
  this.userKey = null;

  /**
   * @name SignonResponse#userKeyExpiration
   * @type Date
   * @access private
   */
  this.userKeyExpiration = null;

  /**
   * @name SignonResponse#language
   * @type String
   * @access private
   */
  this.language = "eng";

  /**
   * @name SignonResponse#profileLastUpdated
   * @type Date
   * @access private
   */
  this.profileLastUpdated = null;

  /**
   * @name SignonResponse#accountLastUpdated
   * @type Date
   * @access private
   */
  this.accountLastUpdated = null;

  /**
   * @name SignonResponse#financialInstitution
   * @type FinancialInstitution
   * @access private
   */
  this.financialInstitution = null;

  /**
   * @name SignonResponse#sessionId
   * @type String
   * @access private
   */
  this.sessionId = null;

  /**
   * @name SignonResponse#accessKey
   * @type String
   * @access private
   */
  this.accessKey = null;
}

inherit(SignonResponse, "extends", ResponseMessage);
inherit(SignonResponse, "implements", StatusHolder);


Aggregate.add("SONRS", SignonResponse);


SignonResponse.prototype.getResponseMessageName = function() {
  return "signon";
};


SignonResponse.prototype.getStatusHolderName = function() {
  return this.getResponseMessageName();
};


/**
 * The signon response status.
 *
 * @return {Status} The signon response status.
 */
SignonResponse.prototype.getStatus = function() {
  return this.status;
};
ChildAggregate.add({required: true, order: 0, owner: SignonResponse, /*type: Status,*/ readMethod: "getStatus", writeMethod: "setStatus"});


/**
 * The signon response status.
 *
 * @param {Status} status The signon response status.
 */
SignonResponse.prototype.setStatus = function(status) {
  this.status = status;
};


/**
 * The timestamp of this response.
 *
 * @return {Date} The timestamp of this response.
 */
SignonResponse.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTSERVER", required: true, order: 10, owner: SignonResponse, /*type: Date,*/ readMethod: "getTimestamp", writeMethod: "setTimestamp"});


/**
 * The timestamp of this response.
 *
 * @param {Date} timestamp The timestamp of this response.
 */
SignonResponse.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * The userkey that can be used instead of the username/password.
 *
 * @return {String} The userkey that can be used instead of the username/password.
 */
SignonResponse.prototype.getUserKey = function() {
  return this.userKey;
};
Element.add({name: "USERKEY", order: 20, owner: SignonResponse, /*type: String,*/ readMethod: "getUserKey", writeMethod: "setUserKey"});


/**
 * The userkey that can be used instead of the username/password.
 *
 * @param {String} userKey The userkey that can be used instead of the username/password.
 */
SignonResponse.prototype.setUserKey = function(userKey) {
  this.userKey = userKey;
};


/**
 * The date/time of the expiration of the user key.
 *
 * @return {Date} The date/time of the expiration of the user key.
 */
SignonResponse.prototype.getUserKeyExpiration = function() {
  return this.userKeyExpiration;
};
Element.add({name: "TSKEYEXPIRE", order: 30, owner: SignonResponse, /*type: Date,*/ readMethod: "getUserKeyExpiration", writeMethod: "setUserKeyExpiration"});


/**
 * The date/time of the expiration of the user key.
 *
 * @param {Date} userKeyExpiration The date/time of the expiration of the user key.
 */
SignonResponse.prototype.setUserKeyExpiration = function(userKeyExpiration) {
  this.userKeyExpiration = userKeyExpiration;
};


/**
 * The three-letter langauge code.
 *
 * @return {String} The three-letter langauge code.
 * @see java.util.Locale#getISO3Language()
 */
SignonResponse.prototype.getLanguage = function() {
  return this.language;
};
Element.add({name: "LANGUAGE", required: true, order: 40, owner: SignonResponse, /*type: String,*/ readMethod: "getLanguage", writeMethod: "setLanguage"});


/**
 * The three-letter langauge code.
 *
 * @param {String} language The three-letter langauge code.
 */
SignonResponse.prototype.setLanguage = function(language) {
  this.language = language;
};


/**
 * The date/time that the FI profile was last updated.
 *
 * @return {Date} The date/time that the FI profile was last updated.
 */
SignonResponse.prototype.getProfileLastUpdated = function() {
  return this.profileLastUpdated;
};
Element.add({name: "DTPROFUP", order: 50, owner: SignonResponse, /*type: Date,*/ readMethod: "getProfileLastUpdated", writeMethod: "setProfileLastUpdated"});


/**
 * The date/time that the FI profile was last updated.
 *
 * @param {Date} profileLastUpdated The date/time that the FI profile was last updated.
 */
SignonResponse.prototype.setProfileLastUpdated = function(profileLastUpdated) {
  this.profileLastUpdated = profileLastUpdated;
};


/**
 * The date/time that the user's account information was updated.
 *
 * @return {Date} The date/time that the user's account information was updated.
 */
SignonResponse.prototype.getAccountLastUpdated = function() {
  return this.accountLastUpdated;
};
Element.add({name: "DTACCTUP", order: 60, owner: SignonResponse, /*type: Date,*/ readMethod: "getAccountLastUpdated", writeMethod: "setAccountLastUpdated"});


/**
 * The date/time that the user's account information was updated.
 *
 * @param {Date} accountLastUpdated The date/time that the user's account information was updated.
 */
SignonResponse.prototype.setAccountLastUpdated = function(accountLastUpdated) {
  this.accountLastUpdated = accountLastUpdated;
};


/**
 * The financial instutution identity information.
 *
 * @return {FinancialInstitution} The financial instutution identity information.
 */
SignonResponse.prototype.getFinancialInstitution = function() {
  return this.financialInstitution;
};
ChildAggregate.add({order: 70, owner: SignonResponse, /*type: FinancialInstitution,*/ readMethod: "getFinancialInstitution", writeMethod: "setFinancialInstitution"});


/**
 * The financial instutution identity information.
 *
 * @param {FinancialInstitution} financialInstitution The financial instutution identity information.
 */
SignonResponse.prototype.setFinancialInstitution = function(financialInstitution) {
  this.financialInstitution = financialInstitution;
};


/**
 * The session id for the client.
 *
 * @return {String} The session id for the client.
 */
SignonResponse.prototype.getSessionId = function() {
  return this.sessionId;
};
Element.add({name: "SESSCOOKIE", order: 80, owner: SignonResponse, /*type: String,*/ readMethod: "getSessionId", writeMethod: "setSessionId"});


/**
 * The session id for the client.
 *
 * @param {String} sessionId The session id for the client.
 */
SignonResponse.prototype.setSessionId = function(sessionId) {
  this.sessionId = sessionId;
};


/**
 * The access key that the client should return in the next sign-on requuest.
 *
 * @return {String} The access key that the client should return in the next sign-on requuest.
 */
SignonResponse.prototype.getAccessKey = function() {
  return this.accessKey;
};
Element.add({name: "ACCESSKEY", order: 90, owner: SignonResponse, /*type: String,*/ readMethod: "getAccessKey", writeMethod: "setAccessKey"});


/**
 * The access key that the client should return in the next sign-on requuest.
 *
 * @param {String} accessKey The access key that the client should return in the next sign-on requuest.
 */
SignonResponse.prototype.setAccessKey = function(accessKey) {
  this.accessKey = accessKey;
};




module.exports = SignonResponse;
