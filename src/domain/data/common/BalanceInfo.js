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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function BalanceInfo () {

  /**
   * @name BalanceInfo#amount
   * @type double
   * @access private
   */
  this.amount = null;

  /**
   * @name BalanceInfo#asOfDate
   * @type Date
   * @access private
   */
  this.asOfDate = null;
}



Aggregate.add("BalanceInfo", BalanceInfo);


/**
 * The amount.
 *
 * @return {double} The amount.
 */
BalanceInfo.prototype.getAmount = function() {
  return this.amount;
};
Element.add(BalanceInfo, {name: "BALAMT", required: true, order: 0, attributeType: double, readMethod: "getAmount", writeMethod: "setAmount"});


/**
 * The amount.
 *
 * @param {double} amount The amount.
 */
BalanceInfo.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The as-of date.
 *
 * @return {Date} The as-of date.
 */
BalanceInfo.prototype.getAsOfDate = function() {
  return this.asOfDate;
};
Element.add(BalanceInfo, {name: "DTASOF", required: true, order: 10, attributeType: Date, readMethod: "getAsOfDate", writeMethod: "setAsOfDate"});


/**
 * The as-of date.
 *
 * @param {Date} asOfDate The as-of date.
 */
BalanceInfo.prototype.setAsOfDate = function(asOfDate) {
  this.asOfDate = asOfDate;
};




module.exports = BalanceInfo;
