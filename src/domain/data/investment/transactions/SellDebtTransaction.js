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
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

/**
 * Transaction for selling debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
function SellDebtTransaction () {

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


SellDebtTransaction.prototype.SellDebtTransaction = function() {
  super(TransactionType.SELL_DEBT);
};


/**
 * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} The reason for the sale
 */
SellDebtTransaction.prototype.getSellReason = function() {
  return sellReason;
};
Element.add({name: "SELLREASON", order: 30, owner: SellDebtTransaction, /*type: String,*/ fcn: "getSellReason"});


/**
 * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
 * "MATURITY" (the debt reached maturity).
 * @see "Section 13.9.2.4.4, OFX Spec"
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
  return SellDebtReason.fromOfx(getSellReason());
};


/**
 * Gets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the amount of accrued interest
 */
SellDebtTransaction.prototype.getAccruedInterest = function() {
  return accruedInterest;
};
Element.add({name: "ACCRDINT", order: 40, owner: SellDebtTransaction, /*type: Double,*/ fcn: "getAccruedInterest"});


/**
 * Sets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} accruedInterest the amount of accrued interest
 */
SellDebtTransaction.prototype.setAccruedInterest = function(accruedInterest) {
  this.accruedInterest = accruedInterest;
};




module.exports = SellDebtTransaction;
