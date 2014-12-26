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

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../../../../domain/data/investment/accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for journal fund transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function JournalFundTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.JOURNAL_FUND);

  /**
   * @name JournalFundTransaction#subAccountFrom
   * @type String
   * @access private
   */
  this.subAccountFrom = null;

  /**
   * @name JournalFundTransaction#subAccountTo
   * @type String
   * @access private
   */
  this.subAccountTo = null;

  /**
   * @name JournalFundTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;
}

inherit(JournalFundTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("JRNLFUND", JournalFundTransaction);


JournalFundTransaction.prototype.JournalFundTransaction = function() {
  super(TransactionType.JOURNAL_FUND);
};


/**
 * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
JournalFundTransaction.prototype.getFromSubAccountFund = function() {
  return this.subAccountFrom;
};
Element.add(JournalFundTransaction, {name: "SUBACCTFROM", order: 20, attributeType: String, readMethod: "getFromSubAccountFund", writeMethod: "setFromSubAccountFund"});


/**
 * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFrom the sub account type
 */
JournalFundTransaction.prototype.setFromSubAccountFund = function(subAccountFrom) {
  this.subAccountFrom = subAccountFrom;
};


/**
 * Gets the result of getFromSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalFundTransaction.prototype.getFromSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getFromSubAccountFund());
};


/**
 * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account fund
 */
JournalFundTransaction.prototype.getToSubAccountFund = function() {
  return this.subAccountTo;
};
Element.add(JournalFundTransaction, {name: "SUBACCTTO", order: 30, attributeType: String, readMethod: "getToSubAccountFund", writeMethod: "setToSubAccountFund"});


/**
 * Sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountTo the sub account fund
 */
JournalFundTransaction.prototype.setToSubAccountFund = function(subAccountTo) {
  this.subAccountTo = subAccountTo;
};


/**
 * Gets the result of getToSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalFundTransaction.prototype.getToSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getToSubAccountFund());
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
JournalFundTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add(JournalFundTransaction, {name: "TOTAL", order: 40, attributeType: Double, readMethod: "getTotal", writeMethod: "setTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
JournalFundTransaction.prototype.setTotal = function(total) {
  this.total = total;
};




module.exports = JournalFundTransaction;
