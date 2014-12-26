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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var StatusCode = require("./StatusCode");

/**
 * Transaction status element.
 *
 * @class
 * @see "Section 3.1.4, OFX Spec"
 */
function Status () {

  /**
   * @name Status#code
   * @type StatusCode
   * @access private
   */
  this.code = Status.KnownCode.SUCCESS;

  /**
   * @name Status#severity
   * @type Severity
   * @access private
   */
  this.severity = null;

  /**
   * @name Status#message
   * @type String
   * @access private
   */
  this.message = null;
}



Aggregate.add("STATUS", Status);


var Severity = Status.Severity = {
  INFO: 0,
  WARN: 1,
  ERROR: 2
};

Status.KnownCode = function(/*int*/ code, /*String*/ message, /*Severity*/ defaultSeverity) {

  /**
   * @name Status.KnownCode#code
   * @type int
   * @access private
   */
  this.code = code;

  /**
   * @name Status.KnownCode#message
   * @type String
   * @access private
   */
  this.message = message;

  /**
   * @name Status.KnownCode#defaultSeverity
   * @type Severity
   * @access private
   */
  this.defaultSeverity = defaultSeverity;
};

inherit(Status.KnownCode, "implements", StatusCode);


Status.KnownCode.SUCCESS = new Status.KnownCode(0, "Success", Severity.INFO);
Status.KnownCode.CLIENT_UP_TO_DATE = new Status.KnownCode(1, "Client is up-to-date", Severity.INFO);
Status.KnownCode.GENERAL_ERROR = new Status.KnownCode(2000, "General error.", Severity.ERROR);
Status.KnownCode.GENERAL_ACCOUNT_ERROR = new Status.KnownCode(2002, "General account error.", Severity.ERROR);
Status.KnownCode.ACCOUNT_NOT_FOUND = new Status.KnownCode(2003, "Account not found.", Severity.ERROR);
Status.KnownCode.ACCOUNT_CLOSED = new Status.KnownCode(2004, "Account closed.", Severity.ERROR);
Status.KnownCode.ACCOUNT_NOT_AUTHORIZED = new Status.KnownCode(2005, "Account not authorized.", Severity.ERROR);
Status.KnownCode.DATE_TOO_SOON = new Status.KnownCode(2014, "Date too soon", Severity.ERROR);
Status.KnownCode.DUPLICATE_REQUEST = new Status.KnownCode(2019, "Duplicate request.", Severity.ERROR);
Status.KnownCode.UNSUPPORTED_VERSION = new Status.KnownCode(2021, "Unsupported version", Severity.ERROR);
Status.KnownCode.INVALID_TAN = new Status.KnownCode(2022, "Invalid transaction authorization number.", Severity.ERROR);
Status.KnownCode.MFA_CHALLENGE_REQUIRED = new Status.KnownCode(3000, "Further authentication required.", Severity.ERROR);
Status.KnownCode.MFA_CHALLENGE_FAILED = new Status.KnownCode(3001, "MFA failed.", Severity.ERROR);
Status.KnownCode.PASSWORD_CHANGE_REQUIRED = new Status.KnownCode(15000, "Password change required.", Severity.INFO);
Status.KnownCode.SIGNON_INVALID = new Status.KnownCode(15500, "Invalid signon", Severity.ERROR);
Status.KnownCode.CUSTOMER_ACCOUNT_IN_USE = new Status.KnownCode(15501, "Customer account in use.", Severity.ERROR);
Status.KnownCode.PASSWORD_LOCKED = new Status.KnownCode(15502, "Password locked.", Severity.ERROR);
Status.KnownCode.INVALID_CLIENT_UID = new Status.KnownCode(15510, "Invalid client UID.", Severity.ERROR);
Status.KnownCode.CONTACT_FI = new Status.KnownCode(15511, "User must contact FI.", Severity.ERROR);
Status.KnownCode.AUTHTOKEN_REQUIRED = new Status.KnownCode(15512, "Auth token required.", Severity.ERROR);
Status.KnownCode.INVALID_AUTHTOKEN = new Status.KnownCode(15513, "Invalid auth token.", Severity.ERROR);
Status.KnownCode.NO_DATA = new Status.KnownCode(14701, "No Tax Data for Account.", Severity.ERROR);
Status.KnownCode.DB_EXCEPTION = new Status.KnownCode(14702,"Database error has occured.",Severity.ERROR);
Status.KnownCode.NO_TAXSUPPORT = new Status.KnownCode(14703,"This Tax Year is not supported.",Severity.ERROR);

/**
 * @returns int
 */
Status.KnownCode.prototype.getCode = function() {
  return this.code;
};

/**
 * @returns String
 */
Status.KnownCode.prototype.getMessage = function() {
  return this.message;
};

/**
 * @returns Severity
 */
Status.KnownCode.prototype.getDefaultSeverity = function() {
  return this.defaultSeverity;
};

/**
 * @param {int} code
 * @returns KnownCode
 */
Status.KnownCode.fromCode = function(code) {
  for (var value in Status.KnownCode) {
    if (value instanceof Status.KnownCode && value.getCode() == code) {
      return value;
    }
  }
  return null;
};

/**
 * @returns String
 */
Status.KnownCode.prototype.toString = function() {
  return this.code.toString();
};

/**
 * Status code.
 *
 * @return {StatusCode} The status code.
 */
Status.prototype.getCode = function() {
  return this.code;
};
Element.add({name: "CODE", required: true, order: 0, owner: Status, /*type: StatusCode,*/ readMethod: "getCode", writeMethod: "setCode"});


/**
 * Status code.
 *
 * @param {StatusCode} code Status code.
 */
Status.prototype.setCode = function(code) {
  this.code = code;
  if (this.severity === null) {
    this.severity = code.getDefaultSeverity();
  }
};


/**
 * The severity.
 *
 * @return {Severity} The severity.
 */
Status.prototype.getSeverity = function() {
  return this.severity;
};
Element.add({name: "SEVERITY", required: true, order: 10, owner: Status, /*type: Severity,*/ readMethod: "getSeverity", writeMethod: "setSeverity"});


/**
 * The severity.
 *
 * @param {Severity} severity The severity.
 */
Status.prototype.setSeverity = function(severity) {
  this.severity = severity;
};


/**
 * Server-supplied message.
 *
 * @return {String} Server-supplied message.
 */
Status.prototype.getMessage = function() {
  return this.message;
};
Element.add({name: "MESSAGE", order: 20, owner: Status, /*type: String,*/ readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * Server-supplied message.
 *
 * @param {String} message Server-supplied message.
 */
Status.prototype.setMessage = function(message) {
  this.message = message;
};




module.exports = Status;
