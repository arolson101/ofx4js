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
var AccountDetails = require("../common/AccountDetails");
var AccountType = require("./AccountType");

/**
 * Base bank account details.
 *
 * @class
 * @augments AccountDetails
 * @see "OFX Spec, Section 11.3.1"
 */
function BankAccountDetails () {

  /**
   * @name BankAccountDetails#bankId
   * @type String
   * @access private
   */
  this.bankId = null;

  /**
   * @name BankAccountDetails#branchId
   * @type String
   * @access private
   */
  this.branchId = null;

  /**
   * @name BankAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name BankAccountDetails#accountType
   * @type AccountType
   * @access private
   */
  this.accountType = null;

  /**
   * @name BankAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(BankAccountDetails, "implements", AccountDetails);


Aggregate.add("BankAccountDetails", BankAccountDetails);


/**
 * The routing and transit number.
 *
 * @return {String} The routing and transit number.
 */
BankAccountDetails.prototype.getBankId = function() {
  return this.bankId;
};
Element.add(BankAccountDetails, {name: "BANKID", required: true, order: 0, attributeType: String, readMethod: "getBankId", writeMethod: "setBankId"});


/**
 * The routing and transit number.
 *
 * @param {String} bankId The routing and transit number.
 */
BankAccountDetails.prototype.setBankId = function(bankId) {
  this.bankId = bankId;
};


/**
 * The routing and transit number.
 *
 * @return {String} The routing and transit number.
 */
BankAccountDetails.prototype.getRoutingNumber = function() {
  return this.getBankId();
};


/**
 * The routing and transit number.
 *
 * @param {String} routingNumber The routing and transit number.
 */
BankAccountDetails.prototype.setRoutingNumber = function(routingNumber) {
  this.setBankId(routingNumber);
};


/**
 * The branch id.
 *
 * @return {String} The branch id.
 */
BankAccountDetails.prototype.getBranchId = function() {
  return this.branchId;
};
Element.add(BankAccountDetails, {name: "BRANCHID", order: 10, attributeType: String, readMethod: "getBranchId", writeMethod: "setBranchId"});


/**
 * The branch id.
 *
 * @param {String} branchId The branch id.
 */
BankAccountDetails.prototype.setBranchId = function(branchId) {
  this.branchId = branchId;
};


/**
 * The account number.
 *
 * @return {String} The account number.
 */
BankAccountDetails.prototype.getAccountNumber = function() {
  return this.accountNumber;
};
Element.add(BankAccountDetails, {name: "ACCTID", required: true, order: 20, attributeType: String, readMethod: "getAccountNumber", writeMethod: "setAccountNumber"});


/**
 * The account number.
 *
 * @param {String} accountNumber The account number.
 */
BankAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * The account type.
 *
 * @return {AccountType} The account type.
 */
BankAccountDetails.prototype.getAccountType = function() {
  return this.accountType;
};
Element.add(BankAccountDetails, {name: "ACCTTYPE", required: true, order: 30, attributeType: AccountType, readMethod: "getAccountType", writeMethod: "setAccountType"});


/**
 * The account type.
 *
 * @param {AccountType} accountType The account type.
 */
BankAccountDetails.prototype.setAccountType = function(accountType) {
  this.accountType = accountType;
};


/**
 * The account key.
 *
 * @return {String} The account key.
 */
BankAccountDetails.prototype.getAccountKey = function() {
  return this.accountKey;
};
Element.add(BankAccountDetails, {name: "ACCTKEY", order: 40, attributeType: String, readMethod: "getAccountKey", writeMethod: "setAccountKey"});


/**
 * The account key.
 *
 * @param {String} accountKey The account key.
 */
BankAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = BankAccountDetails;
