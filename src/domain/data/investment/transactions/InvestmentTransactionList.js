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

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseInvestmentTransaction = require("./BaseInvestmentTransaction");
var InvestmentBankTransaction = require("./InvestmentBankTransaction");

/**
 * The transaction list aggregate.
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @class
 */
function InvestmentTransactionList () {

  /**
   * @name InvestmentTransactionList#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name InvestmentTransactionList#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name InvestmentTransactionList#transactions
   * @type List<BaseInvestmentTransaction>
   * @access private
   */
  this.transactions = null;

  /**
   * @name InvestmentTransactionList#bankTransactions
   * @type List<InvestmentBankTransaction>
   * @access private
   */
  this.bankTransactions = null;
}



Aggregate.add("INVTRANLIST", InvestmentTransactionList);


/**
 * Gets the start date. This is a required field according to the OFX spec.
 *
 * @return {Date} The start date
 */
InvestmentTransactionList.prototype.getStart = function() {
  return this.start;
};
Element.add(InvestmentTransactionList, {name: "DTSTART", required: true, order: 0, attributeType: Date, readMethod: "getStart", writeMethod: "setStart"});


/**
 * Sets the start date. This is a required field according to the OFX spec.
 *
 * @param {Date} start The start date
 */
InvestmentTransactionList.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * Gets the end date. This is a required field according to the OFX spec.
 *
 * @return {Date} he end date
 */
InvestmentTransactionList.prototype.getEnd = function() {
  return this.end;
};
Element.add(InvestmentTransactionList, {name: "DTEND", required: true, order: 10, attributeType: Date, readMethod: "getEnd", writeMethod: "setEnd"});


/**
 * Sets the end date. This is a required field according to the OFX spec.
 *
 * @param {Date} end the end date
 */
InvestmentTransactionList.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * Gets the investment transaction list. This is a heterogenous list of different types of
 * transactions returned in the order the brokerage provides them.
 *
 * @return {BaseInvestmentTransaction[]} the investment transaction list
 */
InvestmentTransactionList.prototype.getInvestmentTransactions = function() {
  return this.transactions;
};
ChildAggregate.add(InvestmentTransactionList, {order: 20, attributeType: Array, collectionEntryType: BaseInvestmentTransaction, readMethod: "getInvestmentTransactions", writeMethod: "setInvestmentTransactions"});


/**
 * Sets the investment transaction list. This is a heterogenous list of different types of
 * transactions returned in the order the brokerage provides them.
 *
 * @param {BaseInvestmentTransaction[]} transactions the investment transaction list
 */
InvestmentTransactionList.prototype.setInvestmentTransactions = function(transactions) {
  this.transactions = transactions;
};


/**
 * Gets the bank transaction list.
 *
 * @return {InvestmentBankTransaction[]} the bank transaction list
 */
InvestmentTransactionList.prototype.getBankTransactions = function() {
  return this.bankTransactions;
};
ChildAggregate.add(InvestmentTransactionList, {order: 30, attributeType: Array, collectionEntryType: InvestmentBankTransaction, readMethod: "getBankTransactions", writeMethod: "setBankTransactions"});


/**
 * Sets the bank transaction list.
 *
 * @param {InvestmentBankTransaction[]} bankTransactions the bank transaction list
 */
InvestmentTransactionList.prototype.setBankTransactions = function(bankTransactions) {
  this.bankTransactions = bankTransactions;
};




module.exports = InvestmentTransactionList;
