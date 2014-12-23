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

/**
 * Info about any other type of security.
 * @see "Section 13.8.5.5, OFX Spec"
 *
 * @author Jon Perlow
 */
function OtherSecurityInfo () {

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
  return typeDesc;
};
Element.add({name: "TYPEDESC", order: 20, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getTypeDesc"});


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
  return assetClass;
};
Element.add({name: "ASSETCLASS", order: 30, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getAssetClass"});


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
  return AssetClass.fromOfx(getAssetClass());
};


/**
 * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the FI-defined asset class of the debt
 */
OtherSecurityInfo.prototype.getFiAssetClass = function() {
  return fiAssetClass;
};
Element.add({name: "FIASSETCLASS", order: 40, owner: OtherSecurityInfo, /*type: String,*/ fcn: "getFiAssetClass"});


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
