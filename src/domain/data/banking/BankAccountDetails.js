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

var inherit = require("../inherit");

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");
var AccountDetails = require("domain/data/common/AccountDetails");

/**
 * Base bank account details.
 *
 * @author Ryan Heaton
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
  return bankId;
};
Element.add({name: "BANKID", required: true, order: 0, owner: BankAccountDetails, /*type: String,*/ fcn: "getBankId"});


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
  return getBankId();
};


/**
 * The routing and transit number.
 *
 * @param {String} routingNumber The routing and transit number.
 */
BankAccountDetails.prototype.setRoutingNumber = function(routingNumber) {
  setBankId(routingNumber);
};


/**
 * The branch id.
 *
 * @return {String} The branch id.
 */
BankAccountDetails.prototype.getBranchId = function() {
  return branchId;
};
Element.add({name: "BRANCHID", order: 10, owner: BankAccountDetails, /*type: String,*/ fcn: "getBranchId"});


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
  return accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 20, owner: BankAccountDetails, /*type: String,*/ fcn: "getAccountNumber"});


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
  return accountType;
};
Element.add({name: "ACCTTYPE", required: true, order: 30, owner: BankAccountDetails, /*type: AccountType,*/ fcn: "getAccountType"});


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
  return accountKey;
};
Element.add({name: "ACCTKEY", order: 40, owner: BankAccountDetails, /*type: String,*/ fcn: "getAccountKey"});


/**
 * The account key.
 *
 * @param {String} accountKey The account key.
 */
BankAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = BankAccountDetails;
