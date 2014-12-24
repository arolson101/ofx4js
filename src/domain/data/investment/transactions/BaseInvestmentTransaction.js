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

/**
 * Base class for all investment transactions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @class
 */
function BaseInvestmentTransaction (/*TransactionType*/ transactionType) {

  /**
   * @name BaseInvestmentTransaction#transactionType
   * @type TransactionType
   * @access private
   */
  this.transactionType = transactionType;
}




/**
 * Gets the type of transaction.
 *
 * @return {TransactionType} the type of transaction
 */
BaseInvestmentTransaction.prototype.getTransactionType = function() {
  return this.transactionType;
};


/**
 * Gets the {@link InvestmentTransaction} aggregate.
 *
 * @return {InvestmentTransaction} the {@link InvestmentTransaction} aggregate
 */
BaseInvestmentTransaction.prototype.getInvestmentTransaction = function() { throw new Error("Not implemented"); };

/**
 * Gets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the financial institution asssigned transaction id
 */
BaseInvestmentTransaction.prototype.getTransactionId = function() {
  return this.getInvestmentTransaction().getTransactionId();
};

/**
 * Gets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the server assigned transaction id
 */
BaseInvestmentTransaction.prototype.getServerId = function() {
  return this.getInvestmentTransaction().getServerId();
};

/**
 * Gets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
BaseInvestmentTransaction.prototype.getTradeDate = function() {
  return this.getInvestmentTransaction().getTradeDate();
};

/**
 * Gets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
BaseInvestmentTransaction.prototype.getSettlementDate = function() {
  return this.getInvestmentTransaction().getSettlementDate();
};

/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the transaction id of the transaction being reversed
 */
BaseInvestmentTransaction.prototype.getReversalTransactionId = function() {
  return this.getInvestmentTransaction().getReversalTransactionId();
};

/**
 * Gets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the memo
 */
BaseInvestmentTransaction.prototype.getMemo = function() {
  return this.getInvestmentTransaction().getMemo();
};




module.exports = BaseInvestmentTransaction;
