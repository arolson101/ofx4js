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

var MessageSetType = require("domain/data/MessageSetType");
var RequestMessageSet = require("domain/data/RequestMessageSet");
var RequestMessage = require("domain/data/RequestMessage");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

//import java.util.List;
//import java.util.ArrayList;

/**
 * @author Ryan Heaton
 */
function BankingRequestMessageSet () {

  /**
   * @name BankingRequestMessageSet#statementRequest
   * @type BankStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(BankingRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("BANKMSGSRQV1", BankingRequestMessageSet);


BankingRequestMessageSet.prototype.getType = function() {
  return MessageSetType.banking;
};


/**
 * The statement request.
 *
 * @return {BankStatementRequestTransaction} The statement request.
 */
BankingRequestMessageSet.prototype.getStatementRequest = function() {
  return statementRequest;
};
ChildAggregate.add({order: 0, owner: BankingRequestMessageSet, /*type: BankStatementRequestTransaction,*/ fcn: "getStatementRequest"});


/**
 * The statement request.
 *
 * @param {BankStatementRequestTransaction} statementRequest The statement request.
 */
BankingRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
BankingRequestMessageSet.prototype.getRequestMessages = function() {
  ArrayList<RequestMessage> requestMessages = new ArrayList<RequestMessage>();
  if (getStatementRequest() != null) {
    requestMessages.add(getStatementRequest());
  }
  return requestMessages;
};




module.exports = BankingRequestMessageSet;
