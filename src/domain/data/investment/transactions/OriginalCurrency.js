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
var Element = require("../../../../meta/Element");

/**
 * Original currency aggregate ("ORIGCURRENCY"). For investment transactions in other currencies,
 * the financial institution can report the transaction as converted into the default currency
 * and then include this child aggregate to report what the original currency was and what the
 * rate of conversion was.
 * @see "Section 5.2, OFX Spec"
 *
 * @class
 */
function OriginalCurrency () {

  /**
   * @name OriginalCurrency#currencyRate
   * @type double
   * @access private
   */
  this.currencyRate = null;

  /**
   * @name OriginalCurrency#currencyCode
   * @type String
   * @access private
   */
  this.currencyCode = null;
}



Aggregate.add("ORIGCURRENCY", OriginalCurrency);


/**
 * Gets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
 * the transaction response) to "CURSYM" (the original currency code below).
 *
 * @return {double} the currency rate
 */
OriginalCurrency.prototype.getCurrencyRate = function() {
  return this.currencyRate;
};
Element.add({name: "CURRATE", required: true, order: 10, owner: OriginalCurrency, /*type: double,*/ fcn: "getCurrencyRate"});


/**
 * Sets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
 * the transaction response) to "CURSYM" (the original currency code below).
 *
 * @param {double} currencyRate the currency rate
 */
OriginalCurrency.prototype.setCurrencyRate = function(currencyRate) {
  this.currencyRate = currencyRate;
};


/**
 * Gets the ISO-4217 3-letter currency identifier of the original currency.
 * @see java.util.Currency#getCurrencyCode()
 *
 * @return {String} the currency code
 */
OriginalCurrency.prototype.getCurrencyCode = function() {
  return this.currencyCode;
};
Element.add({name: "CURSYM", required: true, order: 20, owner: OriginalCurrency, /*type: String,*/ fcn: "getCurrencyCode"});


/**
 * Sets the ISO-4217 3-letter currency identifier of the original currency.
 * @see java.util.Currency#getCurrencyCode()
 *
 * @param {String} currencyCode the currency code
 */
OriginalCurrency.prototype.setCurrencyCode = function(currencyCode) {
  this.currencyCode = currencyCode;
};




module.exports = OriginalCurrency;
