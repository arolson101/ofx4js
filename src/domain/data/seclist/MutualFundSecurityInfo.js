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

var inherit = require("../../../util/inherit");

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var BaseSecurityInfo = require("./BaseSecurityInfo");
var MutualFundType = require("./MutualFundType");

/**
 * Info about a mutual fund security.
 * @see "Section 13.8.5.3, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function MutualFundSecurityInfo () {

  /**
   * @name MutualFundSecurityInfo#mfType
   * @type String
   * @access private
   */
  this.mfType = null;

  /**
   * @name MutualFundSecurityInfo#yield
   * @type Double
   * @access private
   */
  this.yield = null;

  /**
   * @name MutualFundSecurityInfo#dateYieldAsOf
   * @type Date
   * @access private
   */
  this.dateYieldAsOf = null;
}

inherit(MutualFundSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("MFINFO", MutualFundSecurityInfo);


/**
 * Gets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
 * according to the OFX spec.
 *
 * @return {String} the mutual fund type
 */
MutualFundSecurityInfo.prototype.getType = function() {
  return this.mfType;
};
Element.add(MutualFundSecurityInfo, {name: "MFTYPE", order: 20, attributeType: String, readMethod: "getType", writeMethod: "setType"});


/**
 * Sets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
 * according to the OFX spec.
 *
 * @param {String} mfType the mutual fund type
 */
MutualFundSecurityInfo.prototype.setType = function(mfType) {
  this.mfType = mfType;
};


/**
 * Gets the mutual fund type as one of the well-known types.
 *
 * @return {MutualFundType} the mutual fund type or null if it's not one of the well-known types
 */
MutualFundSecurityInfo.prototype.getTypeEnum = function() {
  return MutualFundType.fromOfx(this.getType());
};


/**
 * Gets the yield as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield as a rate
 */
MutualFundSecurityInfo.prototype.getYield = function() {
  return this.yield;
};
Element.add(MutualFundSecurityInfo, {name: "YIELD", order: 30, attributeType: Number, readMethod: "getYield", writeMethod: "setYield"});


/**
 * Sets the yield as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yield the yield as a rate
 */
MutualFundSecurityInfo.prototype.setYield = function(yield_) {
  this.yield = yield_;
};


/**
 * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @return {Date} the as-of date for the yield
 */
MutualFundSecurityInfo.prototype.getDateYieldAsOf = function() {
  return this.dateYieldAsOf;
};
Element.add(MutualFundSecurityInfo, {name: "DTYIELDASOF", order: 40, attributeType: Date, readMethod: "getDateYieldAsOf", writeMethod: "setDateYieldAsOf"});


/**
 * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @param {Date} dateYieldAsOf the as-of date for the yield
 */
MutualFundSecurityInfo.prototype.setDateYieldAsOf = function(dateYieldAsOf) {
  this.dateYieldAsOf = dateYieldAsOf;
};




module.exports = MutualFundSecurityInfo;
