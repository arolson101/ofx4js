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

var BasePosition = require("./BasePosition");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Represents a stock position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function StockPosition () {

  /**
   * @name StockPosition#unitsStreet
   * @type Double
   * @access private
   */
  this.unitsStreet = null;

  /**
   * @name StockPosition#unitsUser
   * @type Double
   * @access private
   */
  this.unitsUser = null;

  /**
   * @name StockPosition#reinvestDividends
   * @type Boolean
   * @access private
   */
  this.reinvestDividends = null;
}

inherit(StockPosition, "extends", BasePosition);


Aggregate.add("POSSTOCK", StockPosition);


/**
 * Gets the number of units in the financial insititution's street name.
 *
 * @return {Double} the number of units in the financial insititution's street name.
 */
StockPosition.prototype.getUnitsStreet = function() {
  return this.unitsStreet;
};
Element.add({name: "UNITSSTREET", order: 20, owner: StockPosition, /*type: Double,*/ readMethod: "getUnitsStreet", writeMethod: "setUnitsStreet"});


/**
 * Sets the number of units in the financial insititution's street name.
 *
 * @param {Double} unitsStreet the number of units in the financial insititution's street name.
 */
StockPosition.prototype.setUnitsStreet = function(unitsStreet) {
  this.unitsStreet = unitsStreet;
};


/**
 * Gets the number of units in the user's name.
 *
 * @return {Double} the number of units in the user's name.
 */
StockPosition.prototype.getUnitsUser = function() {
  return this.unitsUser;
};
Element.add({name: "UNITSUSER", order: 30, owner: StockPosition, /*type: Double,*/ readMethod: "getUnitsUser", writeMethod: "setUnitsUser"});


/**
 * Sets the number of units in the user's name.
 *
 * @param {Double} unitsUser the number of units in the user's name.
 */
StockPosition.prototype.setUnitsUser = function(unitsUser) {
  this.unitsUser = unitsUser;
};


/**
 * Gets whether dividends are automatically reinvested.
 *
 * @return {Boolean} whether dividends are automatically reinvested
 */
StockPosition.prototype.getReinvestDividends = function() {
  return this.reinvestDividends;
};
Element.add({name: "REINVDIV", order: 40, owner: StockPosition, /*type: Boolean,*/ readMethod: "getReinvestDividends", writeMethod: "setReinvestDividends"});


/**
 * Sets whether dividends are automatically reinvested.
 *
 * @param {Boolean} reinvestDividends whether dividends are automatically reinvested
 */
StockPosition.prototype.setReinvestDividends = function(reinvestDividends) {
  this.reinvestDividends = reinvestDividends;
};




module.exports = StockPosition;
