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
 * Transaction for buying options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
function BuyOptionTransaction () {

  /**
   * @name BuyOptionTransaction#optionBuyType
   * @type String
   * @access private
   */
  this.optionBuyType = null;

  /**
   * @name BuyOptionTransaction#sharesPerContact
   * @type Integer
   * @access private
   */
  this.sharesPerContact = null;
}

inherit(BuyOptionTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYOPT", BuyOptionTransaction);


BuyOptionTransaction.prototype.BuyOptionTransaction = function() {
  super(TransactionType.BUY_OPTION);
};


/**
 * Gets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the option buy type
 */
BuyOptionTransaction.prototype.getOptionBuyType = function() {
  return optionBuyType;
};
Element.add({name: "OPTBUYTYPE", required: true, order: 20, owner: BuyOptionTransaction, /*type: String,*/ fcn: "getOptionBuyType"});


/**
 * Sets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} optionBuyType the option buy type
 */
BuyOptionTransaction.prototype.setOptionBuyType = function(optionBuyType) {
  this.optionBuyType = optionBuyType;
};


/**
 * Gets the option buy type as one of the well-known types.
 *
 * @return {OptionBuyType} the type of purchase or null if it's not known
 */
BuyOptionTransaction.prototype.getOptionBuyTypeEnum = function() {
  return OptionBuyType.fromOfx(optionBuyType);
};


/**
 * Gets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Integer} the number of shares per contact
 */
BuyOptionTransaction.prototype.getSharesPerContract = function() {
  return sharesPerContact;
};
Element.add({name: "SHPERCTRCT", required: true, order: 30, owner: BuyOptionTransaction, /*type: Integer,*/ fcn: "getSharesPerContract"});


/**
 * Sets the number of shares per contact. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Integer} sharesPerContact the number of shares per contact
 */
BuyOptionTransaction.prototype.setSharesPerContract = function(sharesPerContact) {
  this.sharesPerContact = sharesPerContact;
};




module.exports = BuyOptionTransaction;
