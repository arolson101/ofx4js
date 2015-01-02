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
var PasswordChangeRequest = require("./PasswordChangeRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function PasswordChangeRequestTransaction () {
  TransactionWrappedRequestMessage.call(this);

  /**
   * @name PasswordChangeRequestTransaction#message
   * @type PasswordChangeRequest
   * @access private
   */
  this.message = null;
}

inherit(PasswordChangeRequestTransaction, "extends", TransactionWrappedRequestMessage);


Aggregate.add("PINCHTRNRQ", PasswordChangeRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {PasswordChangeRequest} The wrapped message.
 */
PasswordChangeRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(PasswordChangeRequestTransaction, {required: true, order: 30, attributeType: PasswordChangeRequest, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The wrapped message.
 *
 * @param {PasswordChangeRequest} message The wrapped message.
 */
PasswordChangeRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
PasswordChangeRequestTransaction.prototype.setWrappedMessage = function(/*PasswordChangeRequest*/ message) {
  this.setMessage(message);
};




module.exports = PasswordChangeRequestTransaction;
