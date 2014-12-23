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

var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");
var Aggregate = require("meta/Aggregate");
var AccountStatus = require("domain/data/common/AccountStatus");
var AccountInfo = require("domain/data/common/AccountInfo");
var AccountDetails = require("domain/data/common/AccountDetails");

/**
 * @author Ryan Heaton
 */
function BankAccountInfo () {

  /**
   * @name BankAccountInfo#bankAccount
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccount = null;

  /**
   * @name BankAccountInfo#supportsTransactionDetailOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransactionDetailOperations = null;

  /**
   * @name BankAccountInfo#supportsTransferToOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferToOtherAccountOperations = null;

  /**
   * @name BankAccountInfo#supportsTransferFromOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferFromOtherAccountOperations = null;

  /**
   * @name BankAccountInfo#status
   * @type AccountStatus
   * @access private
   */
  this.status = null;
}

inherit(BankAccountInfo, "implements", AccountInfo);


Aggregate.add("BANKACCTINFO", BankAccountInfo);


/**
 * The bank account this information is referencing.
 *
 * @return {BankAccountDetails} The bank account this information is referencing.
 */
BankAccountInfo.prototype.getBankAccount = function() {
  return bankAccount;
};
ChildAggregate.add({name: "BANKACCTFROM", required: true, order: 0, owner: BankAccountInfo, /*type: BankAccountDetails,*/ fcn: "getBankAccount"});


/**
 * The bank account this information is referencing.
 *
 * @param {BankAccountDetails} bankAccount The bank account this information is referencing.
 */
BankAccountInfo.prototype.setBankAccount = function(bankAccount) {
  this.bankAccount = bankAccount;
};


// Inherited.
BankAccountInfo.prototype.getAccountDetails = function() {
  return getBankAccount();
};


/**
 * Whether this account supports download of transaction details.
 *
 * @return {Boolean} Whether this account supports download of transaction details.
 */
BankAccountInfo.prototype.getSupportsTransactionDetailOperations = function() {
  return supportsTransactionDetailOperations;
};
Element.add({name: "SUPTXDL", required: true, order: 10, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransactionDetailOperations"});


/**
 * Whether this account supports download of transaction details.
 *
 * @param {Boolean} supportsTransactionDetailOperations Whether this account supports download of transaction details.
 */
BankAccountInfo.prototype.setSupportsTransactionDetailOperations = function(supportsTransactionDetailOperations) {
  this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
};


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations to other accounts.
 */
BankAccountInfo.prototype.getSupportsTransferToOtherAccountOperations = function() {
  return supportsTransferToOtherAccountOperations;
};
Element.add({name: "XFERSRC", required: true, order: 20, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferToOtherAccountOperations"});


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @param {Boolean} supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
 */
BankAccountInfo.prototype.setSupportsTransferToOtherAccountOperations = function(supportsTransferToOtherAccountOperations) {
  this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
};


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations from other accounts.
 */
BankAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations = function() {
  return supportsTransferFromOtherAccountOperations;
};
Element.add({name: "XFERDEST", required: true, order: 30, owner: BankAccountInfo, /*type: Boolean,*/ fcn: "getSupportsTransferFromOtherAccountOperations"});


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @param {Boolean} supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
 */
BankAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations = function(supportsTransferFromOtherAccountOperations) {
  this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
};


/**
 * The account status.
 *
 * @return {AccountStatus} The account status.
 */
BankAccountInfo.prototype.getStatus = function() {
  return status;
};
Element.add({name: "SVCSTATUS", required: true, order: 40, owner: BankAccountInfo, /*type: AccountStatus,*/ fcn: "getStatus"});


/**
 * The account status.
 *
 * @param {AccountStatus} status The account status.
 */
BankAccountInfo.prototype.setStatus = function(status) {
  this.status = status;
};




module.exports = BankAccountInfo;
