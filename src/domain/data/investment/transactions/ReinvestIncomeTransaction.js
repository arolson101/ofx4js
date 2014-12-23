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
var Inv401KSource = require("domain/data/investment/positions/Inv401KSource");
var SecurityId = require("domain/data/seclist/SecurityId");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

/**
 * Transaction for reinvestment transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
function ReinvestIncomeTransaction () {

  /**
   * @name ReinvestIncomeTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name ReinvestIncomeTransaction#incomeType
   * @type String
   * @access private
   */
  this.incomeType = null;

  /**
   * @name ReinvestIncomeTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name ReinvestIncomeTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name ReinvestIncomeTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name ReinvestIncomeTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name ReinvestIncomeTransaction#commission
   * @type Double
   * @access private
   */
  this.commission = null;

  /**
   * @name ReinvestIncomeTransaction#taxes
   * @type Double
   * @access private
   */
  this.taxes = null;

  /**
   * @name ReinvestIncomeTransaction#fees
   * @type Double
   * @access private
   */
  this.fees = null;

  /**
   * @name ReinvestIncomeTransaction#load
   * @type Double
   * @access private
   */
  this.load = null;

  /**
   * @name ReinvestIncomeTransaction#taxExempt
   * @type Boolean
   * @access private
   */
  this.taxExempt = null;

  /**
   * @name ReinvestIncomeTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name ReinvestIncomeTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name ReinvestIncomeTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(ReinvestIncomeTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(ReinvestIncomeTransaction, "implements", TransactionWithSecurity);


Aggregate.add("REINVEST", ReinvestIncomeTransaction);


ReinvestIncomeTransaction.prototype.ReinvestIncomeTransaction = function() {
  super(TransactionType.REINVEST_INCOME);
};


/**
 * Gets the id of the security that was reinvested in. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was reinvested in
 */
ReinvestIncomeTransaction.prototype.getSecurityId = function() {
  return securityId;
};
ChildAggregate.add({required: true, order: 20, owner: ReinvestIncomeTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was reinvested in. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was reinvested in
 */
ReinvestIncomeTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @return {String} the type of income
 */
ReinvestIncomeTransaction.prototype.getIncomeType = function() {
  return incomeType;
};
Element.add({name: "INCOMETYPE", required: true, order: 30, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getIncomeType"});


/**
 * Sets the type of income. One of "CGLONG" (long term capital gains), "CGSHORT" (short term
 * capital gains), "DIV" (dividend), INTEREST, or MISC. This is a required field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec" This is a required field according to the OFX spec.
 *
 * @param {String} incomeType the type of income
 */
ReinvestIncomeTransaction.prototype.setIncomeType = function(incomeType) {
  this.incomeType = incomeType;
};


/**
 * Gets the type of income as one of the well-known types.
 *
 * @return {IncomeType} the income type or null if it's not one of the well-known types
 */
ReinvestIncomeTransaction.prototype.getIncomeTypeEnum = function() {
  return IncomeType.fromOfx(getIncomeType());
};


/**
 * Gets the total income received. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
ReinvestIncomeTransaction.prototype.getTotal = function() {
  return total;
};
Element.add({name: "TOTAL", required: true, order: 40, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getTotal"});


/**
 * Sets the total income received. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
ReinvestIncomeTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
ReinvestIncomeTransaction.prototype.getSubAccountSecurity = function() {
  return subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 50, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
ReinvestIncomeTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
ReinvestIncomeTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(getSubAccountSecurity());
};


/**
 * Gets the number of units of the security that was reinvested in. This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased
 */
ReinvestIncomeTransaction.prototype.getUnits = function() {
  return units;
};
Element.add({name: "UNITS", required: true, order: 60, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was reinvested in. This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units purchased
 */
ReinvestIncomeTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
ReinvestIncomeTransaction.prototype.getUnitPrice = function() {
  return unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 70, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
ReinvestIncomeTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the transaction commission for the reinvestment. This is an optional field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
ReinvestIncomeTransaction.prototype.getCommission = function() {
  return commission;
};
Element.add({name: "COMMISSION", order: 80, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getCommission"});


/**
 * Sets the transaction commission for the reinvestment. This is an optional field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} commission the transaction commision
 */
ReinvestIncomeTransaction.prototype.setCommission = function(commission) {
  this.commission = commission;
};


/**
 * Gets the taxes for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
ReinvestIncomeTransaction.prototype.getTaxes = function() {
  return taxes;
};
Element.add({name: "TAXES", order: 90, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getTaxes"});


/**
 * Sets the taxes for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} taxes the transaction taxes
 */
ReinvestIncomeTransaction.prototype.setTaxes = function(taxes) {
  this.taxes = taxes;
};


/**
 * Gets the fees for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
ReinvestIncomeTransaction.prototype.getFees = function() {
  return fees;
};
Element.add({name: "FEES", order: 100, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getFees"});


/**
 * Sets the fees for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} fees the transaction fees
 */
ReinvestIncomeTransaction.prototype.setFees = function(fees) {
  this.fees = fees;
};


/**
 * Gets the load for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
ReinvestIncomeTransaction.prototype.getLoad = function() {
  return load;
};
Element.add({name: "LOAD", order: 110, owner: ReinvestIncomeTransaction, /*type: Double,*/ fcn: "getLoad"});


/**
 * Sets the load for the reinvestment. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} load the load
 */
ReinvestIncomeTransaction.prototype.setLoad = function(load) {
  this.load = load;
};


/**
 * Gets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
ReinvestIncomeTransaction.prototype.getTaxExempt = function() {
  return taxExempt;
};
Element.add({name: "TAXEXEMPT", order: 120, owner: ReinvestIncomeTransaction, /*type: Boolean,*/ fcn: "getTaxExempt"});


/**
 * Sets whether the income was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Boolean} taxExempt whether the transaction was tax exempt
 */
ReinvestIncomeTransaction.prototype.setTaxExempt = function(taxExempt) {
  this.taxExempt = taxExempt;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
ReinvestIncomeTransaction.prototype.getCurrencyCode = function() {
  return currencyCode;
};
Element.add({name: "CURRENCY", order: 130, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
ReinvestIncomeTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction.
 */
ReinvestIncomeTransaction.prototype.getOriginalCurrencyInfo = function() {
  return originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 140, owner: ReinvestIncomeTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the original currency info for the transaction.
 */
ReinvestIncomeTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
ReinvestIncomeTransaction.prototype.get401kSource = function() {
  return inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 150, owner: ReinvestIncomeTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
ReinvestIncomeTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known
 */
ReinvestIncomeTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(get401kSource());
};




module.exports = ReinvestIncomeTransaction;
