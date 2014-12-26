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

var CreditCardStatementRequest = require("./CreditCardStatementRequest");
var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function CreditCardStatementRequestTransaction () {

  /**
   * @name CreditCardStatementRequestTransaction#message
   * @type CreditCardStatementRequest
   * @access private
   */
  this.message = null;
}

inherit(CreditCardStatementRequestTransaction, "extends", new TransactionWrappedRequestMessage(CreditCardStatementRequest));


Aggregate.add("CCSTMTTRNRQ", CreditCardStatementRequestTransaction);


/**
 * The message.
 *
 * @return {CreditCardStatementRequest} The message.
 */
CreditCardStatementRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(CreditCardStatementRequestTransaction, {required: true, order: 30, attributeType: CreditCardStatementRequest, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The message.
 *
 * @param {CreditCardStatementRequest} message The message.
 *
 */
CreditCardStatementRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
CreditCardStatementRequestTransaction.prototype.setWrappedMessage = function(/*CreditCardStatementRequest*/ message) {
  this.setMessage(message);
};




module.exports = CreditCardStatementRequestTransaction;
