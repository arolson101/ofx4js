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
var OptionType = require("./OptionType");
var AssetClass = require("./AssetClass");

/**
 * Info about an option security.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function OptionSecurityInfo () {

  /**
   * @name OptionSecurityInfo#optionType
   * @type String
   * @access private
   */
  this.optionType = null;

  /**
   * @name OptionSecurityInfo#strikePrice
   * @type Double
   * @access private
   */
  this.strikePrice = null;

  /**
   * @name OptionSecurityInfo#expirationDate
   * @type Date
   * @access private
   */
  this.expirationDate = null;

  /**
   * @name OptionSecurityInfo#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name OptionSecurityInfo#underlyingSecurity
   * @type SecurityId
   * @access private
   */
  this.underlyingSecurity = null;

  /**
   * @name OptionSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name OptionSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(OptionSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("OPTINFO", OptionSecurityInfo);


/**
 * Gets the type of option. One of "PUT" or "CALL". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the option type
 */
OptionSecurityInfo.prototype.getOptionType = function() {
  return this.optionType;
};
Element.add({name: "OPTTYPE", order: 20, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getOptionType"});


/**
 * Sets the type of option. One of "PUT" or "CALL". This is a required field according to the
 * OFX spec.
 *
 * @param {String} optionType the option type
 */
OptionSecurityInfo.prototype.setOptionType = function(optionType) {
  this.optionType = optionType;
};


/**
 * Gets the option type as a well-known enum value.
 *
 * @return {OptionType} the option type or null if it's not one of the well-known types
 */
OptionSecurityInfo.prototype.getOptionTypeEnum = function() {
  return OptionType.fromOfx(this.getOptionType());
};


/**
 * Gets the strike price of the option. This is a required field according to the OFX spec.
 *
 * @return {Double} the option strike price
 */
OptionSecurityInfo.prototype.getStrikePrice = function() {
  return this.strikePrice;
};
Element.add({name: "STRIKEPRICE", order: 30, owner: OptionSecurityInfo, /*type: Double,*/ fcn: "getStrikePrice"});


/**
 * Sets the strike price of the option. This is a required field according to the OFX spec.
 *
 * @param {Double} strikePrice the option strike price
 */
OptionSecurityInfo.prototype.setStrikePrice = function(strikePrice) {
  this.strikePrice = strikePrice;
};


/**
 * Gets the expiration date of the option. This is a required field according to the OFX spec.
 *
 * @return {Date} the expiration date of the option
 */
OptionSecurityInfo.prototype.getExpirationDate = function() {
  return this.expirationDate;
};
Element.add({name: "DTEXPIRE", order: 40, owner: OptionSecurityInfo, /*type: Date,*/ fcn: "getExpirationDate"});


/**
 * Sets the expiration date of the option. This is a required field according to the OFX spec.
 *
 * @param {Date} expirationDate the expiration date of the option
 */
OptionSecurityInfo.prototype.setExpirationDate = function(expirationDate) {
  this.expirationDate = expirationDate;
};


/**
 * Gets the number of shares per option contact. This is a required field according to the OFX
 * spec.
 *
 * @return {Integer} the number of shares per option contact
 */
OptionSecurityInfo.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", order: 50, owner: OptionSecurityInfo, /*type: Integer,*/ fcn: "getSharesPerContact"});


/**
 * Sets the number of shares per option contact. This is a required field according to the OFX
 * spec.
 *
 * @param {Integer} sharesPerContact the number of shares per option contact
 */
OptionSecurityInfo.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets the security id of the underling security. This is an optional field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id of the underlying security
 */
OptionSecurityInfo.prototype.getUnderlyingSecurity = function() {
  return this.underlyingSecurity;
};
Element.add({name: "SECID", order: 60, owner: OptionSecurityInfo, /*type: SecurityId,*/ fcn: "getUnderlyingSecurity"});


/**
 * Sets the security id of the underling security. This is an optional field according to the OFX
 * spec.
 *
 * @param {SecurityId} underlyingSecurity the security id of the underlying security
 */
OptionSecurityInfo.prototype.setUnderlyingSecurity = function(underlyingSecurity) {
  this.underlyingSecurity = underlyingSecurity;
};


/**
 * Gets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the option
 */
OptionSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add({name: "ASSETCLASS", order: 70, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


/**
 * Sets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the option
 */
OptionSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
OptionSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the option. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the option
 */
OptionSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 80, owner: OptionSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


/**
 * Sets the FI-defined asset class of the option. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the option
 */
OptionSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = OptionSecurityInfo;
