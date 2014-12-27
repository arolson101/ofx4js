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

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");
var CloseOptionAction = require("./CloseOptionAction");
var SecurityId = require("../../seclist/SecurityId");


/**
 * Transaction for closing an option position due to expiration, exercise, or assignment.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function CloseOptionTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.CLOSE_OPTION);
  
  /**
   * @name CloseOptionTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name CloseOptionTransaction#optionAction
   * @type String
   * @access private
   */
  this.optionAction = null;

  /**
   * @name CloseOptionTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name CloseOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name CloseOptionTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name CloseOptionTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;

  /**
   * @name CloseOptionTransaction#gain
   * @type Double
   * @access private
   */
  this.gain = null;
}

inherit(CloseOptionTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(CloseOptionTransaction, "implements", TransactionWithSecurity);


Aggregate.add("CLOSUREOPT", CloseOptionTransaction);




/**
 * Gets the security id of the option.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {SecurityId} the security id of the option
 */
CloseOptionTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add(CloseOptionTransaction, {order: 20, attributeType: SecurityId, readMethod: "getSecurityId", writeMethod: "setSecurityId"});


/**
 * Sets the security id of the option.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the option
 */
CloseOptionTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option action
 */
CloseOptionTransaction.prototype.getOptionAction = function() {
  return this.optionAction;
};
Element.add(CloseOptionTransaction, {name: "OPTACTION", required: true, order: 30, attributeType: String, readMethod: "getOptionAction", writeMethod: "setOptionAction"});


/**
 * Sets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionAction the option action
 */
CloseOptionTransaction.prototype.setOptionAction = function(optionAction) {
  this.optionAction = optionAction;
};


/**
 * Gets the action as one of the well-known types.
 *
 * @return {CloseOptionAction} the type of close or null if it's not a well-known type
 */
CloseOptionTransaction.prototype.getOptionActionEnum = function() {
  return CloseOptionAction.fromOfx(this.getOptionAction());
};


/**
 * Gets the number of units of the option that were closed. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the number of units closed
 */
CloseOptionTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add(CloseOptionTransaction, {name: "UNITS", required: true, order: 40, attributeType: Number, readMethod: "getUnits", writeMethod: "setUnits"});


/**
 * Sets the number of units of the option that were closed. This is a required field according
 * to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} units the number of units closed
 */
CloseOptionTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
CloseOptionTransaction.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add(CloseOptionTransaction, {name: "SHPERCTRCT", required: true, order: 50, attributeType: Number, readMethod: "getSharesPerContact", writeMethod: "setSharesPerContact"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
CloseOptionTransaction.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
CloseOptionTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add(CloseOptionTransaction, {name: "SUBACCTSEC", required: true, order: 60, attributeType: String, readMethod: "getSubAccountSecurity", writeMethod: "setSubAccountSecurity"});


/**
 * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountSecurity the sub account type
 */
CloseOptionTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
  this.subAccountSecurity = subAccountSecurity;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
CloseOptionTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the related transaction id for the related buy or sell corresponding to the
 * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
 * action or EXERCISE or ASSIGN.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
CloseOptionTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add(CloseOptionTransaction, {name: "RELFITID", order: 70, attributeType: String, readMethod: "getRelatedTransactionId", writeMethod: "setRelatedTransactionId"});


/**
 * Sets the related transaction id for the related buy or sell corresponding to the
 * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
 * action or EXERCISE or ASSIGN.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
CloseOptionTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};


/**
 * Gets the gain related to the transaction. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the gain related to the transaction
 */
CloseOptionTransaction.prototype.getGain = function() {
  return this.gain;
};
Element.add(CloseOptionTransaction, {name: "GAIN", order: 80, attributeType: Number, readMethod: "getGain", writeMethod: "setGain"});


/**
 * Sets the gain related to the transaction. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} gain the gain related to the transaction
 */
CloseOptionTransaction.prototype.setGain = function(gain) {
  this.gain = gain;
};




module.exports = CloseOptionTransaction;
