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
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 */
function Transaction () {

  /**
   * @name Transaction#transactionType
   * @type TransactionType
   * @access private
   */
  this.transactionType = null;

  /**
   * @name Transaction#datePosted
   * @type Date
   * @access private
   */
  this.datePosted = null;

  /**
   * @name Transaction#dateInitiated
   * @type Date
   * @access private
   */
  this.dateInitiated = null;

  /**
   * @name Transaction#dateAvailable
   * @type Date
   * @access private
   */
  this.dateAvailable = null;

  /**
   * @name Transaction#amount
   * @type BigDecimal
   * @access private
   */
  this.amount = null;

  /**
   * @name Transaction#id
   * @type String
   * @access private
   */
  this.id = null;

  /**
   * @name Transaction#correctionId
   * @type String
   * @access private
   */
  this.correctionId = null;

  /**
   * @name Transaction#correctionAction
   * @type CorrectionAction
   * @access private
   */
  this.correctionAction = null;

  /**
   * @name Transaction#tempId
   * @type String
   * @access private
   */
  this.tempId = null;

  /**
   * @name Transaction#checkNumber
   * @type String
   * @access private
   */
  this.checkNumber = null;

  /**
   * @name Transaction#referenceNumber
   * @type String
   * @access private
   */
  this.referenceNumber = null;

  /**
   * @name Transaction#standardIndustrialCode
   * @type String
   * @access private
   */
  this.standardIndustrialCode = null;

  /**
   * @name Transaction#payeeId
   * @type String
   * @access private
   */
  this.payeeId = null;

  /**
   * @name Transaction#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name Transaction#payee
   * @type Payee
   * @access private
   */
  this.payee = null;

  /**
   * @name Transaction#bankAccountTo
   * @type BankAccountDetails
   * @access private
   */
  this.bankAccountTo = null;

  /**
   * @name Transaction#creditCardAccountTo
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccountTo = null;

  /**
   * @name Transaction#memo
   * @type String
   * @access private
   */
  this.memo = null;

  /**
   * @name Transaction#currency
   * @type Currency
   * @access private
   */
  this.currency = null;

  /**
   * @name Transaction#originalCurrency
   * @type Currency
   * @access private
   */
  this.originalCurrency = null;
}



Aggregate.add("STMTTRN", Transaction);


/**
 * The transaction type.
 *
 * @return {TransactionType} The transaction type.
 */
Transaction.prototype.getTransactionType = function() {
  return this.transactionType;
};
Element.add({name: "TRNTYPE", required: true, order: 0, owner: Transaction, /*type: TransactionType,*/ fcn: "getTransactionType"});


/**
 * The transaction type.
 *
 * @param {TransactionType} transactionType The transaction type.
 */
Transaction.prototype.setTransactionType = function(transactionType) {
  this.transactionType = transactionType;
};


/**
 * The date the transaction was posted.
 *
 * @return {Date} The date the transaction was posted.
 */
Transaction.prototype.getDatePosted = function() {
  return this.datePosted;
};
Element.add({name: "DTPOSTED", required: true, order: 10, owner: Transaction, /*type: Date,*/ fcn: "getDatePosted"});


/**
 * The date the transaction was posted.
 *
 * @param {Date} datePosted The date the transaction was posted.
 */
Transaction.prototype.setDatePosted = function(datePosted) {
  this.datePosted = datePosted;
};


/**
 * The date the transaction was initiated.
 *
 * @return {Date} The date the transaction was initiated.
 */
Transaction.prototype.getDateInitiated = function() {
  return this.dateInitiated;
};
Element.add({name: "DTUSER", order: 20, owner: Transaction, /*type: Date,*/ fcn: "getDateInitiated"});


/**
 * The date the transaction was initiated.
 *
 * @param {Date} dateInitiated The date the transaction was initiated.
 */
Transaction.prototype.setDateInitiated = function(dateInitiated) {
  this.dateInitiated = dateInitiated;
};


/**
 * The date the funds are available.
 *
 * @return {Date} The date the funds are available.
 */
Transaction.prototype.getDateAvailable = function() {
  return this.dateAvailable;
};
Element.add({name: "DTAVAIL", order: 30, owner: Transaction, /*type: Date,*/ fcn: "getDateAvailable"});


/**
 * The date the funds are available.
 *
 * @param {Date} dateAvailable The date the funds are available.
 */
Transaction.prototype.setDateAvailable = function(dateAvailable) {
  this.dateAvailable = dateAvailable;
};


/**
 * The transaction amount.
 *
 * @return {Double} The transaction amount.
 */
Transaction.prototype.getAmount = function() {
  return this.amount;
};


/**
 * The transaction amount.
 *
 * @param {Double} amount The transaction amount.
 */
Transaction.prototype.setAmount = function(amount) {
  this.amount = amount;
};


/**
 * The transaction amount.
 *
 * @return {BigDecimal} The transaction amount.
 */
Transaction.prototype.getBigDecimalAmount = function() {
  return this.amount;
};
Element.add({name: "TRNAMT", required: true, order: 40, owner: Transaction, /*type: BigDecimal,*/ fcn: "getBigDecimalAmount"});


/**
 * The transaction amount.
 *
 * @param {BigDecimal} amount The transaction amount.
 */
Transaction.prototype.setBigDecimalAmount = function(amount) {
  this.amount = amount;
};


/**
 * The transaction id (server-assigned).
 *
 * @return {String} The transaction id (server-assigned).
 */
Transaction.prototype.getId = function() {
  return this.id;
};
Element.add({name: "FITID", required: true, order: 50, owner: Transaction, /*type: String,*/ fcn: "getId"});


/**
 * The transaction id (server-assigned).
 *
 * @param {String} id The transaction id (server-assigned).
 */
Transaction.prototype.setId = function(id) {
  this.id = id;
};


/**
 * The id of the transaction that this is correcting.
 *
 * @return {String} The id of the transaction that this is correcting.
 */
Transaction.prototype.getCorrectionId = function() {
  return this.correctionId;
};
Element.add({name: "CORRECTFITID", order: 60, owner: Transaction, /*type: String,*/ fcn: "getCorrectionId"});


/**
 * The id of the transaction that this is correcting.
 *
 * @param {String} correctionId The id of the transaction that this is correcting.
 */
Transaction.prototype.setCorrectionId = function(correctionId) {
  this.correctionId = correctionId;
};


/**
 * The action to take on the {@link #getCorrectionId() corrected transaction}.
 *
 * @return {CorrectionAction} The action to take on the {@link #getCorrectionId() corrected transaction}.
 */
Transaction.prototype.getCorrectionAction = function() {
  return this.correctionAction;
};
Element.add({name: "CORRECTACTION", order: 70, owner: Transaction, /*type: CorrectionAction,*/ fcn: "getCorrectionAction"});


/**
 * The action to take on the {@link #getCorrectionId() corrected transaction}.
 *
 * @param {CorrectionAction} correctionAction The action to take on the {@link #getCorrectionId() corrected transaction}.
 */
Transaction.prototype.setCorrectionAction = function(correctionAction) {
  this.correctionAction = correctionAction;
};


/**
 * The server-assigned temporary id for client-initiated transactions.
 *
 * @return {String} The server-assigned temporary id for client-initiated transactions.
 */
Transaction.prototype.getTempId = function() {
  return this.tempId;
};
Element.add({name: "SRVRTID", order: 80, owner: Transaction, /*type: String,*/ fcn: "getTempId"});


/**
 * The server-assigned temporary id for client-initiated transactions.
 *
 * @param {String} tempId The server-assigned temporary id for client-initiated transactions.
 */
Transaction.prototype.setTempId = function(tempId) {
  this.tempId = tempId;
};


/**
 * The check number.
 *
 * @return {String} The check number.
 */
Transaction.prototype.getCheckNumber = function() {
  return this.checkNumber;
};
Element.add({name: "CHECKNUM", order: 90, owner: Transaction, /*type: String,*/ fcn: "getCheckNumber"});


/**
 * The check number.
 *
 * @param {String} checkNumber The check number.
 */
Transaction.prototype.setCheckNumber = function(checkNumber) {
  this.checkNumber = checkNumber;
};


/**
 * The reference number.
 *
 * @return {String} The reference number.
 */
Transaction.prototype.getReferenceNumber = function() {
  return this.referenceNumber;
};
Element.add({name: "REFNUM", order: 100, owner: Transaction, /*type: String,*/ fcn: "getReferenceNumber"});


/**
 * The reference number.
 *
 * @param {String} referenceNumber The reference number.
 */
Transaction.prototype.setReferenceNumber = function(referenceNumber) {
  this.referenceNumber = referenceNumber;
};


/**
 * The standard industrial code.
 *
 * @return {String} The standard industrial code.
 */
Transaction.prototype.getStandardIndustrialCode = function() {
  return this.standardIndustrialCode;
};
Element.add({name: "SIC", order: 110, owner: Transaction, /*type: String,*/ fcn: "getStandardIndustrialCode"});


/**
 * The standard industrial code.
 *
 * @param {String} standardIndustrialCode The standard industrial code.
 */
Transaction.prototype.setStandardIndustrialCode = function(standardIndustrialCode) {
  this.standardIndustrialCode = standardIndustrialCode;
};


/**
 * The payee id.
 *
 * @return {String} The payee id.
 */
Transaction.prototype.getPayeeId = function() {
  return this.payeeId;
};
Element.add({name: "PAYEEID", order: 120, owner: Transaction, /*type: String,*/ fcn: "getPayeeId"});


/**
 * The payee id.
 *
 * @param {String} payeeId The payee id.
 */
Transaction.prototype.setPayeeId = function(payeeId) {
  this.payeeId = payeeId;
};


/**
 * The name (description) or the transaction.
 *
 * @return {String} The name (description) or the transaction.
 */
Transaction.prototype.getName = function() {
  return this.name;
};
Element.add({name: "NAME", order: 130, owner: Transaction, /*type: String,*/ fcn: "getName"});


/**
 * The name (description) or the transaction.
 *
 * @param {String} name The name (description) or the transaction.
 */
Transaction.prototype.setName = function(name) {
  this.name = name;
};


/**
 * The payee.
 *
 * @return {Payee} The payee.
 */
Transaction.prototype.getPayee = function() {
  return this.payee;
};
ChildAggregate.add({order: 140, owner: Transaction, /*type: Payee,*/ fcn: "getPayee"});


/**
 * The payee.
 *
 * @param {Payee} payee The payee.
 */
Transaction.prototype.setPayee = function(payee) {
  this.payee = payee;
};


/**
 * The bank account the transfer was to.
 *
 * @return {BankAccountDetails} The bank account the transfer was to.
 */
Transaction.prototype.getBankAccountTo = function() {
  return this.bankAccountTo;
};
ChildAggregate.add({name: "BANKACCTTO", order: 150, owner: Transaction, /*type: BankAccountDetails,*/ fcn: "getBankAccountTo"});


/**
 * The bank account the transfer was to.
 *
 * @param {BankAccountDetails} bankAccountTo The bank account the transfer was to.
 */
Transaction.prototype.setBankAccountTo = function(bankAccountTo) {
  this.bankAccountTo = bankAccountTo;
};


/**
 * The credit-card account the transfer was to.
 *
 * @return {CreditCardAccountDetails} The credit-card account the transfer was to.
 */
Transaction.prototype.getCreditCardAccountTo = function() {
  return this.creditCardAccountTo;
};
ChildAggregate.add({name: "CCACCTTO", order: 160, owner: Transaction, /*type: CreditCardAccountDetails,*/ fcn: "getCreditCardAccountTo"});


/**
 * The credit-card account the transfer was to.
 *
 * @param {CreditCardAccountDetails} creditCardAccountTo The credit-card account the transfer was to.
 */
Transaction.prototype.setCreditCardAccountTo = function(creditCardAccountTo) {
  this.creditCardAccountTo = creditCardAccountTo;
};


/**
 * Notes.
 *
 * @return {String} Notes.
 */
Transaction.prototype.getMemo = function() {
  return this.memo;
};
Element.add({name: "MEMO", order: 170, owner: Transaction, /*type: String,*/ fcn: "getMemo"});


/**
 * Notes.
 *
 * @param {String} memo Notes.
 */
Transaction.prototype.setMemo = function(memo) {
  this.memo = memo;
};


/**
 * The currency.
 *
 * @return {Currency} The currency.
 */
Transaction.prototype.getCurrency = function() {
  return this.currency;
};
ChildAggregate.add({order: 180, owner: Transaction, /*type: Currency,*/ fcn: "getCurrency"});


/**
 * The currency.
 *
 * @param {Currency} currency The currency.
 */
Transaction.prototype.setCurrency = function(currency) {
  this.currency = currency;
};


/**
 * The original currency.
 *
 * @return {Currency} The original currency.
 */
Transaction.prototype.getOriginalCurrency = function() {
  return this.originalCurrency;
};
ChildAggregate.add({name: "ORIGCURRENCY", order: 190, owner: Transaction, /*type: Currency,*/ fcn: "getOriginalCurrency"});


/**
 * The original currency.
 *
 * @param {Currency} originalCurrency The original currency.
 */
Transaction.prototype.setOriginalCurrency = function(originalCurrency) {
  this.originalCurrency = originalCurrency;
};




module.exports = Transaction;
