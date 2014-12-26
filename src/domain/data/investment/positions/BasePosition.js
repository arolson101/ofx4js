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
var ChildAggregate = require("../../../../meta/ChildAggregate");
var PositionType = require("./PositionType");
var Inv401KSource = require("./Inv401KSource");

/**
 * Base class for the various types of positions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all positions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 */
function BasePosition () {

  /**
   * @name BasePosition#investmentPosition
   * @type InvestmentPosition
   * @access private
   */
  this.investmentPosition = null;
}





/**
 * Gets the investment position child aggregate.
 *
 * @return {InvestmentPosition} the investment position child aggregate
 */
BasePosition.prototype.getInvestmentPosition = function() {
  return this.investmentPosition;
};
ChildAggregate.add(BasePosition, {required: true, order: 10, attributeType: InvestmentPosition, readMethod: "getInvestmentPosition", writeMethod: "setInvestmentPosition"});


/**
 * Sets the investment position child aggregate.
 *
 * @param {InvestmentPosition} investmentPosition the investment position child aggregate
 */
BasePosition.prototype.setInvestmentPosition = function(investmentPosition) {
  this.investmentPosition = investmentPosition;
};


/**
 * Gets the security id for the position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SecurityId} the security id for the position
 */
BasePosition.prototype.getSecurityId = function() {
  return this.getInvestmentPosition().getSecurityId();
};


/**
 * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the sub-account type
 */
BasePosition.prototype.getHeldInAccount = function() {
  return this.getInvestmentPosition().getHeldInAccount();
};


/**
 * Gets the sub-account type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {SubAccountType} the sub-account type or null if it's not one of the well-known types
 */
BasePosition.prototype.getHeldInAccountEnum = function() {
  return SubAccountType.fromOfx(this.getHeldInAccount());
};


/**
 * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the position type
 */
BasePosition.prototype.getPositionType = function() {
  return this.getInvestmentPosition().getPositionType();
};


/**
 * Gets the position type as one of the well-known types.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {PositionType} the position type or null if it's not one of the well-known types
 */
BasePosition.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(this.getPositionType());
};


/**
 * Gets the number of units in the position. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the number of units in the position
 */
BasePosition.prototype.getUnits = function() {
  return this.getInvestmentPosition().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BasePosition.prototype.getUnitPrice = function() {
  return this.getInvestmentPosition().getUnitPrice();
};


/**
 * Gets the market value of this position. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Double} the market value of the position
 */
BasePosition.prototype.getMarketValue = function() {
  return this.getInvestmentPosition().getMarketValue();
};


/**
 * Gets the date and time of the unit price and market value. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {Date} the market value date
 */
BasePosition.prototype.getMarketValueDate = function() {
  return this.getInvestmentPosition().getMarketValueDate();
};


/**
 * Gets the currency code of the position. This is an optional field according to the OFX spec.
 * If not present, it's the default currency of the account.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the currency code of the position or null for the default currency
 */
BasePosition.prototype.getCurrencyCode = function() {
  return this.getInvestmentPosition().getCurrencyCode();
};


/**
 * Gets the memo associated with the position. This is an optional field according to the OFX
 * spec.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @return {String} the memo
 */
BasePosition.prototype.getMemo = function() {
  return this.getInvestmentPosition().getMemo();
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
BasePosition.prototype.get401kSource = function() {
  return this.getInvestmentPosition().get401kSource();
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if it's not one of the well-known types
 */
BasePosition.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = BasePosition;
