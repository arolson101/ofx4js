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
var SecurityId = require("../../seclist/SecurityId");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");
var OriginalCurrency = require("./OriginalCurrency");

/**
 * Transaction for return of capital transactions.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function ReturnOfCapitalTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.RETURN_OF_CAPITAL);

  /**
   * @name ReturnOfCapitalTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name ReturnOfCapitalTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;

  /**
   * @name ReturnOfCapitalTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name ReturnOfCapitalTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;

  /**
   * @name ReturnOfCapitalTransaction#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name ReturnOfCapitalTransaction#originalCurrencyInfo
   * @type OriginalCurrency
   * @access private
   */
  this.originalCurrencyInfo = null;

  /**
   * @name ReturnOfCapitalTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(ReturnOfCapitalTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(ReturnOfCapitalTransaction, "implements", TransactionWithSecurity);


Aggregate.add("RETOFCAP", ReturnOfCapitalTransaction);


/**
 * Gets the id of the security that capital was returned from. This is a required field according
 * to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that capital was returned from
 */
ReturnOfCapitalTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add(ReturnOfCapitalTransaction, {required: true, order: 20, attributeType: SecurityId, readMethod: "getSecurityId", writeMethod: "setSecurityId"});


/**
 * Sets the id of the security that capital was returned from. This is a required field according
 * to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that capital was returned from
 */
ReturnOfCapitalTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the total amount of capital returned. This is a required field according to the OFX spec.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
ReturnOfCapitalTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add(ReturnOfCapitalTransaction, {name: "TOTAL", required: true, order: 40, attributeType: Number, readMethod: "getTotal", writeMethod: "setTotal"});


/**
 * Sets the total amount of capital returned. This is a required field according to the OFX spec.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
ReturnOfCapitalTransaction.prototype.setTotal = function(total) {
  this.total = total;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
ReturnOfCapitalTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add(ReturnOfCapitalTransaction, {name: "SUBACCTSEC", order: 50, attributeType: String, readMethod: "getSubAccountSecurity", writeMethod: "setSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
 * required field according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
ReturnOfCapitalTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
ReturnOfCapitalTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the sub account type that the transaction affects.
 * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
ReturnOfCapitalTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add(ReturnOfCapitalTransaction, {name: "SUBACCTFUND", order: 140, attributeType: String, readMethod: "getSubAccountFund", writeMethod: "setSubAccountFund"});


/**
 * Sets the sub account type that the transaction affects.
 * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund
 */
ReturnOfCapitalTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
ReturnOfCapitalTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
ReturnOfCapitalTransaction.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add(ReturnOfCapitalTransaction, {name: "CURRENCY", order: 110, attributeType: String, readMethod: "getCurrencyCode", writeMethod: "setCurrencyCode"});


/**
 * Sets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} currencyCode the currency code for the transaction
 */
ReturnOfCapitalTransaction.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
  this.originalCurrencyInfo = null;
};


/**
 * Gets the original currency info for the transaction.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the currency code for the transaction.
 */
ReturnOfCapitalTransaction.prototype.getOriginalCurrencyInfo = function() {
  return this.originalCurrencyInfo;
};
Element.add(ReturnOfCapitalTransaction, {name: "ORIGCURRENCY", order: 120, attributeType: OriginalCurrency, readMethod: "getOriginalCurrencyInfo", writeMethod: "setOriginalCurrencyInfo"});


/**
 * Sets the original currency info for the transaction.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {OriginalCurrency} originalCurrencyInfo the currency code for the transaction.
 */
ReturnOfCapitalTransaction.prototype.setOriginalCurrencyInfo = function(originalCurrencyInfo) {
  this.originalCurrencyInfo = originalCurrencyInfo;
  this.currencyCode = null;
};


/**
 * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
ReturnOfCapitalTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add(ReturnOfCapitalTransaction, {name: "INV401KSOURCE", order: 180, attributeType: String, readMethod: "get401kSource", writeMethod: "set401kSource"});


/**
 * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * See "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
ReturnOfCapitalTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known.
 */
ReturnOfCapitalTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = ReturnOfCapitalTransaction;
