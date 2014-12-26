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
var BaseBuyInvestmentTransaction = require("./BaseBuyInvestmentTransaction");
var TransactionType = require("./TransactionType");

/**
 * Transaction for buying debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseBuyInvestmentTransaction
 */
function BuyDebtTransaction () {
  BaseBuyInvestmentTransaction.call(this, TransactionType.BUY_DEBT);

  /**
   * @name BuyDebtTransaction#accruedInterest
   * @type Double
   * @access private
   */
  this.accruedInterest = null;
}

inherit(BuyDebtTransaction, "extends", BaseBuyInvestmentTransaction);


Aggregate.add("BUYDEBT", BuyDebtTransaction);




/**
 * Gets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the amount of accrued interest
 */
BuyDebtTransaction.prototype.getAccruedInterest = function() {
  return this.accruedInterest;
};
Element.add({name: "ACCRDINT", order: 20, owner: BuyDebtTransaction, /*type: Double,*/ readMethod: "getAccruedInterest", writeMethod: "setAccruedInterest"});


/**
 * Sets the amount of accrued interest on the debt. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} accruedInterest the amount of accrued interest
 */
BuyDebtTransaction.prototype.setAccruedInterest = function(accruedInterest) {
  this.accruedInterest = accruedInterest;
};




module.exports = BuyDebtTransaction;
