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

var Inv401KSource = require("domain/data/investment/positions/Inv401KSource");
var SecurityId = require("domain/data/seclist/SecurityId");
var SubAccountType = require("domain/data/investment/accounts/SubAccountType");
var ChildAggregate = require("meta/ChildAggregate");

/**
 * Base class for all investment transactions for selling securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all sell investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
function BaseSellInvestmentTransaction () {

  /**
   * @name BaseSellInvestmentTransaction#sellInvestment
   * @type SellInvestmentTransaction
   * @access private
   */
  this.sellInvestment = null;
}

inherit(BaseSellInvestmentTransaction, "extends", BaseInvestmentTransaction);
inherit(BaseSellInvestmentTransaction, "implements", TransactionWithSecurity);




BaseSellInvestmentTransaction.prototype.BaseSellInvestmentTransaction = function(/*TransactionType*/ transactionType) {
  super(transactionType);
};


/**
 * Gets the sell investment transaction child aggregate.
 *
 * @return {SellInvestmentTransaction} the sell investment transaction child aggregate
 */
// @Override
BaseSellInvestmentTransaction.prototype.getSellInvestment = function() {
  return sellInvestment;
};
ChildAggregate.add({order: 10, owner: BaseSellInvestmentTransaction, /*type: SellInvestmentTransaction,*/ fcn: "getSellInvestment"});


/**
 * Sets the sell investment transaction child aggregate.
 *
 * @param {SellInvestmentTransaction} sellInvestment the sell investment transaction child aggregate
 */
BaseSellInvestmentTransaction.prototype.setSellInvestment = function(sellInvestment) {
  this.sellInvestment = sellInvestment;
};


/**
 * Gets the investment transaction aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction aggregate
 */
// @Overridden
BaseSellInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return getSellInvestment().getInvestmentTransaction();
};


/**
 * Gets the id of the security that was sold. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BaseSellInvestmentTransaction.prototype.getSecurityId = function() {
  return getSellInvestment().getSecurityId();
};


/**
 * Gets the number of units of the security that was sold. For security-based actions other
 * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BaseSellInvestmentTransaction.prototype.getUnits = function() {
  return getSellInvestment().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseSellInvestmentTransaction.prototype.getUnitPrice = function() {
  return getSellInvestment().getUnitPrice();
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markedown price
 */
BaseSellInvestmentTransaction.prototype.getMarkdown = function() {
  return getSellInvestment().getMarkdown();
};


/**
 * Gets the transaction commission for the sale. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BaseSellInvestmentTransaction.prototype.getCommission = function() {
  return getSellInvestment().getCommission();
};


/**
 * Gets the taxes for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BaseSellInvestmentTransaction.prototype.getTaxes = function() {
  return getSellInvestment().getTaxes();
};


/**
 * Gets the fees for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BaseSellInvestmentTransaction.prototype.getFees = function() {
  return getSellInvestment().getFees();
};


/**
 * Gets the load for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BaseSellInvestmentTransaction.prototype.getLoad = function() {
  return getSellInvestment().getLoad();
};


/**
 * Gets the withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the withholding
 */
BaseSellInvestmentTransaction.prototype.getWithholding = function() {
  return getSellInvestment().getWithholding();
};


/**
 * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Boolean} whether the transaction was tax exempt
 */
BaseSellInvestmentTransaction.prototype.getTaxExempt = function() {
  return getSellInvestment().getTaxExempt();
};


/**
 * Gets the total for the sale. Should be equal to
 * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
 * statewithholding) according to the OFX spec. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BaseSellInvestmentTransaction.prototype.getTotal = function() {
  return getSellInvestment().getTotal();
};


/**
 * Gets the gain sale. This is aan optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the gain for the sale
 */
BaseSellInvestmentTransaction.prototype.getGain = function() {
  return getSellInvestment().getGain();
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction.
 */
BaseSellInvestmentTransaction.prototype.getCurrencyCode = function() {
  return getSellInvestment().getCurrencyCode();
};


/**
 * Gets the origianl currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the currency info for the transaction.
 */
BaseSellInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return getSellInvestment().getOriginalCurrencyInfo();
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BaseSellInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return getSellInvestment().getSubAccountSecurity();
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BaseSellInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money went to  (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BaseSellInvestmentTransaction.prototype.getSubAccountFund = function() {
  return getSellInvestment().getSubAccountFund();
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
BaseSellInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(getSubAccountFund());
};


/**
 * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the loan id
 */
BaseSellInvestmentTransaction.prototype.getLoadId = function() {
  return getSellInvestment().getLoanId();
};


/**
 * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
BaseSellInvestmentTransaction.prototype.getStateWithholding = function() {
  return getSellInvestment().getStateWithholding();
};


/**
 * Gets the penalty for the sale. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the state withholding
 */
BaseSellInvestmentTransaction.prototype.getPenalty = function() {
  return getSellInvestment().getPenalty();
};


/**
 * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the 401k source
 */
BaseSellInvestmentTransaction.prototype.get401kSource = function() {
  return getSellInvestment().get401kSource();
};


/**
 * Gets the 401k source as one of the well-known types.
 *
 * @return {Inv401KSource} the 401k source or null if its not one of the well-known types
 */
BaseSellInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(get401kSource());
};




module.exports = BaseSellInvestmentTransaction;
