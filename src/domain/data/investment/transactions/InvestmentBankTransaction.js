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

var SubAccountType = require("domain/data/investment/accounts/SubAccountType");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

/**
 * Bank transactions that are part of an investment account statement. Wraps a {@link Transaction}.
 * @see "Section 13.9.2.3, OFX Spec"
 *
 * @class
 */
function InvestmentBankTransaction () {

  /**
   * @name InvestmentBankTransaction#transaction
   * @type Transaction
   * @access private
   */
  this.transaction = null;

  /**
   * @name InvestmentBankTransaction#subAccountFund
   * @type String
   * @access private
   */
  this.subAccountFund = null;
}



Aggregate.add("INVBANKTRAN", InvestmentBankTransaction);


/**
 * Gets the wrapped transaction aggregate.
 * @return {Transaction} the wrapped transaction
 */
InvestmentBankTransaction.prototype.getTransaction = function() {
  return this.transaction;
};
ChildAggregate.add({order: 10, owner: InvestmentBankTransaction, /*type: Transaction,*/ fcn: "getTransaction"});


/**
 * Sets the wrapped transaction aggregate.
 * @param {Transaction} transaction the wrapped transaction
 */
InvestmentBankTransaction.prototype.setTransaction = function(transaction) {
  this.transaction = transaction;
};


/**
 * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @return {String} the sub account fund for the transaction
 */
InvestmentBankTransaction.prototype.getSubAccountFund = function() {
  return this.subAccountFund;
};
Element.add({name: "SUBACCTFUND", required: true, order: 20, owner: InvestmentBankTransaction, /*type: String,*/ fcn: "getSubAccountFund"});


/**
 * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @param {String} subAccountFund the sub account fund for the transaction
 */
InvestmentBankTransaction.prototype.setSubAccountFund = function(subAccountFund) {
  this.subAccountFund = subAccountFund;
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
InvestmentBankTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountFund());
};




module.exports = InvestmentBankTransaction;
