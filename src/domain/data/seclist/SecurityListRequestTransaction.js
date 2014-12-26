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
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityListRequest = require("./SecurityListRequest");

/**
 * Security list transaction request.
 * @see "Section 13.8.2.1, OFX Spec"
 *
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function SecurityListRequestTransaction () {

  /**
   * @name SecurityListRequestTransaction#message
   * @type SecurityListRequest
   * @access private
   */
  this.message = null;
}

inherit(SecurityListRequestTransaction, "extends", new TransactionWrappedRequestMessage(SecurityListRequest));


Aggregate.add("SECLISTTRNRQ", SecurityListRequestTransaction);


/**
 * The message.
 *
 * @return {SecurityListRequest} The message.
 */
SecurityListRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add(SecurityListRequestTransaction, {required: true, order: 30, attributeType: SecurityListRequest, readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The message.
 *
 * @param {SecurityListRequest} message The message.
 *
 */
SecurityListRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
SecurityListRequestTransaction.prototype.setWrappedMessage = function(/*SecurityListRequest*/ message) {
  this.setMessage(message);
};




module.exports = SecurityListRequestTransaction;
