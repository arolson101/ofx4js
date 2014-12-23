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

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * Info about a stock security.
 * @see "Section 13.8.5.6, OFX Spec"
 *
 * @author Jon Perlow
 */
function StockSecurityInfo () {

  /**
   * @name StockSecurityInfo#stockType
   * @type String
   * @access private
   */
  this.stockType = null;

  /**
   * @name StockSecurityInfo#yield
   * @type Double
   * @access private
   */
  this.yield = null;

  /**
   * @name StockSecurityInfo#dateYieldAsOf
   * @type Date
   * @access private
   */
  this.dateYieldAsOf = null;

  /**
   * @name StockSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name StockSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(StockSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("STOCKINFO", StockSecurityInfo);


/**
 * Gets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
 * optional field according to the OFX spec.
 *
 * @return {String} the type of stock
 */
StockSecurityInfo.prototype.getType = function() {
  return stockType;
};
Element.add({name: "STOCKTYPE", order: 20, owner: StockSecurityInfo, /*type: String,*/ fcn: "getType"});


/**
 * Sets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
 * optional field according to the OFX spec.
 *
 * @param {String} stockType the type of stock
 */
StockSecurityInfo.prototype.setType = function(stockType) {
  this.stockType = stockType;
};


/**
 * Gets the type of stock as one of the well-known types.
 *
 * @return {StockType} the type of stock or null if it's not one of the well-known types
 */
StockSecurityInfo.prototype.getTypeEnum = function() {
  return StockType.fromOfx(getType());
};


/**
 * Gets the current yield reported as the dividend expressed as a portion of the current stock
 * price, a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the dividend yield
 */
StockSecurityInfo.prototype.getYield = function() {
  return yield;
};
Element.add({name: "YIELD", order: 30, owner: StockSecurityInfo, /*type: Double,*/ fcn: "getYield"});


/**
 * Sets the current yield reported as the dividend expressed as a portion of the current stock
 * price, a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yield the dividend yield
 */
StockSecurityInfo.prototype.setYield = function(yield) {
  this.yield = yield;
};


/**
 * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @return {Date} the as-of date for the yield
 */
StockSecurityInfo.prototype.getDateYieldAsOf = function() {
  return dateYieldAsOf;
};
Element.add({name: "DTYIELDASOF", order: 40, owner: StockSecurityInfo, /*type: Date,*/ fcn: "getDateYieldAsOf"});


/**
 * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
 *
 * @param {Date} dateYieldAsOf the as-of date for the yield
 */
StockSecurityInfo.prototype.setDateYieldAsOf = function(dateYieldAsOf) {
  this.dateYieldAsOf = dateYieldAsOf;
};


/**
 * Gets the asset class of the stock. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the stock
 */
StockSecurityInfo.prototype.getAssetClass = function() {
  return assetClass;
};
Element.add({name: "ASSETCLASS", order: 50, owner: StockSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the stock. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the stock
 */
StockSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
StockSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(getAssetClass());
};


/**
 * Gets the FI-defined asset class of the stock. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the stock
 */
StockSecurityInfo.prototype.getFiAssetClass = function() {
  return fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 60, owner: StockSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the stock. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the stock
 */
StockSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = StockSecurityInfo;
