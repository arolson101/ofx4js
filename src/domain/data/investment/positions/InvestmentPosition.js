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
var SecurityId = require("domain/data/seclist/SecurityId");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * Class for the investment position aggregate.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
function InvestmentPosition () {

  /**
   * @name InvestmentPosition#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name InvestmentPosition#heldInAccount
   * @type String
   * @access private
   */
  this.heldInAccount = null;

  /**
   * @name InvestmentPosition#positionType
   * @type String
   * @access private
   */
  this.positionType = null;

  /**
   * @name InvestmentPosition#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name InvestmentPosition#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name InvestmentPosition#marketValue
   * @type Double
   * @access private
   */
  this.marketValue = null;

  /**
   * @name InvestmentPosition#marketValueDate
   * @type Date
   * @access private
   */
  this.marketValueDate = null;

  /**
   * @name InvestmentPosition#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name InvestmentPosition#memo
   * @type String
   * @access private
   */
  this.memo = null;

  /**
   * @name InvestmentPosition#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}



Aggregate.add("INVPOS", InvestmentPosition);


/**
 * Gets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SecurityId} the security id for the position
 */
InvestmentPosition.prototype.getSecurityId = function() {
  return securityId;
};
ChildAggregate.add({required: true, order: 10, owner: InvestmentPosition, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {SecurityId} securityId the security id for the position
 */
InvestmentPosition.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the sub-account type
 */
InvestmentPosition.prototype.getHeldInAccount = function() {
  return heldInAccount;
};
Element.add({name: "HELDINACCT", required: true, order: 20, owner: InvestmentPosition, /*type: String,*/ fcn: "getHeldInAccount"});


/**
 * Sets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} heldInAccount the sub-account type
 */
InvestmentPosition.prototype.setHeldInAccount = function(heldInAccount) {
  this.heldInAccount = heldInAccount;
};


/**
 * Gets the sub-account type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SubAccountType} the sub-account type or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.getHeldInAccountEnum = function() {
  return SubAccountType.fromOfx(getHeldInAccount());
};


/**
 * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the position type
 */
InvestmentPosition.prototype.getPositionType = function() {
  return positionType;
};
Element.add({name: "POSTYPE", required: true, order: 30, owner: InvestmentPosition, /*type: String,*/ fcn: "getPositionType"});


/**
 * Sets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} positionType the position type
 */
InvestmentPosition.prototype.setPositionType = function(positionType) {
  this.positionType = positionType;
};


/**
 * Gets the position type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {PositionType} the position type or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(getPositionType());
};


/**
 * Gets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the number of units in the position
 */
InvestmentPosition.prototype.getUnits = function() {
  return units;
};
Element.add({name: "UNITS", required: true, order: 40, owner: InvestmentPosition, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} units the number of units in the position
 */
InvestmentPosition.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the per unit price
 */
InvestmentPosition.prototype.getUnitPrice = function() {
  return unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 50, owner: InvestmentPosition, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
InvestmentPosition.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the market value of the position
 */
InvestmentPosition.prototype.getMarketValue = function() {
  return marketValue;
};
Element.add({name: "MKTVAL", required: true, order: 60, owner: InvestmentPosition, /*type: Double,*/ fcn: "getMarketValue"});


/**
 * Sets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Double} marketValue the market value of the position
 */
InvestmentPosition.prototype.setMarketValue = function(marketValue) {
  this.marketValue = marketValue;
};


/**
 * Gets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Date} the market value date
 */
InvestmentPosition.prototype.getMarketValueDate = function() {
  return marketValueDate;
};
Element.add({name: "DTPRICEASOF", required: true, order: 70, owner: InvestmentPosition, /*type: Date,*/ fcn: "getMarketValueDate"});


/**
 * Sets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {Date} marketValueDate the market value date
 */
InvestmentPosition.prototype.setMarketValueDate = function(marketValueDate) {
  this.marketValueDate = marketValueDate;
};


/**
 * Gets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the currency code of the position or null for the default currency
 */
InvestmentPosition.prototype.getCurrencyCode = function() {
  return currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: InvestmentPosition, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} currencyCode the currency code of the position or null for the default currency
 */
InvestmentPosition.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * Gets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the memo
 */
InvestmentPosition.prototype.getMemo = function() {
  return memo;
};
Element.add({name: "MEMO", order: 90, owner: InvestmentPosition, /*type: String,*/ fcn: "getMemo"});


/**
 * Sets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @param {String} memo the memo
 */
InvestmentPosition.prototype.setMemo = function(memo) {
  this.memo = memo;
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
InvestmentPosition.prototype.get401kSource = function() {
  return inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 100, owner: InvestmentPosition, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the 401k source
 */
InvestmentPosition.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if it's not one of the well-known types
 */
InvestmentPosition.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(get401kSource());
};




module.exports = InvestmentPosition;
