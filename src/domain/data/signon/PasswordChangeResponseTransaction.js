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

var TransactionWrappedResponseMessage = require("domain/data/TransactionWrappedResponseMessage");
var ChildAggregate = require("meta/ChildAggregate");
var Aggregate = require("meta/Aggregate");

/**
 * @author Ryan Heaton
 */
function PasswordChangeResponseTransaction () {

  /**
   * @name PasswordChangeResponseTransaction#message
   * @type PasswordChangeResponse
   * @access private
   */
  this.message = null;
}

inherit(PasswordChangeResponseTransaction, "extends", new TransactionWrappedResponseMessage(PasswordChangeResponse));


Aggregate.add("PINCHTRNRS", PasswordChangeResponseTransaction);


/**
 * The message.
 *
 * @return {PasswordChangeResponse} The message.
 */
PasswordChangeResponseTransaction.prototype.getMessage = function() {
  return message;
};
ChildAggregate.add({required: true, order: 30, owner: PasswordChangeResponseTransaction, /*type: PasswordChangeResponse,*/ fcn: "getMessage"});


/**
 * The message.
 *
 * @param {PasswordChangeResponse} message The message.
 */
PasswordChangeResponseTransaction.prototype.setMessage = function(message) {
  this.message = message;
};


// Inherited.
PasswordChangeResponseTransaction.prototype.getWrappedMessage = function() {
  return getMessage();
};




module.exports = PasswordChangeResponseTransaction;
