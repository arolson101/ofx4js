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
var DebtType = require("./DebtType");
var DebtClass = require("./DebtClass");
var CouponFrequency = require("./CouponFrequency");
var CallType = require("./CallType");
var AssetClass = require("./AssetClass");

/**
 * Info about a debt security.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function DebtSecurityInfo () {
  BaseSecurityInfo.call(this);

  /**
   * @name DebtSecurityInfo#parValue
   * @type Double
   * @access private
   */
  this.parValue = null;

  /**
   * @name DebtSecurityInfo#debtType
   * @type String
   * @access private
   */
  this.debtType = null;

  /**
   * @name DebtSecurityInfo#debtClass
   * @type String
   * @access private
   */
  this.debtClass = null;

  /**
   * @name DebtSecurityInfo#couponRate
   * @type Double
   * @access private
   */
  this.couponRate = null;

  /**
   * @name DebtSecurityInfo#nextMaturityDate
   * @type Date
   * @access private
   */
  this.nextMaturityDate = null;

  /**
   * @name DebtSecurityInfo#couponFrequency
   * @type String
   * @access private
   */
  this.couponFrequency = null;

  /**
   * @name DebtSecurityInfo#callPrice
   * @type Double
   * @access private
   */
  this.callPrice = null;

  /**
   * @name DebtSecurityInfo#yieldToCall
   * @type Double
   * @access private
   */
  this.yieldToCall = null;

  /**
   * @name DebtSecurityInfo#nextCallDate
   * @type Date
   * @access private
   */
  this.nextCallDate = null;

  /**
   * @name DebtSecurityInfo#callType
   * @type String
   * @access private
   */
  this.callType = null;

  /**
   * @name DebtSecurityInfo#yieldToMaturity
   * @type Double
   * @access private
   */
  this.yieldToMaturity = null;

  /**
   * @name DebtSecurityInfo#debtMaturityDate
   * @type Date
   * @access private
   */
  this.debtMaturityDate = null;

  /**
   * @name DebtSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name DebtSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(DebtSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("DEBTINFO", DebtSecurityInfo);


/**
 * Gets the par value of the debt. This is a required field according to the OFX spec.
 *
 * @return {Double} the par value of the debt
 */
DebtSecurityInfo.prototype.getParValue = function() {
  return this.parValue;
};
Element.add(DebtSecurityInfo, {name: "PARVALUE", required:true, order: 20, attributeType: Number, readMethod: "getParValue", writeMethod: "setParValue"});


/**
 * Sets the par value of the debt. This is a required field according to the OFX spec.
 *
 * @param {Double} parValue the par value of the debt
 */
DebtSecurityInfo.prototype.setParValue = function(parValue) {
  this.parValue = parValue;
};


/**
 * Gets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the type of debt
 */
DebtSecurityInfo.prototype.getDebtType = function() {
  return this.debtType;
};
Element.add(DebtSecurityInfo, {name: "DEBTTYPE", required:true, order: 30, attributeType: String, readMethod: "getDebtType", writeMethod: "setDebtType"});


/**
 * Sets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
 * OFX spec.
 *
 * @param {String} debtType the type of debt
 */
DebtSecurityInfo.prototype.setDebtType = function(debtType) {
  this.debtType = debtType;
};


/**
 * Gets the type of debt as one of the well-known types.
 *
 * @return {DebtType} the type of debt or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getDebtTypeEnum = function() {
  return DebtType.fromOfx(this.getDebtType());
};


/**
 * Gets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the class of debt
 */
DebtSecurityInfo.prototype.getDebtClass = function() {
  return this.debtClass;
};
Element.add(DebtSecurityInfo, {name: "DEBTCLASS", order: 40, attributeType: String, readMethod: "getDebtClass", writeMethod: "setDebtClass"});


/**
 * Sets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} debtClass the class of debt
 */
DebtSecurityInfo.prototype.setDebtClass = function(debtClass) {
  this.debtClass = debtClass;
};


/**
 * Gets the class of debt as one of the well-known types.
 *
 * @return {DebtClass} the class of debt or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getDebtClassEnum = function() {
  return DebtClass.fromOfx(this.debtClass);
};


/**
 * Gets the coupon rate of the debt for the next closest call date.
 * This is an optional field according to the OFX spec.
 *
 * @return {Double} the coupon rate
 */
DebtSecurityInfo.prototype.getCouponRate = function() {
  return this.couponRate;
};
Element.add(DebtSecurityInfo, {name: "COUPONRT", order: 50, attributeType: Number, readMethod: "getCouponRate", writeMethod: "setCouponRate"});


/**
 * Sets the coupon rate of the debt for the next closest call date.
 * This is an optional field according to the OFX spec.
 *
 * @param {Double} couponRate the coupon rate
 */
DebtSecurityInfo.prototype.setCouponRate = function(couponRate) {
  this.couponRate = couponRate;
};


/**
 * Gets the next maturity date for the next coupon.
 * This is an optional field according to the OFX spec.
 *
 * @return {Date} the maturity date for the next coupon
 */
DebtSecurityInfo.prototype.getNextMaturityDate = function() {
  return this.nextMaturityDate;
};
Element.add(DebtSecurityInfo, {name: "DTCOUPON", order: 60, attributeType: Date, readMethod: "getNextMaturityDate", writeMethod: "setNextMaturityDate"});


/**
 * Sets the next maturity date for the next coupon.
 * This is an optional field according to the OFX spec.
 *
 * @param {Date} nextMaturityDate the maturity date for the next coupon.
 */
DebtSecurityInfo.prototype.setNextMaturityDate = function(nextMaturityDate) {
  this.nextMaturityDate = nextMaturityDate;
};


/**
 * Gets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the coupon frequency
 */
DebtSecurityInfo.prototype.getCouponFrequency = function() {
  return this.couponFrequency;
};
Element.add(DebtSecurityInfo, {name: "COUPONFREQ", order: 70, attributeType: String, readMethod: "getCouponFrequency", writeMethod: "setCouponFrequency"});


/**
 * Sets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} couponFrequency the coupon frequency
 */
DebtSecurityInfo.prototype.setCouponFrequency = function(couponFrequency) {
  this.couponFrequency = couponFrequency;
};


/**
 * Gets the coupon frequency as one of the well-known types.
 *
 * @return {CouponFrequency} the coupon frequency or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getCouponFrequencyEnum = function() {
  return CouponFrequency.fromOfx(this.getCouponFrequency());
};


/**
 * Gets the bond price. This is an optional field according to the OFX spec.
 *
 * @return {Double} the bond price
 */
DebtSecurityInfo.prototype.getCallPrice = function() {
  return this.callPrice;
};
Element.add(DebtSecurityInfo, {name: "CALLPRICE", order: 80, attributeType: Number, readMethod: "getCallPrice", writeMethod: "setCallPrice"});


/**
 * Sets the bond price. This is an optional field according to the OFX spec.
 *
 * @param {Double} callPrice the bond price
 */
DebtSecurityInfo.prototype.setCallPrice = function(callPrice) {
  this.callPrice = callPrice;
};


/**
 * Gets the yield to call as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield to call rate
 */
DebtSecurityInfo.prototype.getYieldToCall = function() {
  return this.yieldToCall;
};
Element.add(DebtSecurityInfo, {name: "YIELDTOCALL", order: 90, attributeType: Number, readMethod: "getYieldToCall", writeMethod: "setYieldToCall"});


/**
 * Sets the yield to call as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yieldToCall the yield to call rate
 */
DebtSecurityInfo.prototype.setYieldToCall = function(yieldToCall) {
  this.yieldToCall = yieldToCall;
};


/**
 * Gets the next call date. This is an optional field according to the OFX spec.
 *
 * @return {Date} the next call date.
 */
DebtSecurityInfo.prototype.getNextCallDate = function() {
  return this.nextCallDate;
};
Element.add(DebtSecurityInfo, {name: "DTCALL", order: 100, attributeType: Date, readMethod: "getNextCallDate", writeMethod: "setNextCallDate"});


/**
 * Sets the next call date. This is an optional field according to the OFX spec.
 *
 * @param {Date} nextCallDate the next call date.
 */
DebtSecurityInfo.prototype.setNextCallDate = function(nextCallDate) {
  this.nextCallDate = nextCallDate;
};


/**
 * Gets the type of call.
 *
 * @return {String} the type of call
 */
DebtSecurityInfo.prototype.getCallType = function() {
  return this.callType;
};
Element.add(DebtSecurityInfo, {name: "CALLTYPE", order: 110, attributeType: String, readMethod: "getCallType", writeMethod: "setCallType"});


/**
 * Sets the type of call.
 *
 * @param {String} callType the type of call
 */
DebtSecurityInfo.prototype.setCallType = function(callType) {
  this.callType = callType;
};


/**
 * Gets the type of call as one of the well-known types.
 *
 * @return {CallType} the type of call or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getCallTypeEnum = function() {
  return CallType.fromOfx(this.getCallType());
};


/**
 * Gets the yield to maturity as a rate. This is an optional field according to the OFX spec.
 *
 * @return {Double} the yield to call rate
 */
DebtSecurityInfo.prototype.getYieldToMaturity = function() {
  return this.yieldToMaturity;
};
Element.add(DebtSecurityInfo, {name: "YIELDTOMAT", order: 120, attributeType: Number, readMethod: "getYieldToMaturity", writeMethod: "setYieldToMaturity"});


/**
 * Sets the yield to maturity as a rate. This is an optional field according to the OFX spec.
 *
 * @param {Double} yieldToMaturity the yield to call rate
 */
DebtSecurityInfo.prototype.setYieldToMaturity = function(yieldToMaturity) {
  this.yieldToMaturity = yieldToMaturity;
};


/**
 * Gets the date when the debt matures. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date when the debt matures
 */
DebtSecurityInfo.prototype.getDebtMaturityDate = function() {
  return this.debtMaturityDate;
};
Element.add(DebtSecurityInfo, {name: "DTMAT", order: 130, attributeType: Date, readMethod: "getDebtMaturityDate", writeMethod: "setDebtMaturityDate"});


/**
 * Sets the date when the debt matures. This is an optional field according to the OFX spec.
 *
 * @param {Date} debtMaturityDate the date when the debt matures
 */
DebtSecurityInfo.prototype.setDebtMaturityDate = function(debtMaturityDate) {
  this.debtMaturityDate = debtMaturityDate;
};


/**
 * Gets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the debt
 */
DebtSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add(DebtSecurityInfo, {name: "ASSETCLASS", order: 140, attributeType: String, readMethod: "getAssetClass", writeMethod: "setAssetClass"});


/**
 * Sets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the debt
 */
DebtSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
DebtSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the debt
 */
DebtSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add(DebtSecurityInfo, {name: "FIASSETCLASS", order: 150, attributeType: String, readMethod: "getFiAssetClass", writeMethod: "setFiAssetClass"});


/**
 * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the debt
 */
DebtSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = DebtSecurityInfo;
