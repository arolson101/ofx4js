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

var CreditCardAccount = require("../CreditCardAccount");
var BaseAccountImpl = require("./BaseAccountImpl");
var MessageSetType = require("../../domain/data/MessageSetType");
var CreditCardRequestMessageSet = require("../../domain/data/creditcard/CreditCardRequestMessageSet");
var CreditCardStatementRequestTransaction = require("../../domain/data/creditcard/CreditCardStatementRequestTransaction");
var CreditCardStatementRequest = require("../../domain/data/creditcard/CreditCardStatementRequest");

/**
 * @class
 */
function CreditCardAccountImpl(/*CreditCardAccountDetails*/ details, /*String*/ username, /*String*/ password, /*FinancialInstitutionImpl*/ institution) {
  BaseAccountImpl.call(this, details, username, password, institution);
}

inherit(CreditCardAccountImpl, "extends", BaseAccountImpl);
inherit(CreditCardAccountImpl, "implements", CreditCardAccount);




CreditCardAccountImpl.prototype.unwrapStatementResponse = function(/*ResponseEnvelope*/ response) {
  var creditCardSet = response.getMessageSet(MessageSetType.creditcard);
  if (creditCardSet === null) {
    throw new Error("No credit card response message set.");
  }

  var statementTransactionResponse = creditCardSet.getStatementResponse();
  if (statementTransactionResponse === null) {
    throw new Error("No credit card statement response transaction.");
  }

  var statement = statementTransactionResponse.getMessage();
  if (statement === null) {
    throw new Error("No credit card statement in the transaction.");
  }

  return statement;
};


CreditCardAccountImpl.prototype.createRequestMessageSet = function(/*TransactionWrappedRequestMessage*/ transaction) {
  var creditCardRequest = new CreditCardRequestMessageSet();
  creditCardRequest.setStatementRequest(transaction);
  return creditCardRequest;
};


CreditCardAccountImpl.prototype.createTransaction = function() {
  return new CreditCardStatementRequestTransaction();
};


CreditCardAccountImpl.prototype.createStatementRequest = function(/*CreditCardAccountDetails*/ details, /*StatementRange*/ range) {
  var bankRequest = new CreditCardStatementRequest();
  bankRequest.setAccount(details);
  bankRequest.setStatementRange(range);
  return bankRequest;
};




module.exports = CreditCardAccountImpl;
