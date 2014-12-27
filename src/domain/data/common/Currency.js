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
 * @see "Section 5.2, OFX Spec"
 */
function Currency () {

  /**
   * @name Currency#code
   * @type String
   * @access private
   */
  this.code = "USD";

  /**
   * @name Currency#exchangeRate
   * @type Float
   * @access private
   */
  this.exchangeRate = null;
}



Aggregate.add("CURRENCY", Currency);


/**
 * The currency code.
 *
 * @return {String} The currency code.
 * @see java.util.Currency#getCurrencyCode()
 */
Currency.prototype.getCode = function() {
  return this.code;
};
Element.add(Currency, {name: "CURSYM", required: true, order: 0, attributeType: String, readMethod: "getCode", writeMethod: "setCode"});


/**
 * The currency code
 *
 * @param {String} code The currency code
 */
Currency.prototype.setCode = function(code) {
  this.code = code;
};


/**
 * The exchange rate.
 *
 * @return {Float} The exchange rate.
 */
Currency.prototype.getExchangeRate = function() {
  return this.exchangeRate;
};
Element.add(Currency, {name: "CURRATE", required: true, order: 10, attributeType: Number, readMethod: "getExchangeRate", writeMethod: "setExchangeRate"});


/**
 * The exchange rate.
 *
 * @param {Float} exchangeRate The exchange rate.
 */
Currency.prototype.setExchangeRate = function(exchangeRate) {
  this.exchangeRate = exchangeRate;
};




module.exports = Currency;
