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

var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Investment transaction aggregate ("INVTRAN").
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @class
 */
function InvestmentTransaction () {

  /**
   * @name InvestmentTransaction#transactionId
   * @type String
   * @access private
   */
  this.transactionId = null;

  /**
   * @name InvestmentTransaction#serverId
   * @type String
   * @access private
   */
  this.serverId = null;

  /**
   * @name InvestmentTransaction#tradeDate
   * @type Date
   * @access private
   */
  this.tradeDate = null;

  /**
   * @name InvestmentTransaction#settlementDate
   * @type Date
   * @access private
   */
  this.settlementDate = null;

  /**
   * @name InvestmentTransaction#reversalTransactionId
   * @type String
   * @access private
   */
  this.reversalTransactionId = null;

  /**
   * @name InvestmentTransaction#memo
   * @type String
   * @access private
   */
  this.memo = null;
}



Aggregate.add("INVTRAN", InvestmentTransaction);


/**
 * Gets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the financial institution asssigned transaction id
 */
InvestmentTransaction.prototype.getTransactionId = function() {
  return this.transactionId;
};
Element.add(InvestmentTransaction, {name: "FITID", required: true, order: 0, attributeType: String, readMethod: "getTransactionId", writeMethod: "setTransactionId"});


/**
 * Sets the unique financial institution assigned transaction id. This is a
 * required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} transactionId the financial institution asssigned transaction id
 */
InvestmentTransaction.prototype.setTransactionId = function(transactionId) {
  this.transactionId = transactionId;
};


/**
 * Gets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the server assigned transaction id
 */
InvestmentTransaction.prototype.getServerId = function() {
  return this.serverId;
};
Element.add(InvestmentTransaction, {name: "SRVRTID", order: 10, attributeType: String, readMethod: "getServerId", writeMethod: "setServerId"});


/**
 * Sets the server assigned transaction id. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} serverId the server assigned transaction id
 */
InvestmentTransaction.prototype.setServerId = function(serverId) {
  this.serverId = serverId;
};


/**
 * Gets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
InvestmentTransaction.prototype.getTradeDate = function() {
  return this.tradeDate;
};
Element.add(InvestmentTransaction, {name: "DTTRADE", required: true, order: 20, attributeType: Date, readMethod: "getTradeDate", writeMethod: "setTradeDate"});


/**
 * Sets the trade date of the transaction. For stock splits, this is the
 * day of record. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {Date} tradeDate the trade date
 */
InvestmentTransaction.prototype.setTradeDate = function(tradeDate) {
  this.tradeDate = tradeDate;
};


/**
 * Gets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {Date} the trade date
 */
InvestmentTransaction.prototype.getSettlementDate = function() {
  return this.settlementDate;
};
Element.add(InvestmentTransaction, {name: "DTSETTLE", order: 30, attributeType: Date, readMethod: "getSettlementDate", writeMethod: "setSettlementDate"});


/**
 * Sets the settlement date of the transaction. For stock splits, this is the
 * day of of execution. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {Date} settlementDate the trade date
 */
InvestmentTransaction.prototype.setSettlementDate = function(settlementDate) {
  this.settlementDate = settlementDate;
};


/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the transaction id of the transaction being reversed
 */
InvestmentTransaction.prototype.getReversalTransactionId = function() {
  return this.reversalTransactionId;
};
Element.add(InvestmentTransaction, {name: "REVERSALFITID", order: 40, attributeType: String, readMethod: "getReversalTransactionId", writeMethod: "setReversalTransactionId"});


/**
 * For a reveral transaction, gets the financial institution assigned
 * transaction id for the transaction being revesed.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} reversalTransactionId the transaction id of the transaction being reversed
 */
InvestmentTransaction.prototype.setReversalTransactionId = function(reversalTransactionId) {
  this.reversalTransactionId = reversalTransactionId;
};


/**
 * Gets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @return {String} the memo
 */
InvestmentTransaction.prototype.getMemo = function() {
  return this.memo;
};
Element.add(InvestmentTransaction, {name: "MEMO", order: 50, attributeType: String, readMethod: "getMemo", writeMethod: "setMemo"});


/**
 * Sets the memo associated with the transaction. This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @param {String} memo the memo
 */
InvestmentTransaction.prototype.setMemo = function(memo) {
  this.memo = memo;
};




module.exports = InvestmentTransaction;
