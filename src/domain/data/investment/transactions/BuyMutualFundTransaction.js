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
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var TransactionType = require("./TransactionType");
var BuyType = require("./BuyType");

/**
 * Transaction for buying mutual funds.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyMutualFundTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_MUTUAL_FUND);

  /**
   * @name BuyMutualFundTransaction#buyType
   * @type String
   * @access private
   */
  this.buyType = null;

  /**
   * @name BuyMutualFundTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;
}

inherit(BuyMutualFundTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYMF", BuyMutualFundTransaction);



/**
 * Gets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the buy type
 */
BuyMutualFundTransaction.prototype.getBuyType = function() {
  return this.buyType;
};
Element.add({name: "BUYTYPE", required: true, order: 20, owner: BuyMutualFundTransaction, /*type: String,*/ fcn: "getBuyType"});


/**
 * Sets the type of purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field according to
 * the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} buyType the buy type
 */
BuyMutualFundTransaction.prototype.setBuyType = function(buyType) {
  this.buyType = buyType;
};


/**
 * Gets the buy type as one of the well-known types.
 *
 * @return {BuyType} the type of purchase or null if it's not known
 */
BuyMutualFundTransaction.prototype.getBuyTypeEnum = function() {
  return BuyType.fromOfx(this.buyType);
};


/**
 * Gets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
BuyMutualFundTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 30, owner: BuyMutualFundTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets any related transaction id for a mutual fund purchase (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
BuyMutualFundTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};




module.exports = BuyMutualFundTransaction;
