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
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var ProfileResponse = require("./ProfileResponse");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function ProfileResponseTransaction () {

  /**
   * @name ProfileResponseTransaction#message
   * @type ProfileResponse
   * @access private
   */
  this.message = null;
}

inherit(ProfileResponseTransaction, "extends", new TransactionWrappedResponseMessage(ProfileResponse));


Aggregate.add("PROFTRNRS", ProfileResponseTransaction);


/**
 * The message.
 *
 * @return {ProfileResponse} The message.
 */
ProfileResponseTransaction.prototype.getMessage = function() {
  return this.message;
};
ChildAggregate.add({required: true, order: 30, owner: ProfileResponseTransaction, /*type: ProfileResponse,*/ readMethod: "getMessage", writeMethod: "setMessage"});


/**
 * The message.
 *
 * @param {ProfileResponse} message The message.
 */
ProfileResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
ProfileResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getMessage();
};




module.exports = ProfileResponseTransaction;
