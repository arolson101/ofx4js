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

var inherit = require("../../../../util/inherit");

var InvestmentStatementRequest = require("./InvestmentStatementRequest");
var TransactionWrappedRequestMessage = require("../../TransactionWrappedRequestMessage");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");

/**
 * Investment statement transaction request.
 * See "Section 13.9.1.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function InvestmentStatementRequestTransaction () {
  TransactionWrappedRequestMessage.call(this);

  /**
   * @name InvestmentStatementRequestTransaction#message
   * @type InvestmentStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(InvestmentStatementRequestTransaction, "extends", TransactionWrappedRequestMessage);


Aggregate.add("INVSTMTTRNRQ", InvestmentStatementRequestTransaction);


/**
 * Gets the the statement request message.
 *
 * @return {InvestmentStatementRequest} the statement request message.
 */
InvestmentStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(InvestmentStatementRequestTransaction, {required: true, order: 30, attributeType: InvestmentStatementRequest, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * Sets the the statement request message.
 *
 * @param {InvestmentStatementRequest} message the statement request message.
 */
InvestmentStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
InvestmentStatementRequestTransaction.prototype.setWrappedMessage = function(/*InvestmentStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = InvestmentStatementRequestTransaction;
