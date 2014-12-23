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

var ChildAggregate = require("meta/ChildAggregate");

/**
 * Base class for investment transactions that aren't buys or sales..
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
function BaseOtherInvestmentTransaction () {

  /**
   * @name BaseOtherInvestmentTransaction#investmentTransaction
   * @type InvestmentTransaction
   * @access private
   */
  this.investmentTransaction = null;
}

inherit(BaseOtherInvestmentTransaction, "extends", BaseInvestmentTransaction);




BaseOtherInvestmentTransaction.prototype.BaseOtherInvestmentTransaction = function(/*TransactionType*/ transactionType) {
  super(transactionType);
};


/**
 * Gets the {@link InvestmentTransaction} aggregate.
 *
 * @return {InvestmentTransaction} the {@link InvestmentTransaction} aggregate
 */
// @Override
BaseOtherInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return investmentTransaction;
};
ChildAggregate.add({order: 10, owner: BaseOtherInvestmentTransaction, /*type: InvestmentTransaction,*/ fcn: "getInvestmentTransaction"});


/**
 * Sets the {@link InvestmentTransaction} aggregate.
 *
 * @param {InvestmentTransaction} investmentTransaction the {@link InvestmentTransaction} aggregate
 */
BaseOtherInvestmentTransaction.prototype.setInvestmentTransaction = function(investmentTransaction) {
  this.investmentTransaction = investmentTransaction;
};




module.exports = BaseOtherInvestmentTransaction;
