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

var inherit = require("../../../util/inherit");

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments CreditCardRequestMessageSet
 */
function CreditCardRequestMessageSet () {

  /**
   * @name CreditCardRequestMessageSet#statementRequest
   * @type CreditCardStatementRequestTransaction
   * @access private
   */
  this.statementRequest = null;
}

inherit(CreditCardRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("CREDITCARDMSGSRQV1", CreditCardRequestMessageSet);


CreditCardRequestMessageSet.prototype.getType = function() {
  return MessageSetType.creditcard;
};


/**
 * The request.
 *
 * @return {CreditCardStatementRequestTransaction} The request.
 */
CreditCardRequestMessageSet.prototype.getStatementRequest = function() {
  return this.statementRequest;
};
ChildAggregate.add({order: 0, owner: CreditCardRequestMessageSet, /*type: CreditCardStatementRequestTransaction,*/ readMethod: "getStatementRequest", writeMethod: "setStatementRequest"});


/**
 * The request.
 *
 * @param {CreditCardStatementRequestTransaction} statementRequest The request.
 */
CreditCardRequestMessageSet.prototype.setStatementRequest = function(statementRequest) {
  this.statementRequest = statementRequest;
};


// Inherited.
CreditCardRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getStatementRequest() !== null) {
    requestMessages.push(this.getStatementRequest());
  }
  return requestMessages;
};




module.exports = CreditCardRequestMessageSet;
