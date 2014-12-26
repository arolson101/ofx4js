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
var ProfileRequest = require("./ProfileRequest");

/**
 * @class
 * @augments TransactionWrappedRequestMessage
 */
function ProfileRequestTransaction () {

  /**
   * @name ProfileRequestTransaction#message
   * @type ProfileRequest
   * @access private
   */
  this.message = null;
}

inherit(ProfileRequestTransaction, "extends", new TransactionWrappedRequestMessage(ProfileRequest));


Aggregate.add("PROFTRNRQ", ProfileRequestTransaction);


/**
 * The wrapped message.
 *
 * @return {ProfileRequest} The wrapped message.
 */
ProfileRequestTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: ProfileRequestTransaction, /*type: ProfileRequest,*/ readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The wrapped message.
 *
 * @param {ProfileRequest} message The wrapped message.
 */
ProfileRequestTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
ProfileRequestTransaction.prototype.setWrappedMessage = function(/*ProfileRequest*/ message) {
  this.setMessage(message);
};




module.exports = ProfileRequestTransaction;
