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
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var SellType = require("./SellType");

/**
 * Transaction for selling mutual fund.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellMutualFundTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_MUTUAL_FUND);

  /**
   * @name SellMutualFundTransaction#sellType
   * @type String
   * @access private
   */
  this.sellType = null;

  /**
   * @name SellMutualFundTransaction#averageCostBasis
   * @type Double
   * @access private
   */
  this.averageCostBasis = null;

  /**
   * @name SellMutualFundTransaction#relatedTransactionId
   * @type String
   * @access private
   */
  this.relatedTransactionId = null;
}

inherit(SellMutualFundTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLMF", SellMutualFundTransaction);


/**
 * Gets the type of sale. One of "SELL" or "SELLSHORT".
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The type of sale
 */
SellMutualFundTransaction.prototype.getSellType = function() {
  return this.sellType;
};
Element.add({name: "SELLTYPE", order: 20, owner: SellMutualFundTransaction, /*type: String,*/ fcn: "getSellType"});


/**
 * Sets the type of sale. One of "SELL" or "SELLSHORT".
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellType The type of sale
 */
SellMutualFundTransaction.prototype.setSellType = function(sellType) {
  this.sellType = sellType;
};


/**
 * Gets the sell type as one of the well-known types.
 *
 * @return {SellType} the type of sale or null if it's not known.
 */
SellMutualFundTransaction.prototype.getSellTypeEnum = function() {
  return SellType.fromOfx(this.sellType);
};


/**
 * Gets the average cost basis of the sale.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} The average cost basis of the sale
 */
SellMutualFundTransaction.prototype.getAverageCostBasis = function() {
  return this.averageCostBasis;
};
Element.add({name: "AVGCOSTBASIS", order: 30, owner: SellMutualFundTransaction, /*type: Double,*/ fcn: "getAverageCostBasis"});


/**
 * Sets the average cost basis of the sale.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} averageCostBasis The average cost basis of the sale
 */
SellMutualFundTransaction.prototype.setAverageCostBasis = function(averageCostBasis) {
  this.averageCostBasis = averageCostBasis;
};


/**
 * Gets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the related transaction id
 */
SellMutualFundTransaction.prototype.getRelatedTransactionId = function() {
  return this.relatedTransactionId;
};
Element.add({name: "RELFITID", order: 40, owner: SellMutualFundTransaction, /*type: String,*/ fcn: "getRelatedTransactionId"});


/**
 * Sets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
 * This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} relatedTransactionId the related transaction id
 */
SellMutualFundTransaction.prototype.setRelatedTransactionId = function(relatedTransactionId) {
  this.relatedTransactionId = relatedTransactionId;
};




module.exports = SellMutualFundTransaction;
