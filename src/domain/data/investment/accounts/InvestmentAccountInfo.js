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

var AccountInfo = require("../../common/AccountInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var UnitedStatesAccountType = require("./UnitedStatesAccountType");
var ActivationStatus = require("./ActivationStatus");
var AccountType = require("./AccountType");

/**
 * Aggregate for the info about a brokerage account.
 *
 * @class
 * @augments AccountInfo
 * @see "OFX Spec, Section 13.6.2"
 */
function InvestmentAccountInfo () {

  /**
   * @name InvestmentAccountInfo#investmentAccount
   * @type InvestmentAccountDetails
   * @access private
   */
  this.investmentAccount = null;

  /**
   * @name InvestmentAccountInfo#unitedStatesAccountType
   * @type String
   * @access private
   */
  this.unitedStatesAccountType = null;

  /**
   * @name InvestmentAccountInfo#supportsChecking
   * @type Boolean
   * @access private
   */
  this.supportsChecking = null;

  /**
   * @name InvestmentAccountInfo#activationStatus
   * @type String
   * @access private
   */
  this.activationStatus = null;

  /**
   * @name InvestmentAccountInfo#investmentAccountType
   * @type String
   * @access private
   */
  this.investmentAccountType = null;

  /**
   * @name InvestmentAccountInfo#optionLevel
   * @type String
   * @access private
   */
  this.optionLevel = null;
}

inherit(InvestmentAccountInfo, "implements", AccountInfo);


Aggregate.add("INVACCTINFO", InvestmentAccountInfo);


/**
 * Gets the investment account this information is referencing.
 *
 * @return {InvestmentAccountDetails} the investment account this information is referencing
 */
InvestmentAccountInfo.prototype.getInvestmentAccount = function() {
  return this.investmentAccount;
};
ChildAggregate.add(InvestmentAccountInfo, {name: "INVACCTFROM", required: true, order: 0, attributeType: InvestmentAccountDetails, readMethod: "getInvestmentAccount", writeMethod: "setInvestmentAccount"});


/**
 * Sets the investment account this information is referencing. This is a required field
 * according to the OFX spec.
 *
 * @param {InvestmentAccountDetails} investmentAccount the investment account this information is referencing
 */
InvestmentAccountInfo.prototype.setInvestmentAccount = function(investmentAccount) {
  this.investmentAccount = investmentAccount;
};


// Inherited.
InvestmentAccountInfo.prototype.getAccountDetails = function() {
  return this.getInvestmentAccount();
};


/**
 * Gets the United States account type. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @return {String} the United States account type
 */
InvestmentAccountInfo.prototype.getUnitedStatesAccountType = function() {
  return this.unitedStatesAccountType;
};
Element.add(InvestmentAccountInfo, {name: "USPRODUCTTYPE", required: true, order: 10, attributeType: String, readMethod: "getUnitedStatesAccountType", writeMethod: "setUnitedStatesAccountType"});


/**
 * Sets United States account type. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @param {String} unitedStatesAccountType the United States account type
 */
InvestmentAccountInfo.prototype.setUnitedStatesAccountType = function(unitedStatesAccountType) {
  this.unitedStatesAccountType = unitedStatesAccountType;
};


/**
 * Gets the United States account type as one of the well-known types.
 *
 * @return {UnitedStatesAccountType} the account type or null if it's not one of the well-known types
 */
InvestmentAccountInfo.prototype.getUnitedStatesAccountTypeEnum = function() {
  return UnitedStatesAccountType.fromOfx(this.unitedStatesAccountType);
};


/**
 * Gets whether the account supports checking. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @return {Boolean} whether the account supports checking
 */
InvestmentAccountInfo.prototype.getSupportsChecking = function() {
  return this.supportsChecking;
};
Element.add(InvestmentAccountInfo, {name: "CHECKING", required: true, order: 20, attributeType: bool, readMethod: "getSupportsChecking", writeMethod: "setSupportsChecking"});


/**
 * Sets whether the account supports checking. This is a required field according to the OFX spec.
 * @see "OFX Spec, Section 13.6.1"
 *
 * @param {Boolean} supportsChecking whether the account supports checking
 */
InvestmentAccountInfo.prototype.setSupportsChecking = function(supportsChecking) {
  this.supportsChecking = supportsChecking;
};


/**
 * Gets the activation status for investment statement download. This is a required field
 * according to the OFX spec.
 *
 * @return {String} the activation status
 */
InvestmentAccountInfo.prototype.getActivationStatus = function() {
  return this.activationStatus;
};
Element.add(InvestmentAccountInfo, {name: "SVCSTATUS", required: true, order: 30, attributeType: String, readMethod: "getActivationStatus", writeMethod: "setActivationStatus"});


/**
 * Sets the activation status for investment statement download. This is a required field
 * according to the OFX spec.
 *
 * @param {String} activationStatus the activation status
 */
InvestmentAccountInfo.prototype.setActivationStatus = function(activationStatus) {
  this.activationStatus = activationStatus;
};


/**
 * Gets the activation status as one of the well-known types.
 *
 * @return {ActivationStatus} the activation status or null if it wasn't one of the well known types
 */
InvestmentAccountInfo.prototype.getActivationStatusEnum = function() {
  return ActivationStatus.fromOfx(this.getActivationStatus());
};


/**
 * Gets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the type of account
 */
InvestmentAccountInfo.prototype.getInvestmentAccountType = function() {
  return this.investmentAccountType;
};
Element.add(InvestmentAccountInfo, {name: "INVACCTTYPE", order: 40, attributeType: String, readMethod: "getInvestmentAccountType", writeMethod: "setInvestmentAccountType"});


/**
 * Sets the type of investment account. One of "INDIVIDUAL", "JOINT", "TRUST", or "CORPORATE".
 * This is an optional field according to the OFX spec.
 *
 * @param {String} investmentAccountType the type of account
 */
InvestmentAccountInfo.prototype.setInvestmentAccountType = function(investmentAccountType) {
  this.investmentAccountType = investmentAccountType;
};


/**
 * Gets the type of investment account as one of the well-known types.
 *
 * @return {AccountType} the type of investment account or null if it's not one of the well-known types
 */
InvestmentAccountInfo.prototype.getInvestmentAccountTypeEnum = function() {
  return AccountType.fromOfx(this.getInvestmentAccountType());
};


/**
 * Gets the description of option trading privileges. * This is an optional field according to
 * the OFX spec.
 *
 * @return {String} the description of option trading privileges.
 */
InvestmentAccountInfo.prototype.getOptionLevel = function() {
  return this.optionLevel;
};
Element.add(InvestmentAccountInfo, {name: "OPTIONLEVEL", order: 50, attributeType: String, readMethod: "getOptionLevel", writeMethod: "setOptionLevel"});


/**
 * Sets the description of option trading privileges. * This is an optional field according to
 * the OFX spec.
 *
 * @param {String} optionLevel the description of option trading privileges.
 */
InvestmentAccountInfo.prototype.setOptionLevel = function(optionLevel) {
  this.optionLevel = optionLevel;
};




module.exports = InvestmentAccountInfo;
