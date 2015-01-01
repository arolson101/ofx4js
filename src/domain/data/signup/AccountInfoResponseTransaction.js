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

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var AccountInfoResponse = require("./AccountInfoResponse");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function AccountInfoResponseTransaction () {
  TransactionWrappedResponseMessage.apply(this, arguments);

  /**
   * @name AccountInfoResponseTransaction#message
   * @type AccountInfoResponse
   * @access private
   */
  this.message = null;
}

inherit(AccountInfoResponseTransaction, "extends", TransactionWrappedResponseMessage);


Aggregate.add("ACCTINFOTRNRS", AccountInfoResponseTransaction);


/**
 * The wrapped message.
 *
 * @return {AccountInfoResponse} The wrapped message.
 */
AccountInfoResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(AccountInfoResponseTransaction, {required: true, order: 30, attributeType: AccountInfoResponse, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The wrapped message.
 *
 * @param {AccountInfoResponse} message The wrapped message.
 */
AccountInfoResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
AccountInfoResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = AccountInfoResponseTransaction;
