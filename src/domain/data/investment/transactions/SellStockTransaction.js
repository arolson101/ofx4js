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

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");
var BaseSellInvestmentTransaction = require("./BaseSellInvestmentTransaction");
var TransactionType = require("./TransactionType");
var SellType = require("./SellType");

/**
 * Transaction for selling stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellStockTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_STOCK);

  /**
   * @name SellStockTransaction#sellType
   * @type String
   * @access private
   */
  this.sellType = null;
}

inherit(SellStockTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLSTOCK", SellStockTransaction);


/**
 * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sell type
 */
SellStockTransaction.prototype.getSellType = function() {
  return this.sellType;
};
Element.add({name: "SELLTYPE", required: true, order: 20, owner: SellStockTransaction, /*type: String,*/ readMethod: "getSellType", writeMethod: "setSellType"});


/**
 * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellType the sell type
 */
SellStockTransaction.prototype.setSellType = function(sellType) {
  this.sellType = sellType;
};


/**
 * Gets the sell type as one of the well-known types.
 *
 * @return {SellType} the type of sale or null if it's not known
 */
SellStockTransaction.prototype.getSellTypeEnum = function() {
  return SellType.fromOfx(this.sellType);
};




module.exports = SellStockTransaction;
