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
var SellDebtReason = require("./SellDebtReason");

/**
 * Transaction for selling debt (i.e. bonds, CDs, etc.,).
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseSellInvestmentTransaction
 */
function SellDebtTransaction () {
  BaseSellInvestmentTransaction.call(this, TransactionType.SELL_DEBT);

  /**
   * @name SellDebtTransaction#sellReason
   * @type String
   * @access private
   */
  this.sellReason = null;

  /**
   * @name SellDebtTransaction#accruedInterest
   * @type Double
   * @access private
   */
  this.accruedInterest = null;
}

inherit(SellDebtTransaction, "extends", BaseSellInvestmentTransaction);


Aggregate.add("SELLDEBT", SellDebtTransaction);


/**
 * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The reason for the sale
 */
SellDebtTransaction.prototype.getSellReason = function() {
  return this.sellReason;
};
Element.add(SellDebtTransaction, {name: "SELLREASON", order: 30, attributeType: String, readMethod: "getSellReason", writeMethod: "setSellReason"});


/**
 * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} sellReason The reason for the sale
 */
SellDebtTransaction.prototype.setSellReason = function(sellReason) {
  this.sellReason = sellReason;
};


/**
 * Gets the sell reason as one of the well-known types.
 *
 * @return {SellDebtReason} the sell reason or null if it's not well known
 */
SellDebtTransaction.prototype.getSellReasonEnum = function() {
  return SellDebtReason.fromOfx(this.getSellReason());
};


/**
 * Gets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the amount of accrued interest
 */
SellDebtTransaction.prototype.getAccruedInterest = function() {
  return this.accruedInterest;
};
Element.add(SellDebtTransaction, {name: "ACCRDINT", order: 40, attributeType: Number, readMethod: "getAccruedInterest", writeMethod: "setAccruedInterest"});


/**
 * Sets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} accruedInterest the amount of accrued interest
 */
SellDebtTransaction.prototype.setAccruedInterest = function(accruedInterest) {
  this.accruedInterest = accruedInterest;
};




module.exports = SellDebtTransaction;
