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

var ShortOptionSecurity = require("../positions/ShortOptionSecurity");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var OptionSellType = require("./OptionSellType");
var RelatedOptionType = require("./RelatedOptionType");

/**
 * Transaction for selling options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellOptionTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_OPTION);

  /**
   * @name SellOptionTransaction#optionSellType
   * @type String
   * @access private
   */
  this.optionSellType = null;

  /**
   * @name SellOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;

  /**
   * @name SellOptionTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;

  /**
   * @name SellOptionTransaction#relatedType
   * @type String
   * @access private
   */
  this.relatedType = null;

  /**
   * @name SellOptionTransaction#secured
   * @type String
   * @access private
   */
  this.secured = null;
}

inherit(SellOptionTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLOPT", SellOptionTransaction);


/**
 * Gets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option sell type
 */
SellOptionTransaction.prototype.getOptionSellType = function() {
  return this.optionSellType;
};
Element.add({name: "OPTSELLTYPE", required: true, order: 20, owner: SellOptionTransaction, /*type: String,*/ fcn: "getOptionSellType"});


/**
 * Sets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionSellType the option sell type
 */
SellOptionTransaction.prototype.setOptionSellType = function(optionSellType) {
  this.optionSellType = optionSellType;
};


/**
 * Gets the option sell type as one of the well-known types.
 *
 * @return {OptionSellType} the type of sale or null if it's not known.
 */
SellOptionTransaction.prototype.getOptionSellTypeEnum = function() {
  return OptionSellType.fromOfx(this.optionSellType);
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
SellOptionTransaction.prototype.getSharesPerContact = function() {
  return this.sharesPerContact;
};
Element.add({name: "SHPERCTRCT", required: true, order: 30, owner: SellOptionTransaction, /*type: Integer,*/ fcn: "getSharesPerContact"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
SellOptionTransaction.prototype.setSharesPerContact = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};


/**
 * Gets a related transaction for the option sale for complex option transactions. This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The related transaction id
 */
SellOptionTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 40, owner: SellOptionTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets a related transaction for the option sale for complex option transactions. This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId The related transaction id
 */
SellOptionTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};


/**
 * Gets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The related tansaction type
 */
SellOptionTransaction.prototype.getRelatedType = function() {
  return this.relatedType;
};
Element.add({name: "RELTYPE", order: 50, owner: SellOptionTransaction, /*type: String,*/ fcn: "getRelatedType"});


/**
 * Sets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
 * is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedType The related tansaction type
 */
SellOptionTransaction.prototype.setRelatedType = function(relatedType) {
  this.relatedType = relatedType;
};


/**
 * Gets the related transaction as one of the well-known types.
 *
 * @return {RelatedOptionType} the related tansaction type or null if it's not well known
 */
SellOptionTransaction.prototype.getRelatedTypeEnum = function() {
  return RelatedOptionType.fromOfx(this.getRelatedType());
};


/**
 * Gets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} how the option sale is secured
 */
SellOptionTransaction.prototype.getSecured = function() {
  return this.secured;
};
Element.add({name: "SECURED", order: 60, owner: SellOptionTransaction, /*type: String,*/ fcn: "getSecured"});


/**
 * Sets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} secured how the option sale is secured
 */
SellOptionTransaction.prototype.setSecured = function(secured) {
  this.secured = secured;
};


/**
 * Gets how the option sale is secured as one of the well-known types.
 *
 * @return {ShortOptionSecurity} the type indicating how the option is secured or null if it's not well known.
 */
SellOptionTransaction.prototype.getSecuredEnum = function() {
  return  ShortOptionSecurity.fromOfx(this.getSecured());
};




module.exports = SellOptionTransaction;
