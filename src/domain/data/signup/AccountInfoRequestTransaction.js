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

var TransactionWrappedRequestMessage = require("../TransactionWrappedRequestMessage");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var AccountInfoRequest = require("./AccountInfoRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function AccountInfoRequestTransaction () {
  TransactionWrappedRequestMessage.call(this);

  /**
   * @name AccountInfoRequestTransaction#message
   * @type AccountInfoRequest
   * @access private
   */
  this.message = null;
}

inherit(AccountInfoRequestTransaction, "extends", TransactionWrappedRequestMessage);


Aggregate.add("ACCTINFOTRNRQ", AccountInfoRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {AccountInfoRequest} The wrapped message.
 */
AccountInfoRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(AccountInfoRequestTransaction, {required: true, order: 30, attributeType: AccountInfoRequest, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The wrapped message.
 *
 * @param {AccountInfoRequest} message The wrapped message.
 */
AccountInfoRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
AccountInfoRequestTransaction.prototype.setWrappedMessage = function(/*AccountInfoRequest*/ message) {
  this.setMessage(message);
};




module.exports = AccountInfoRequestTransaction;
