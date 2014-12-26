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

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for an investment expense
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function InvestmentExpenseTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.INVESTMENT_EXPENSE);

  /**
   * @name InvestmentExpenseTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name InvestmentExpenseTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name InvestmentExpenseTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name InvestmentExpenseTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name InvestmentExpenseTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name InvestmentExpenseTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name InvestmentExpenseTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(InvestmentExpenseTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("INVEXPENSE", InvestmentExpenseTransaction);



/**
 * Gets the id of the security for the expense. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security for the expsense
 */
InvestmentExpenseTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: InvestmentExpenseTransaction, /*type: SecurityId,*/ readMethod: "getSecurityId", writeMethod: "setSecurityId"});


/**
 * Sets the id of the security for the expense. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security for the expsense
 */
InvestmentExpenseTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the total for the expense.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
InvestmentExpenseTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 30, owner: InvestmentExpenseTransaction, /*type: Double,*/ readMethod: "getTotal", writeMethod: "setTotal"});


/**
 * Sets the total for the expense.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
InvestmentExpenseTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
InvestmentExpenseTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 40, owner: InvestmentExpenseTransaction, /*type: String,*/ readMethod: "getSubAccountSecurity", writeMethod: "setSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
InvestmentExpenseTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
InvestmentExpenseTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
InvestmentExpenseTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 50, owner: InvestmentExpenseTransaction, /*type: String,*/ readMethod: "getSubAccountFund", writeMethod: "setSubAccountFund"});


/**
 * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
InvestmentExpenseTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
InvestmentExpenseTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
InvestmentExpenseTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 60, owner: InvestmentExpenseTransaction, /*type: String,*/ readMethod: "getCurrencyCode", writeMethod: "setCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
InvestmentExpenseTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
InvestmentExpenseTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 70, owner: InvestmentExpenseTransaction, /*type: OriginalCurrency,*/ readMethod: "getOriginalCurrencyInfo", writeMethod: "setOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
InvestmentExpenseTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
InvestmentExpenseTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 180, owner: InvestmentExpenseTransaction, /*type: String,*/ readMethod: "get401kSource", writeMethod: "set401kSource"});


/**
 * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
InvestmentExpenseTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
InvestmentExpenseTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = InvestmentExpenseTransaction;
