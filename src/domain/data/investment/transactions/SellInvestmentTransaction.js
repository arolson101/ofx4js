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

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Sell investment transaction aggregate ("INVSELL").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @class
 */
function SellInvestmentTransaction () {

  /**
   * @name SellInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;

  /**
   * @name SellInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SellInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name SellInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name SellInvestmentTransaction#markdown
   * @type Double
   * @access private
   */
  this.markdown = null;

  /**
   * @name SellInvestmentTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name SellInvestmentTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name SellInvestmentTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name SellInvestmentTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name SellInvestmentTransaction#withholding
   * @type Double
   * @access private
   */
  this.withholding = null;

  /**
   * @name SellInvestmentTransaction#taxExempt
   * @type Boolean
   * @access private
   */
  this.taxExempt = null;

  /**
   * @name SellInvestmentTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name SellInvestmentTransaction#gain
   * @type Double
   * @access private
   */
  this.gain = null;

  /**
   * @name SellInvestmentTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SellInvestmentTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name SellInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name SellInvestmentTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name SellInvestmentTransaction#loanId
   * @type String
   * @access private
   */
  this.loanId = null;

  /**
   * @name SellInvestmentTransaction#stateWithholding
   * @type Double
   * @access private
   */
  this.stateWithholding = null;

  /**
   * @name SellInvestmentTransaction#penalty
   * @type Double
   * @access private
   */
  this.penalty = null;

  /**
   * @name SellInvestmentTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}



Aggregate.add("INVSELL", SellInvestmentTransaction);


/**
 * Gets the investment transaction child aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction child aggregate
 */
SellInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return this.investmentTransaction;
};
ChildAggregate.add({order: 10, owner: SellInvestmentTransaction, /*type: InvestmentTransaction,*/ readMethod: "getInvestmentTransaction", writeMethod: "setInvestmentTransaction"});


/**
 * Sets the investment transaction child aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the investment transaction child aggregate
 */
SellInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};


/**
 * Gets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was sold
 */
SellInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: SellInvestmentTransaction, /*type: SecurityId,*/ readMethod: "getSecurityId", writeMethod: "setSecurityId"});


/**
 * Sets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was sold
 */
SellInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units sold
 */
SellInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 30, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getUnits", writeMethod: "setUnits"});


/**
 * Sets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units sold
 */
SellInvestmentTransaction.prototype.setUnits = function(units) {
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
SellInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 40, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getUnitPrice", writeMethod: "setUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
SellInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markedown price
 */
SellInvestmentTransaction.prototype.getMarkdown = function() {
  return this.markdown;
};
Element.add({name: "MARKDOWN", order: 50, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getMarkdown", writeMethod: "setMarkdown"});


/**
 * Sets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} markdown the per unit markedown price
 */
SellInvestmentTransaction.prototype.setMarkdown = function(markdown) {
  this.markdown = markdown;
};


/**
 * Gets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
SellInvestmentTransaction.prototype.getCommission = function() {
  return this.commission;
};
Element.add({name: "COMMISSION", order: 60, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getCommission", writeMethod: "setCommission"});


/**
 * Sets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
SellInvestmentTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
SellInvestmentTransaction.prototype.getTaxes = function() {
  return this.taxes;
};
Element.add({name: "TAXES", order: 70, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getTaxes", writeMethod: "setTaxes"});


/**
 * Sets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
SellInvestmentTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
SellInvestmentTransaction.prototype.getFees = function() {
  return this.fees;
};
Element.add({name: "FEES", order: 80, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getFees", writeMethod: "setFees"});


/**
 * Sets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
SellInvestmentTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
SellInvestmentTransaction.prototype.getLoad = function() {
  return this.load;
};
Element.add({name: "LOAD", order: 90, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getLoad", writeMethod: "setLoad"});


/**
 * Sets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
SellInvestmentTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the withholding
 */
SellInvestmentTransaction.prototype.getWithholding = function() {
  return this.withholding;
};
Element.add({name: "WITHHOLDING", order: 93, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getWithholding", writeMethod: "setWithholding"});


/**
 * Sets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} withholding the withholding
 */
SellInvestmentTransaction.prototype.setWithholding = function(withholding) {
  this.withholding = withholding;
};


/**
 * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
SellInvestmentTransaction.prototype.getTaxExempt = function() {
  return this.taxExempt;
};
Element.add({name: "TAXEXEMPT", order: 97, owner: SellInvestmentTransaction, /*type: Boolean,*/ readMethod: "getTaxExempt", writeMethod: "setTaxExempt"});


/**
 * Sets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Boolean} taxExempt whether the transaction was tax exempt
 */
SellInvestmentTransaction.prototype.setTaxExempt = function(taxExempt) {
  this.taxExempt = taxExempt;
};


/**
 * Gets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
SellInvestmentTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add({name: "TOTAL", required: true, order: 100, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getTotal", writeMethod: "setTotal"});


/**
 * Sets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} total the total
 */
SellInvestmentTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the gain for the sale
 */
SellInvestmentTransaction.prototype.getGain = function() {
  return this.gain;
};
Element.add({name: "GAIN", order: 105, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getGain", writeMethod: "setGain"});


/**
 * Sets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} gain the gain for the sale
 */
SellInvestmentTransaction.prototype.setGain = function(gain) {
  this.gain = gain;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
SellInvestmentTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 110, owner: SellInvestmentTransaction, /*type: String,*/ readMethod: "getCurrencyCode", writeMethod: "setCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
SellInvestmentTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
SellInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 120, owner: SellInvestmentTransaction, /*type: OriginalCurrency,*/ readMethod: "getOriginalCurrencyInfo", writeMethod: "setOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction
 */
SellInvestmentTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
SellInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 130, owner: SellInvestmentTransaction, /*type: String,*/ readMethod: "getSubAccountSecurity", writeMethod: "setSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
SellInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
SellInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the security is being transfered from
 * (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
SellInvestmentTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 140, owner: SellInvestmentTransaction, /*type: String,*/ readMethod: "getSubAccountFund", writeMethod: "setSubAccountFund"});


/**
 * Sets the sub account type that the security is being transfered from
 * (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
SellInvestmentTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
SellInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the loan id
 */
SellInvestmentTransaction.prototype.getLoanId = function() {
  return this.loanId;
};
Element.add({name: "LOANID", order: 150, owner: SellInvestmentTransaction, /*type: String,*/ readMethod: "getLoanId", writeMethod: "setLoanId"});


/**
 * Sets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} loanId the loan id
 */
SellInvestmentTransaction.prototype.setLoanId = function(loanId) {
  this.loanId = loanId;
};


/**
 * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
SellInvestmentTransaction.prototype.getStateWithholding = function() {
  return this.stateWithholding;
};
Element.add({name: "STATEWITHHOLDING", order: 160, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getStateWithholding", writeMethod: "setStateWithholding"});


/**
 * Sets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} stateWithholding the state withholding
 */
SellInvestmentTransaction.prototype.setStateWithholding = function(stateWithholding) {
  this.stateWithholding = stateWithholding;
};


/**
 * Gets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
SellInvestmentTransaction.prototype.getPenalty = function() {
  return this.penalty;
};
Element.add({name: "PENALTY", order: 170, owner: SellInvestmentTransaction, /*type: Double,*/ readMethod: "getPenalty", writeMethod: "setPenalty"});


/**
 * Sets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} penalty the state withholding
 */
SellInvestmentTransaction.prototype.setPenalty = function(penalty) {
  this.penalty = penalty;
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
SellInvestmentTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 180, owner: SellInvestmentTransaction, /*type: String,*/ readMethod: "get401kSource", writeMethod: "set401kSource"});


/**
 * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
SellInvestmentTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
SellInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = SellInvestmentTransaction;
