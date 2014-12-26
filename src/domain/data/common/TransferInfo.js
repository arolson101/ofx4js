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

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function TransferInfo () {

  /**
   * @name TransferInfo#bankAccountFrom
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountFrom = null;

  /**
   * @name TransferInfo#creditCardAccountFrom
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountFrom = null;

  /**
   * @name TransferInfo#bankAccountTo
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountTo = null;

  /**
   * @name TransferInfo#creditCardAccountTo
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountTo = null;

  /**
   * @name TransferInfo#amount
   * @type Double
   * @access private
   */
  this.amount = null;

  /**
   * @name TransferInfo#due
   * @type Date
   * @access private
   */
  this.due = null;
}



Aggregate.add("XFERINFO", TransferInfo);


/**
 * The bank account to transfer from.
 *
 * @return {BankAccountDetails} The bank account to transfer from.
 */
TransferInfo.prototype.getBankAccountFrom = function() {
  return this.bankAccountFrom;
};
ChildAggregate.add(TransferInfo, {name: "BANKACCTFROM", order: 0, attributeType: BankAccountDetails, readMethod: "getBankAccountFrom", writeMethod: "setBankAccountFrom"});


/**
 * The bank account to transfer from.
 *
 * @param {BankAccountDetails} bankAccountFrom The bank account to transfer from.
 */
TransferInfo.prototype.setBankAccountFrom = function(bankAccountFrom) {
  this.creditCardAccountFrom = null;
  this.bankAccountFrom = bankAccountFrom;
};


/**
 * The account to transfer from.
 *
 * @param {BankAccountDetails} bankAccountFrom The account to transfer from.
 */
TransferInfo.prototype.setAccountFrom = function(bankAccountFrom) {
  this.setBankAccountFrom(bankAccountFrom);
};


/**
 * The credit card to transfer from.
 *
 * @return {CreditCardAccountDetails} The credit card to transfer from.
 */
TransferInfo.prototype.getCreditCardAccountFrom = function() {
  return this.creditCardAccountFrom;
};
ChildAggregate.add(TransferInfo, {name: "CCACCTFROM", order: 10, attributeType: CreditCardAccountDetails, readMethod: "getCreditCardAccountFrom", writeMethod: "setCreditCardAccountFrom"});


/**
 * The credit card to transfer from.
 *
 * @param {CreditCardAccountDetails} creditCardAccountFrom The credit card to transfer from.
 */
TransferInfo.prototype.setCreditCardAccountFrom = function(creditCardAccountFrom) {
  this.bankAccountFrom = null;
  this.creditCardAccountFrom = creditCardAccountFrom;
};


/**
 * The credit card to transfer from.
 *
 * @param {CreditCardAccountDetails} creditCardAccountFrom The credit card to transfer from.
 */
TransferInfo.prototype.setAccountFrom = function(creditCardAccountFrom) {
  this.setCreditCardAccountFrom(creditCardAccountFrom);
};


/**
 * The bank account to transfer to.
 *
 * @return {BankAccountDetails} The bank account to transfer to.
 */
TransferInfo.prototype.getBankAccountTo = function() {
  return this.bankAccountTo;
};
ChildAggregate.add(TransferInfo, {name: "BANKACCTTO", order: 20, attributeType: BankAccountDetails, readMethod: "getBankAccountTo", writeMethod: "setBankAccountTo"});


/**
 * The bank account to transfer to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account to transfer to.
 */
TransferInfo.prototype.setBankAccountTo = function(bankAccountTo) {
  this.creditCardAccountTo = null;
  this.bankAccountTo = bankAccountTo;
};


/**
 * The bank account to transfer to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account to transfer to.
 */
TransferInfo.prototype.setAccountTo = function(bankAccountTo) {
  this.setBankAccountTo(bankAccountTo);
};


/**
 * The credit card account to transfer to.
 *
 * @return {CreditCardAccountDetails} The credit card account to transfer to.
 */
TransferInfo.prototype.getCreditCardAccountTo = function() {
  return this.creditCardAccountTo;
};
ChildAggregate.add(TransferInfo, {name: "CCACCTTO", order: 30, attributeType: CreditCardAccountDetails, readMethod: "getCreditCardAccountTo", writeMethod: "setCreditCardAccountTo"});


/**
 * The credit card account to transfer to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit card account to transfer to.
 */
TransferInfo.prototype.setCreditCardAccountTo = function(creditCardAccountTo) {
  this.bankAccountTo = null;
  this.creditCardAccountTo = creditCardAccountTo;
};


/**
 * The credit card account to transfer to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit card account to transfer to.
 */
TransferInfo.prototype.setAccountTo = function(creditCardAccountTo) {
  this.setCreditCardAccountTo(creditCardAccountTo);
};


/**
 * The amount.
 *
 * @return {Double} The amount.
 */
TransferInfo.prototype.getAmount = function() {
  return this.amount;
};
Element.add(TransferInfo, {name: "TRNAMT", required: true, order: 40, attributeType: Double, readMethod: "getAmount", writeMethod: "setAmount"});


/**
 * The amount.
 *
 * @param {Double} amount The amount.
 */
TransferInfo.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The due date.
 *
 * @return {Date} The due date.
 */
TransferInfo.prototype.getDue = function() {
  return this.due;
};
Element.add(TransferInfo, {name: "DTDUE", order: 50, attributeType: Date, readMethod: "getDue", writeMethod: "setDue"});


/**
 * The due date.
 *
 * @param {Date} due The due date.
 */
TransferInfo.prototype.setDue = function(due) {
  this.due = due;
};




module.exports = TransferInfo;
