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

var TransactionWrappedResponseMessage = require("../../TransactionWrappedResponseMessage");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var InvestmentStatementResponse = require("./InvestmentStatementResponse");

/**
 * Investment statement transaction response.
 * @see "Section 13.9.2.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function InvestmentStatementResponseTransaction () {

  /**
   * @name InvestmentStatementResponseTransaction#message
   * @type InvestmentStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(InvestmentStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(InvestmentStatementResponse));


Aggregate.add("INVSTMTTRNRS", InvestmentStatementResponseTransaction);


/**
 * Gets the the statement response message.
 *
 * @return {InvestmentStatementResponse} the statement response message.
 */
InvestmentStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(InvestmentStatementResponseTransaction, {required: true, order: 30, attributeType: InvestmentStatementResponse, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * Sets the the statement response message.
 *
 * @param {InvestmentStatementResponse} message the statement response message.
 */
InvestmentStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
InvestmentStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = InvestmentStatementResponseTransaction;
