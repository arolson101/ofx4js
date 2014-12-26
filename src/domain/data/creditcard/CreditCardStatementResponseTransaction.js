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

var CreditCardStatementResponse = require("./CreditCardStatementResponse");
var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function CreditCardStatementResponseTransaction () {

  /**
   * @name CreditCardStatementResponseTransaction#message
   * @type CreditCardStatementResponse
   * @access private
   */
  this.message = null;
}

inherit(CreditCardStatementResponseTransaction, "extends", new TransactionWrappedResponseMessage(CreditCardStatementResponse));


Aggregate.add("CCSTMTTRNRS", CreditCardStatementResponseTransaction);


/**
 * The message.
 *
 * @return {CreditCardStatementResponse} The message.
 */
CreditCardStatementResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: CreditCardStatementResponseTransaction, /*type: CreditCardStatementResponse,*/ readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The message.
 *
 * @param {CreditCardStatementResponse} message The message.
 */
CreditCardStatementResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
CreditCardStatementResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = CreditCardStatementResponseTransaction;
