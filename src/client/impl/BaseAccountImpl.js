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

var inherit = require("../../util/inherit");

var FinancialInstitutionAccount = require("../FinancialInstitutionAccount");
var BankAccountDetails = require("../../domain/data/banking/BankAccountDetails");
var StatementRange = require("../../domain/data/common/StatementRange");
var CreditCardAccountDetails = require("../../domain/data/creditcard/CreditCardAccountDetails");
var InvestmentAccountDetails = require("../../domain/data/investment/accounts/InvestmentAccountDetails");
var MessageSetType = require("../../domain/data/MessageSetType");


/**
 * Base account implementation. Supports banking and credit card accounts.
 *
 * @class
 */
function BaseAccountImpl() {

  /**
   * @name BaseAccountImpl#details
   * @access private
   */
  this.details = null;

  /**
   * @name BaseAccountImpl#messageType
   * @type MessageSetType
   * @access private
   */
  this.messageType = null;

  /**
   * @name BaseAccountImpl#username
   * @type String
   * @access private
   */
  this.username = null;

  /**
   * @name BaseAccountImpl#password
   * @type String
   * @access private
   */
  this.password = null;

  /**
   * @name BaseAccountImpl#institution
   * @type FinancialInstitutionImpl
   * @access private
   */
  this.institution = null;

  /**
   * @name BaseAccountImpl#OFXException
   * @type throws
   */
  this.OFXException = null;
}

inherit(BaseAccountImpl, "implements", FinancialInstitutionAccount);




BaseAccountImpl.prototype.BaseAccountImpl = function(/*D*/ details, /*String*/ username, /*String*/ password, /*FinancialInstitutionImpl*/ institution) {
  this.details = details;
  this.username = username;
  this.password = password;
  this.institution = institution;
  this.messageType = this.getMessageSetType(details);
};


/**
 * Get the message set type of the specified details.
 *
 * @param details The details.
 * @return {MessageSetType} The message set type.
 */
BaseAccountImpl.prototype.getMessageSetType = function(details) {
  var messageType;
  if (details instanceof BankAccountDetails) {
    messageType = MessageSetType.banking;
  }
  else if (this.getDetails() instanceof CreditCardAccountDetails) {
    messageType = MessageSetType.creditcard;
  }
  else if (this.getDetails() instanceof InvestmentAccountDetails) {
    messageType = MessageSetType.investment;
  }
  else {
    throw new Error("Illegal details: " + this.details.constructor.name);
  }
  return messageType;
};


BaseAccountImpl.prototype.readStatement = function(/*Date*/ start, /*Date*/ end) {
  var range = new StatementRange();
  range.setIncludeTransactions(true);
  range.setStart(start);
  range.setEnd(end);

  var request = this.institution.createAuthenticatedRequest(this.username, this.password);
  var requestTransaction = this.createTransaction();
  requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
  request.getMessageSets().push(this.createRequestMessageSet(requestTransaction));

  var response = this.institution.sendRequest(request);
  this.institution.doGeneralValidationChecks(request, response);

  return this.unwrapStatementResponse(response);
};


/**
 * Create a request message set from the specified transaction.
 *
 * @param {TransactionWrappedRequestMessage} transaction The transaction.
 * @return {RequestMessageSet} The request message set.
 */
BaseAccountImpl.prototype.createRequestMessageSet = function(/*transaction*/) { throw new Error("not implemented"); };

/**
 * Create a transaction.
 *
 * @return {TransactionWrappedRequestMessage} The transaction.
 */
BaseAccountImpl.prototype.createTransaction = function() { throw new Error("not implemented"); };

/**
 * Create a statement request.
 *
 * @param details The details.
 * @param {StatementRange} range the range.
 * @return {StatementRequest} The statement request.
 */
BaseAccountImpl.prototype.createStatementRequest = function(/*details, range*/) { throw new Error("not implemented"); };

/**
 * The details of this account.
 *
 * @return The details of this account.
 */
BaseAccountImpl.prototype.getDetails = function() {
  return this.details;
};

/**
 * The message set type.
 *
 * @return {MessageSetType} The message set type.
 */
BaseAccountImpl.prototype.getMessageType = function() {
  return this.messageType;
};




module.exports = BaseAccountImpl;
