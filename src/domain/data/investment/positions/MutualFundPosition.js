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

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BasePosition = require("./BasePosition");

/**
 * Represents a mutual fund position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @class
 * @augments BasePosition
 */
function MutualFundPosition () {

  /**
   * @name MutualFundPosition#unitsStreet
   * @type Double
   * @access private
   */
  this.unitsStreet = null;

  /**
   * @name MutualFundPosition#unitsUser
   * @type Double
   * @access private
   */
  this.unitsUser = null;

  /**
   * @name MutualFundPosition#reinvestDividends
   * @type Boolean
   * @access private
   */
  this.reinvestDividends = null;

  /**
   * @name MutualFundPosition#reinvestCapitalGains
   * @type Boolean
   * @access private
   */
  this.reinvestCapitalGains = null;
}

inherit(MutualFundPosition, "extends", BasePosition);


Aggregate.add("POSMF", MutualFundPosition);


/**
 * Gets the number of units in the financial insititution's street name.
 *
 * @return {Double} the number of units in the financial insititution's street name.
 */
MutualFundPosition.prototype.getUnitsStreet = function() {
  return this.unitsStreet;
};
Element.add(MutualFundPosition, {name: "UNITSSTREET", order: 20, attributeType: Double, readMethod: "getUnitsStreet", writeMethod: "setUnitsStreet"});


/**
 * Sets the number of units in the financial insititution's street name.
 *
 * @param {Double} unitsStreet the number of units in the financial insititution's street name.
 */
MutualFundPosition.prototype.setUnitsStreet = function(unitsStreet) {
  this.unitsStreet = unitsStreet;
};


/**
 * Gets the number of units in the user's name.
 *
 * @return {Double} the number of units in the user's name.
 */
MutualFundPosition.prototype.getUnitsUser = function() {
  return this.unitsUser;
};
Element.add(MutualFundPosition, {name: "UNITSUSER", order: 30, attributeType: Double, readMethod: "getUnitsUser", writeMethod: "setUnitsUser"});


/**
 * Sets the number of units in the user's name.
 *
 * @param {Double} unitsUser the number of units in the user's name.
 */
MutualFundPosition.prototype.setUnitsUser = function(unitsUser) {
  this.unitsUser = unitsUser;
};


/**
 * Gets whether dividends are automatically reinvested.
 *
 * @return {Boolean} whether dividends are automatically reinvested
 */
MutualFundPosition.prototype.getReinvestDividends = function() {
  return this.reinvestDividends;
};
Element.add(MutualFundPosition, {name: "REINVDIV", order: 50, attributeType: bool, readMethod: "getReinvestDividends", writeMethod: "setReinvestDividends"});


/**
 * Sets whether dividends are automatically reinvested.
 *
 * @param {Boolean} reinvestDividends whether dividends are automatically reinvested
 */
MutualFundPosition.prototype.setReinvestDividends = function(reinvestDividends) {
  this.reinvestDividends = reinvestDividends;
};


/**
 * Gets whether capital gains are automatically reinvested.
 *
 * @return {Boolean} whether capital gains are automatically reinvested
 */
MutualFundPosition.prototype.getReinvestCapitalGains = function() {
  return this.reinvestCapitalGains;
};
Element.add(MutualFundPosition, {name: "REINVCG", order: 60, attributeType: bool, readMethod: "getReinvestCapitalGains", writeMethod: "setReinvestCapitalGains"});


/**
 * Sets whether capital gains are automatically reinvested.
 *
 * @param {Boolean} reinvestCapitalGains whether capital gains are automatically reinvested
 */
MutualFundPosition.prototype.setReinvestCapitalGains = function(reinvestCapitalGains) {
  this.reinvestCapitalGains = reinvestCapitalGains;
};




module.exports = MutualFundPosition;
