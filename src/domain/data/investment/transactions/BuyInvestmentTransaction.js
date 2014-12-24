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

var SubAccountType = require("domain/data/investment/accounts/SubAccountType");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

/**
 * Buy investment transaction aggregate ("INVBUY").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @class
 */
function BuyInvestmentTransaction () {

  /**
   * @name BuyInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;

  /**
   * @name BuyInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name BuyInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name BuyInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name BuyInvestmentTransaction#markup
   * @type Double
   * @access private
   */
  this.markup = null;

  /**
   * @name BuyInvestmentTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name BuyInvestmentTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name BuyInvestmentTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name BuyInvestmentTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name BuyInvestmentTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name BuyInvestmentTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name BuyInvestmentTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name BuyInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name BuyInvestmentTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;
}



Aggregate.add("INVBUY", BuyInvestmentTransaction);


/**
 * Gets the investment transaction child aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction child aggregate
 */
BuyInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.investmentTransaction;
};
ChildAggregate.add({order: 10, owner: BuyInvestmentTransaction, /*type: InvestmentTransaction,*/ fcn: "getInvestmentTransaction"});


/**
 * Sets the investment transaction child aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the investment transaction child aggregate
 */
BuyInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};


/**
 * Gets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BuyInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: BuyInvestmentTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was bought
 */
BuyInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BuyInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 30, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units purchased.
 */
BuyInvestmentTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BuyInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 40, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
BuyInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markeup price
 */
BuyInvestmentTransaction.prototype.getMarkup = function() {
  return this.markup;
};
Element.add({name: "MARKUP", order: 50, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getMarkup"});


/**
 * Sets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} markup the per unit markeup price
 */
BuyInvestmentTransaction.prototype.setMarkup = function(markup) {
  this.markup = markup;
};


/**
 * Gets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BuyInvestmentTransaction.prototype.getCommission = function() {
  return this.commission;
};
Element.add({name: "COMMISSION", order: 60, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getCommission"});


/**
 * Sets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
BuyInvestmentTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BuyInvestmentTransaction.prototype.getTaxes = function() {
  return this.taxes;
};
Element.add({name: "TAXES", order: 70, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getTaxes"});


/**
 * Sets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
BuyInvestmentTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BuyInvestmentTransaction.prototype.getFees = function() {
  return this.fees;
};
Element.add({name: "FEES", order: 80, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getFees"});


/**
 * Sets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
BuyInvestmentTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BuyInvestmentTransaction.prototype.getLoad = function() {
  return this.load;
};
Element.add({name: "LOAD", order: 90, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getLoad"});


/**
 * Sets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
BuyInvestmentTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BuyInvestmentTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 100, owner: BuyInvestmentTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
BuyInvestmentTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
BuyInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info may be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction.
 */
BuyInvestmentTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
BuyInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
ChildAggregate.add({order: 120, owner: BuyInvestmentTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
BuyInvestmentTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


 /**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BuyInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 130, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
  * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @param {String} subAccountSecurity the sub account type
  */
BuyInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BuyInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BuyInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 140, owner: BuyInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAcctFund the sub account fund
 */
BuyInvestmentTransaction.prototype.setSubAccountFund = function(subAcctFund) {
  this.subAccountFund = subAcctFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type or null if it wasn't one of the well known types.
 */
BuyInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};




module.exports = BuyInvestmentTransaction;
