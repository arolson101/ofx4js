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
var TransactionType = require("./TransactionType");
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var BuyType = require("./BuyType");

/**
 * Transaction for buying stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyStockTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_STOCK);

  /**
   * @name BuyStockTransaction#buyType
   * @type String
   * @access private
   */
  this.buyType = null;
}

inherit(BuyStockTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYSTOCK", BuyStockTransaction);



/**
 * Gets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the buy type
 */
BuyStockTransaction.prototype.getBuyType = function() {
  return this.buyType;
};
Element.add({name: "BUYTYPE", required: true, order: 20, owner: BuyStockTransaction, /*type: String,*/ readMethod: "getBuyType", writeMethod: "setBuyType"});


/**
 * Sets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} buyType the buy type
 */
BuyStockTransaction.prototype.setBuyType = function(buyType) {
  this.buyType = buyType;
};


/**
 * Gets the buy type as one of the well-known types.
 *
 * @return {BuyType} the type of purchase or null if it's not well known
 */
BuyStockTransaction.prototype.getBuyTypeEnum = function() {
  return BuyType.fromOfx(this.buyType);
};




module.exports = BuyStockTransaction;
