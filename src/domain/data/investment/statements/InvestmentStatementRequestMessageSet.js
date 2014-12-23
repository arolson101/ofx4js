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
var RequestMessage = require("domain/data/RequestMessage");
var RequestMessageSet = require("domain/data/RequestMessageSet");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

//import java.util.ArrayList;
//import java.util.List;

/**
 * Investment statement request message set.
 * @see "Section 13.7.1.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
function InvestmentStatementRequestMessageSet () {

  /**
   * @name InvestmentStatementRequestMessageSet#statementRequest
   * @type InvestmentStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(InvestmentStatementRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("INVSTMTMSGSRQV1", InvestmentStatementRequestMessageSet);


InvestmentStatementRequestMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the statement request.
 *
 * @return {InvestmentStatementRequestTransaction} the request
 */
InvestmentStatementRequestMessageSet.prototype.getStatementRequest = function() {
  return statementRequest;
};
ChildAggregate.add({order: 0, owner: InvestmentStatementRequestMessageSet, /*type: InvestmentStatementRequestTransaction,*/ fcn: "getStatementRequest"});


/**
 * Sets the statement request.
 *
 * @param {InvestmentStatementRequestTransaction} statementRequest the request
 */
InvestmentStatementRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
InvestmentStatementRequestMessageSet.prototype.getRequestMessages = function() {
  ArrayList<RequestMessage> requestMessages = new ArrayList<RequestMessage>();
  if (getStatementRequest() != null) {
    requestMessages.add(getStatementRequest());
  }
  return requestMessages;
};




module.exports = InvestmentStatementRequestMessageSet;
