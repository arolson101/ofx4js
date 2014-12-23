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
 * Transaction for a stock split.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
function SplitTransaction () {

  /**
   * @name SplitTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SplitTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name SplitTransaction#oldUnits
   * @type Double
   * @access private
   */
  this.oldUnits = null;

  /**
   * @name SplitTransaction#newUnits
   * @type Double
   * @access private
   */
  this.newUnits = null;

  /**
   * @name SplitTransaction#numerator
   * @type Double
   * @access private
   */
  this.numerator = null;

  /**
   * @name SplitTransaction#denominator
   * @type Double
   * @access private
   */
  this.denominator = null;

  /**
   * @name SplitTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SplitTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name SplitTransaction#cashForFractionalUnits
   * @type Double
   * @access private
   */
  this.cashForFractionalUnits = null;

  /**
   * @name SplitTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name SplitTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(SplitTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("SPLIT", SplitTransaction);


SplitTransaction.prototype.SplitTransaction = function() {
  super(TransactionType.SPLIT);
};


/**
 * Gets the id of the security for the split. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security for the expsense
 */
SplitTransaction.prototype.getSecurityId = function() {
  return securityId;
};
ChildAggregate.add({required: true, order: 20, owner: SplitTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security for the split. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security for the expsense
 */
SplitTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
SplitTransaction.prototype.getSubAccountSecurity = function() {
  return subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 30, owner: SplitTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
SplitTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
SplitTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(getSubAccountSecurity());
};


/**
 * Gets the old number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @return {Double} the old number of units.
 */
SplitTransaction.prototype.getOldUnits = function() {
  return oldUnits;
};
Element.add({name: "OLDUNITS", order: 40, owner: SplitTransaction, /*type: Double,*/ fcn: "getOldUnits"});


/**
 * Sets the old number of units for the split. This is a  equired field according to the OFX
 * spec.
 *
 * @param {Double} oldUnits the old number of units.
 */
SplitTransaction.prototype.setOldUnits = function(oldUnits) {
  this.oldUnits = oldUnits;
};


/**
 * Gets the new number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @return {Double} the new number of units.
 */
SplitTransaction.prototype.getNewUnits = function() {
  return newUnits;
};
Element.add({name: "NEWUNITS", order: 50, owner: SplitTransaction, /*type: Double,*/ fcn: "getNewUnits"});


/**
 * Sets the new number of units for the split. This is a required field according to the OFX
 * spec.
 *
 * @param {Double} newUnits the new number of units.
 */
SplitTransaction.prototype.setNewUnits = function(newUnits) {
  this.newUnits = newUnits;
};


/**
 * Gets the numerator for the split ratio. This is a required field according to the OFX spec.
 *
 * @return {Double} the numerator for the split ratio
 */
SplitTransaction.prototype.getNumerator = function() {
  return numerator;
};
Element.add({name: "NUMERATOR", order: 60, owner: SplitTransaction, /*type: Double,*/ fcn: "getNumerator"});


/**
 * Sets the numerator for the split ratio. This is a required field according to the OFX spec.
 *
 * @param {Double} numerator the numerator for the split ratio
 */
SplitTransaction.prototype.setNumerator = function(numerator) {
  this.numerator = numerator;
};


/**
 * Gets the denominator for the split ratio. This is a required field according to the OFX spec.
 *
 * @return {Double} the numerator for the split ratio
 */
SplitTransaction.prototype.getDenominator = function() {
  return denominator;
};
Element.add({name: "DENOMINATOR", order: 70, owner: SplitTransaction, /*type: Double,*/ fcn: "getDenominator"});


/**
 * Sets the denominator for the split ratio. This is a required field according to the OFX spec.
 *
 * @param {Double} denominator the numerator for the split ratio
 */
SplitTransaction.prototype.setDenominator = function(denominator) {
  this.denominator = denominator;
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
SplitTransaction.prototype.getCurrencyCode = function() {
  return currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: SplitTransaction, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * sets the currency code for the transaction. Only one of currency code or original currency
 * code should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {void} the currency code for the transaction
 */
SplitTransaction.prototype.setCurrencyCode = function(/*String*/ currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
SplitTransaction.prototype.getOriginalCurrencyInfo = function() {
  return originalCurrencyInfo;
};
Element.add({name: "ORIGCURRENCY", order: 90, owner: SplitTransaction, /*type: OriginalCurrency,*/ fcn: "getOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {void} the original currency info for the transaction
 */
SplitTransaction.prototype.setOriginalCurrencyInfo = function(/*OriginalCurrency*/ originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the cash for fractional units.
 *
 * @return {Double} the cash for fractional units
 */
SplitTransaction.prototype.getCashForFractionalUnits = function() {
  return cashForFractionalUnits;
};
Element.add({name: "FRACCASH", order: 100, owner: SplitTransaction, /*type: Double,*/ fcn: "getCashForFractionalUnits"});


/**
 * Sets the cash for fractional units.
 *
 * @param {Double} cashForFractionalUnits the cash for fractional units
 */
SplitTransaction.prototype.setCashForFractionalUnits = function(cashForFractionalUnits) {
  this.cashForFractionalUnits = cashForFractionalUnits;
};


/**
 * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
SplitTransaction.prototype.getSubAccountFund = function() {
  return subAccountFund;
};
Element.add({name: "SUBACCTFUND", order: 110, owner: SplitTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
SplitTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
SplitTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(getSubAccountFund());
};


/**
 * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
SplitTransaction.prototype.get401kSource = function() {
  return inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 120, owner: SplitTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
SplitTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
SplitTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(get401kSource());
};




module.exports = SplitTransaction;
