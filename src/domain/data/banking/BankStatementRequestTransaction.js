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

var BankStatementRequest = require("./BankStatementRequest");
var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function BankStatementRequestTransaction () {

  /**
   * @name BankStatementRequestTransaction#message
   * @type BankStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(BankStatementRequestTransaction, "extends", new TransactionWrappedRequestMessage(BankStatementRequest));


Aggregate.add("STMTTRNRQ", BankStatementRequestTransaction);


/**
 * The message.
 *
 * @return {BankStatementRequest} The message.
 */
BankStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: BankStatementRequestTransaction, /*type: BankStatementRequest,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {BankStatementRequest} message The message.
 *
 */
BankStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
BankStatementRequestTransaction.prototype.setWrappedMessage = function(/*BankStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = BankStatementRequestTransaction;
