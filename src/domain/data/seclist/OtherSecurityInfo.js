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
var AssetClass = require("./AssetClass");

/**
 * Info about any other type of security.
 * @see "Section 13.8.5.5, OFX Spec"
 *
 * @class
 * @augments BaseSecurityInfo
 */
function OtherSecurityInfo () {
  BaseSecurityInfo.call(this);

  /**
   * @name OtherSecurityInfo#typeDesc
   * @type String
   * @access private
   */
  this.typeDesc = null;

  /**
   * @name OtherSecurityInfo#assetClass
   * @type String
   * @access private
   */
  this.assetClass = null;

  /**
   * @name OtherSecurityInfo#fiAssetClass
   * @type String
   * @access private
   */
  this.fiAssetClass = null;
}

inherit(OtherSecurityInfo, "extends", BaseSecurityInfo);


Aggregate.add("OTHERINFO", OtherSecurityInfo);


/**
 * Gets a description of the type of security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the description of the security
 */
OtherSecurityInfo.prototype.getTypeDesc = function() {
  return this.typeDesc;
};
Element.add(OtherSecurityInfo, {name: "TYPEDESC", order: 20, attributeType: String, readMethod: "getTypeDesc", writeMethod: "setTypeDesc"});


/**
 * Sets a description of the type of security. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} typeDesc the description of the security
 */
OtherSecurityInfo.prototype.setTypeDesc = function(typeDesc) {
  this.typeDesc = typeDesc;
};


/**
 * Gets the asset class of the option. This is an optional field according to the OFX spec.
 *
 * @return {String} the asset class of the debt
 */
OtherSecurityInfo.prototype.getAssetClass = function() {
  return this.assetClass;
};
Element.add(OtherSecurityInfo, {name: "ASSETCLASS", order: 30, attributeType: String, readMethod: "getAssetClass", writeMethod: "setAssetClass"});


/**
 * Sets the asset class of the debt. This is an optional field according to the OFX spec.
 *
 * @param {String} assetClass the asset class of the debt
 */
OtherSecurityInfo.prototype.setAssetClass = function(assetClass) {
  this.assetClass = assetClass;
};


/**
 * Gets the assert class as one of the well-known types.
 *
 * @return {AssetClass} the asset class or null if it's not one of the well-known types
 */
OtherSecurityInfo.prototype.getAssetClassEnum = function() {
  return AssetClass.fromOfx(this.getAssetClass());
};


/**
 * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the debt
 */
OtherSecurityInfo.prototype.getFiAssetClass = function() {
  return this.fiAssetClass;
};
Element.add(OtherSecurityInfo, {name: "FIASSETCLASS", order: 40, attributeType: String, readMethod: "getFiAssetClass", writeMethod: "setFiAssetClass"});


/**
 * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @param {String} fiAssetClass the FI-defined asset class of the debt
 */
OtherSecurityInfo.prototype.setFiAssetClass = function(fiAssetClass) {
  this.fiAssetClass = fiAssetClass;
};




module.exports = OtherSecurityInfo;
