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

var ResponseMessage = require("../ResponseMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");
var AccountStatement = require("../../../client/AccountStatement");
var TransactionList = require("./TransactionList");
var BalanceInfo = require("./BalanceInfo");

/**
 * @class
 * @augments ResponseMessage
 * @augments AccountStatement
 */
function StatementResponse () {
  ResponseMessage.call(this);

  /**
   * @name StatementResponse#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = "USD";

  /**
   * @name StatementResponse#transactionList
   * @type TransactionList
   * @access private
   */
  this.transactionList = null;

  /**
   * @name StatementResponse#ledgerBalance
   * @type BalanceInfo
   * @access private
   */
  this.ledgerBalance = null;

  /**
   * @name StatementResponse#availableBalance
   * @type BalanceInfo
   * @access private
   */
  this.availableBalance = null;

  /**
   * @name StatementResponse#marketingInfo
   * @type String
   * @access private
   */
  this.marketingInfo = null;
}

inherit(StatementResponse, "extends", ResponseMessage);
inherit(StatementResponse, "implements", AccountStatement);




/**
 * The currency code.
 *
 * @return {String} The currency code.
 * @see java.util.Currency#getCurrencyCode()
 */
StatementResponse.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add(StatementResponse, {name: "CURDEF", required: true, order: 0, attributeType: String, readMethod: "getCurrencyCode", writeMethod: "setCurrencyCode"});


/**
 * The currency code.
 *
 * @param {String} currencyCode The currency code.
 */
StatementResponse.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * The transaction list.
 *
 * @return {TransactionList} The transaction list.
 */
StatementResponse.prototype.getTransactionList = function() {
  return this.transactionList;
};
ChildAggregate.add(StatementResponse, {order: 20, attributeType: TransactionList, readMethod: "getTransactionList", writeMethod: "setTransactionList"});


/**
 * The transaction list.
 *
 * @param {TransactionList} transactionList The transaction list.
 */
StatementResponse.prototype.setTransactionList = function(transactionList) {
  this.transactionList = transactionList;
};


/**
 * The ledger balance.
 *
 * @return {BalanceInfo} The ledger balance.
 */
StatementResponse.prototype.getLedgerBalance = function() {
  return this.ledgerBalance;
};
ChildAggregate.add(StatementResponse, {name: "LEDGERBAL", order: 30, attributeType: BalanceInfo, readMethod: "getLedgerBalance", writeMethod: "setLedgerBalance"});


/**
 * The ledger balance.
 *
 * @param {BalanceInfo} ledgerBalance The ledger balance.
 */
StatementResponse.prototype.setLedgerBalance = function(ledgerBalance) {
  this.ledgerBalance = ledgerBalance;
};


/**
 * The available balance.
 *
 * @return {BalanceInfo} The available balance.
 */
StatementResponse.prototype.getAvailableBalance = function() {
  return this.availableBalance;
};
ChildAggregate.add(StatementResponse, {name: "AVAILBAL", order: 40, attributeType: BalanceInfo, readMethod: "getAvailableBalance", writeMethod: "setAvailableBalance"});


/**
 * The available balance.
 *
 * @param {BalanceInfo} availableBalance The available balance.
 */
StatementResponse.prototype.setAvailableBalance = function(availableBalance) {
  this.availableBalance = availableBalance;
};


/**
 * Marketing information. (?)
 *
 * @return {String} Marketing information.
 */
StatementResponse.prototype.getMarketingInfo = function() {
  return this.marketingInfo;
};
Element.add(StatementResponse, {name: "MKTGINFO", order: 50, attributeType: String, readMethod: "getMarketingInfo", writeMethod: "setMarketingInfo"});


/**
 * Marketing information. (?)
 *
 * @param {String} marketingInfo Marketing information.
 */
StatementResponse.prototype.setMarketingInfo = function(marketingInfo) {
  this.marketingInfo = marketingInfo;
};




module.exports = StatementResponse;
