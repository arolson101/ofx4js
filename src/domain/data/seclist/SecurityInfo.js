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

var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * Info about a security.
 * @see "Section 13.8.5.1, OFX Spec"
 *
 * @class
 */
function SecurityInfo () {

  /**
   * @name SecurityInfo#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SecurityInfo#securityName
   * @type String
   * @access private
   */
  this.securityName = null;

  /**
   * @name SecurityInfo#tickerSymbol
   * @type String
   * @access private
   */
  this.tickerSymbol = null;

  /**
   * @name SecurityInfo#fiId
   * @type String
   * @access private
   */
  this.fiId = null;

  /**
   * @name SecurityInfo#rating
   * @type String
   * @access private
   */
  this.rating = null;

  /**
   * @name SecurityInfo#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name SecurityInfo#marketValueDate
   * @type Date
   * @access private
   */
  this.marketValueDate = null;

  /**
   * @name SecurityInfo#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;

  /**
   * @name SecurityInfo#memo
   * @type String
   * @access private
   */
  this.memo = null;
}



Aggregate.add("SECINFO", SecurityInfo);


/**
 * Gets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id
 */
SecurityInfo.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 10, owner: SecurityInfo, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @param {SecurityId} securityId the security id
 */
SecurityInfo.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the full name of the security. This is a required field according to the OFX spec.
 *
 * @return {String} the full name of the security
 */
SecurityInfo.prototype.getSecurityName = function() {
  return this.securityName;
};
Element.add({name: "SECNAME", required: true, order: 20, owner: SecurityInfo, /*type: String,*/ fcn: "getSecurityName"});


/**
 * Sets the full name of the security. This is a required field according to the OFX spec.
 *
 * @param {String} securityName the full name of the security
 */
SecurityInfo.prototype.setSecurityName = function(securityName) {
  this.securityName = securityName;
};


/**
 * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the ticket symbol or null if there's no ticker symbol
 */
SecurityInfo.prototype.getTickerSymbol = function() {
  return this.tickerSymbol;
};
Element.add({name: "TICKER", order: 30, owner: SecurityInfo, /*type: String,*/ fcn: "getTickerSymbol"});


/**
 * Sets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @param {String} tickerSymbol the ticket symbol or null if there's no ticker symbol
 */
SecurityInfo.prototype.setTickerSymbol = function(tickerSymbol) {
  this.tickerSymbol = tickerSymbol;
};


/**
 * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the FI ID number for the security
 */
SecurityInfo.prototype.getFiId = function() {
  return this.fiId;
};
Element.add({name: "FIID", order: 40, owner: SecurityInfo, /*type: String,*/ fcn: "getFiId"});


/**
 * Sets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @param {String} fiId the FI ID number for the security
 */
SecurityInfo.prototype.setFiId = function(fiId) {
  this.fiId = fiId;
};


/**
 * Gets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the rating
 */
SecurityInfo.prototype.getRating = function() {
  return this.rating;
};
Element.add({name: "RATING", order: 50, owner: SecurityInfo, /*type: String,*/ fcn: "getRating"});


/**
 * Sets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @param {String} rating the rating
 */
SecurityInfo.prototype.setRating = function(rating) {
  this.rating = rating;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a noptional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
SecurityInfo.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", order: 60, owner: SecurityInfo, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
SecurityInfo.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date as-of for the unit price
 */
SecurityInfo.prototype.getUnitPriceAsOfDate = function() {
  return this.marketValueDate;
};
Element.add({name: "DTASOF", order: 70, owner: SecurityInfo, /*type: Date,*/ fcn: "getUnitPriceAsOfDate"});


/**
 * Sets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * param marketValueDate the date as-of for the unit price
 */
SecurityInfo.prototype.setUnitPriceAsOfDate = function(/*Date*/ marketValueDate) {
  this.marketValueDate = marketValueDate;
};


/**
 * Gets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the overriding currency code or null to mean the default currency
 */
SecurityInfo.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURRENCY", order: 80, owner: SecurityInfo, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @param {String} currencyCode the overriding currency code or null to mean the default currency
 */
SecurityInfo.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};


/**
 * Gets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the memo
 */
SecurityInfo.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 90, owner: SecurityInfo, /*type: String,*/ fcn: "getMemo"});


/**
 * Sets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} memo the memo
 */
SecurityInfo.prototype.setMemo = function(memo) {
  this.memo = memo;
};




module.exports = SecurityInfo;
