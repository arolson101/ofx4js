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

var SubAccountType = require("domain/data/investment/accounts/SubAccountType");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function MarginInterestTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.MARGIN_INTEREST);

  /**
   * @name MarginInterestTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name MarginInterestTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name MarginInterestTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name MarginInterestTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;
}

inherit(MarginInterestTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("MARGININTEREST", MarginInterestTransaction);


/**
 * Gets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
MarginInterestTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 30, owner: MarginInterestTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFund the sub account type
 */
MarginInterestTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
MarginInterestTransaction.prototype.getSubAccountFundEnum = function() {
  var type = this.getSubAccountFund();
  return type !== null ? SubAccountType.valueOf(type) : null;
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
MarginInterestTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", order: 40, owner: MarginInterestTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
MarginInterestTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
MarginInterestTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: MarginInterestTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction.
 */
MarginInterestTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction.
 */
MarginInterestTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 120, owner: MarginInterestTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrency the original currency info for the transaction.
 */
MarginInterestTransaction.prototype.SetOriginalCurrency = function(originalCurrency) {
  this.originalCurrencyInfo = originalCurrency;
  this.currencyCode = null;
};




module.exports = MarginInterestTransaction;
