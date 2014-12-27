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

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BalanceList = require("./BalanceList");

/**
 * Aggregate for the investment balance.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @class
 */
function InvestmentBalance () {

  /**
   * @name InvestmentBalance#availableCash
   * @type Double
   * @access private
   */
  this.availableCash = null;

  /**
   * @name InvestmentBalance#marginBalance
   * @type Double
   * @access private
   */
  this.marginBalance = null;

  /**
   * @name InvestmentBalance#shortBalance
   * @type Double
   * @access private
   */
  this.shortBalance = null;

  /**
   * @name InvestmentBalance#buyingPower
   * @type Double
   * @access private
   */
  this.buyingPower = null;

  /**
   * @name InvestmentBalance#balanceList
   * @type BalanceList
   * @access private
   */
  this.balanceList = null;
}



Aggregate.add("INVBAL", InvestmentBalance);


/**
 * Gets the available cash balance across all sub-accounts, including sweep funds. This is
 * required field according to the OFX spec.
 *
 * @return {Double} the available cash balance
 */
InvestmentBalance.prototype.getAvailableCash = function() {
  return this.availableCash;
};
Element.add(InvestmentBalance, {name: "AVAILCASH", required: true, order: 10, attributeType: Number, readMethod: "getAvailableCash", writeMethod: "setAvailableCash"});


/**
 * Sets the available cash balance across all sub-accounts, including sweep funds. This is
 * required field according to the OFX spec.
 *
 * @param {Double} availableCash the available cash balance
 */
InvestmentBalance.prototype.setAvailableCash = function(availableCash) {
  this.availableCash = availableCash;
};


/**
 * Gets the margin account balance. A positive balance indicates a positive cash balance, while
 * a negative balance indicates the customer borrowed funds. This is a required field according
 * to the OFX spec.
 *
 * @return {Double} the margin account balance
 */
InvestmentBalance.prototype.getMarginBalance = function() {
  return this.marginBalance;
};
Element.add(InvestmentBalance, {name: "MARGINBALANCE", required: true, order: 20, attributeType: Number, readMethod: "getMarginBalance", writeMethod: "setMarginBalance"});


/**
 * Sets the margin account balance. A positive balance indicates a positive cash balance, while
 * a negative balance indicates the customer borrowed funds. This is a required field according
 * to the OFX spec.
 *
 * @param {Double} marginBalance the margin account balance
 */
InvestmentBalance.prototype.setMarginBalance = function(marginBalance) {
  this.marginBalance = marginBalance;
};


/**
 * Gets the market value of all short positions. This is a positive balance. This is a required
 * field according to the OFX spec.
 *
 * @return {Double} the market value of all short positions
 */
InvestmentBalance.prototype.getShortBalance = function() {
  return this.shortBalance;
};
Element.add(InvestmentBalance, {name: "SHORTBALANCE", required: true, order: 30, attributeType: Number, readMethod: "getShortBalance", writeMethod: "setShortBalance"});


/**
 * Sets the market value of all short positions. This is a positive balance. This is a required
 * field according to the OFX spec.
 *
 * @param {Double} shortBalance the market value of all short positions
 */
InvestmentBalance.prototype.setShortBalance = function(shortBalance) {
  this.shortBalance = shortBalance;
};


/**
 * Gets the buying power amount. This is an optional field according to the OFX spec.
 *
 * @return {Double} the buying power
 */
InvestmentBalance.prototype.getBuyingPower = function() {
  return this.buyingPower;
};
Element.add(InvestmentBalance, {name: "BUYPOWER", order: 40, attributeType: Number, readMethod: "getBuyingPower", writeMethod: "setBuyingPower"});


/**
 * Sets the buying power amount. This is an optional field according to the OFX spec.
 *
 * @param {Double} buyingPower the buying power
 */
InvestmentBalance.prototype.setBuyingPower = function(buyingPower) {
  this.buyingPower = buyingPower;
};


/**
 * Gets the investment balance list. This is an optional field according to the OFX spec.
 *
 * @return {BalanceList} the investment balance list
 */
InvestmentBalance.prototype.getBalanceList = function() {
  return this.balanceList;
};
ChildAggregate.add(InvestmentBalance, {order: 50, attributeType: BalanceList, readMethod: "getBalanceList", writeMethod: "setBalanceList"});


/**
 * Sets the investment balance list. This is an optional field according to the OFX spec.
 *
 * @param {BalanceList} balanceList the investment balance list
 */
InvestmentBalance.prototype.setBalanceList = function(balanceList) {
  this.balanceList = balanceList;
};




module.exports = InvestmentBalance;
