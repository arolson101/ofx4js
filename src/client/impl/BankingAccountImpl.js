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

var BankAccount = require("../BankAccount");
var BaseAccountImpl = require("./BaseAccountImpl");
var MessageSetType = require("../../domain/data/MessageSetType");
var BankingRequestMessageSet = require("../../domain/data/banking/BankingRequestMessageSet");
var BankStatementRequestTransaction = require("../../domain/data/banking/BankStatementRequestTransaction");
var BankStatementRequest = require("../../domain/data/banking/BankStatementRequest");

/**
 * @class
 * @augments BaseAccountImpl
 */
function BankingAccountImpl(/*BankAccountDetails*/ details, /*String*/ username, /*String*/ password, /*FinancialInstitutionImpl*/ institution) {
  BaseAccountImpl.call(this, details, username, password, institution);
}

inherit(BankingAccountImpl, "extends", BaseAccountImpl);
inherit(BankingAccountImpl, "implements", BankAccount);



BankingAccountImpl.prototype.unwrapStatementResponse = function(/*ResponseEnvelope*/ response) {
  var bankingSet = response.getMessageSet(MessageSetType.banking);
  if (bankingSet === null) {
    throw new Error("No banking response message set.");
  }

  var statementTransactionResponse = bankingSet.getStatementResponse();
  if (statementTransactionResponse === null) {
    throw new Error("No banking statement response transaction.");
  }

  var statement = statementTransactionResponse.getMessage();
  if (statement === null) {
    throw new Error("No banking statement in the transaction.");
  }
  
  return statement;
};


BankingAccountImpl.prototype.createRequestMessageSet = function(/*TransactionWrappedRequestMessage*/ transaction) {
  var bankingRequest = new BankingRequestMessageSet();
  bankingRequest.setStatementRequest(transaction);
  return bankingRequest;
};


BankingAccountImpl.prototype.createTransaction = function() {
  return new BankStatementRequestTransaction();
};


BankingAccountImpl.prototype.createStatementRequest = function(/*BankAccountDetails*/ details, /*StatementRange*/ range) {
  var bankRequest = new BankStatementRequest();
  bankRequest.setAccount(details);
  bankRequest.setStatementRange(range);
  return bankRequest;
};




module.exports = BankingAccountImpl;
