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

var BankStatementResponse = require("./BankStatementResponse");
var TransactionWrappedResponseMessage = require("domain/data/TransactionWrappedResponseMessage");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function BankStatementResponseTransaction () {

  /**
   * @name BankStatementResponseTransaction#message
   * @type BankStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(BankStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(BankStatementResponse));


Aggregate.add("STMTTRNRS", BankStatementResponseTransaction);


/**
 * The message.
 *
 * @return {BankStatementResponse} The message.
 */
BankStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: BankStatementResponseTransaction, /*type: BankStatementResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {BankStatementResponse} message The message.
 */
BankStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
BankStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = BankStatementResponseTransaction;
