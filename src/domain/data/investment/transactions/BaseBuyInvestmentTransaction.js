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

var SubAccountType = require("domain/data/investment/accounts/SubAccountType");
var SecurityId = require("domain/data/seclist/SecurityId");
var ChildAggregate = require("meta/ChildAggregate");

/**
 * Base class for all investment transactions for buying securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all buy investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
function BaseBuyInvestmentTransaction () {

  /**
   * @name BaseBuyInvestmentTransaction#buyInvestment
   * @type BuyInvestmentTransaction
   * @access private
   */
  this.buyInvestment = null;
}

inherit(BaseBuyInvestmentTransaction, "extends", BaseInvestmentTransaction);
inherit(BaseBuyInvestmentTransaction, "implements", TransactionWithSecurity);




BaseBuyInvestmentTransaction.prototype.BaseBuyInvestmentTransaction = function(/*TransactionType*/ transactionType) {
  super(transactionType);
};


/**
 * Gets the buy investment transaction child aggregate.
 *
 * @return {BuyInvestmentTransaction} the buy investment transaction child aggregate
 */
BaseBuyInvestmentTransaction.prototype.getBuyInvestment = function() {
  return buyInvestment;
};
ChildAggregate.add({order: 10, owner: BaseBuyInvestmentTransaction, /*type: BuyInvestmentTransaction,*/ fcn: "getBuyInvestment"});


/**
 * Sets the buy investment transaction child aggregate.
 *
 * @param {BuyInvestmentTransaction} buyInvestment the buy investment transaction child aggregate
 */
BaseBuyInvestmentTransaction.prototype.setBuyInvestment = function(buyInvestment) {
  this.buyInvestment = buyInvestment;
};


/**
 * Gets the investment transaction aggregate.
 *
 * @return {InvestmentTransaction} the investment transaction aggregate
 */
// @Overridden
BaseBuyInvestmentTransaction.prototype.getInvestmentTransaction = function() {
  return getBuyInvestment().getInvestmentTransaction();
};


/**
 * Gets the id of the security that was bought. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
BaseBuyInvestmentTransaction.prototype.getSecurityId = function() {
  return getBuyInvestment().getSecurityId();
};


/**
 * Gets the number of units of the security that was bought. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units purchased.
 */
BaseBuyInvestmentTransaction.prototype.getUnits = function() {
  return getBuyInvestment().getUnits();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseBuyInvestmentTransaction.prototype.getUnitPrice = function() {
  return getBuyInvestment().getUnitPrice();
};


/**
 * Gets the portion of the unit price that is attributed to the dealer markup. This is an
 * optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit markeup price
 */
BaseBuyInvestmentTransaction.prototype.getMarkup = function() {
  return getBuyInvestment().getMarkup();
};


/**
 * Gets the transaction commission for the purchase. This is an optional field according to the
 * OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction commision
 */
BaseBuyInvestmentTransaction.prototype.getCommission = function() {
  return getBuyInvestment().getCommission();
};


/**
 * Gets the taxes for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction taxes
 */
BaseBuyInvestmentTransaction.prototype.getTaxes = function() {
  return getBuyInvestment().getTaxes();
};


/**
 * Gets the fees for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the transaction fees
 */
BaseBuyInvestmentTransaction.prototype.getFees = function() {
  return getBuyInvestment().getFees();
};


/**
 * Gets the load for the purchase. This is an optional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the load
 */
BaseBuyInvestmentTransaction.prototype.getLoad = function() {
  return getBuyInvestment().getLoad();
};


/**
 * Gets the total for the purchase. Should be equal to
 * (units * (unitPrice + markup)) + (commision + fees + load + taxes) according to the OFX
 * spec. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the total
 */
BaseBuyInvestmentTransaction.prototype.getTotal = function() {
  return getBuyInvestment().getTotal();
};


/**
 * Gets the currency code for the transaction. Only one of currency code or original currency
 * info should be set according to the OFX spec. If neither are set, means the default currency.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the currency code for the transaction
 */
BaseBuyInvestmentTransaction.prototype.getCurrencyCode = function() {
  return getBuyInvestment().getCurrencyCode();
};


/**
 * Gets the original currency info for the transaction.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {OriginalCurrency} the original currency info for the transaction
 */
BaseBuyInvestmentTransaction.prototype.getOriginalCurrencyInfo = function() {
  return getBuyInvestment().getOriginalCurrencyInfo();
};


/**
 * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account type
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return getBuyInvestment().getSubAccountSecurity();
};


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(getSubAccountSecurity());
};


/**
 * Gets the sub account type that the money came from. (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the sub account fund
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountFund = function() {
  return getBuyInvestment().getSubAccountFund();
};


/**
 * Gets the result of getSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type or null if it wasn't one of the well known types.
 */
BaseBuyInvestmentTransaction.prototype.getSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(getSubAccountFund());
};




module.exports = BaseBuyInvestmentTransaction;
