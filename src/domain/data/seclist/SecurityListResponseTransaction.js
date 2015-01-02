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
var SecurityListResponse = require("./SecurityListResponse");

/**
 * Security list transaction response.
 * @see "Section 13.8.3.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function SecurityListResponseTransaction () {
  TransactionWrappedResponseMessage.call(this);

  /**
   * @name SecurityListResponseTransaction#message
   * @type SecurityListResponse
   * @access private
   */
  this.message = null;
}

inherit(SecurityListResponseTransaction, "extends", TransactionWrappedResponseMessage);


Aggregate.add("SECLISTTRNRS", SecurityListResponseTransaction);


/**
 * The message.
 *
 * @return {SecurityListResponse} The message.
 */
SecurityListResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(SecurityListResponseTransaction, {required: true, order: 30, attributeType: SecurityListResponse, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The message.
 *
 * @param {SecurityListResponse} message The message.
 */
SecurityListResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
SecurityListResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = SecurityListResponseTransaction;
