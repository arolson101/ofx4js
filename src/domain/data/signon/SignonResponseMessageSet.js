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

var MessageSetType = require("../MessageSetType");
var ResponseMessageSet = require("../ResponseMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var SignonResponse = require("./SignonResponse");
var PasswordChangeResponseTransaction = require("./PasswordChangeResponseTransaction");

/**
 * The sign-on response message set.
 *
 * @class
 * @augments ResponseMessageSet
 * @see "Section 2.5, OFX Spec."
 */
function SignonResponseMessageSet () {
  ResponseMessageSet.call(this);

  /**
   * @name SignonResponseMessageSet#signonResponse
   * @type SignonResponse
   * @access private
   */
  this.signonResponse = null;

  /**
   * @name SignonResponseMessageSet#passwordChangeResponse
   * @type PasswordChangeResponseTransaction
   * @access private
   */
  this.passwordChangeResponse = null;
}

inherit(SignonResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SIGNONMSGSRSV1", SignonResponseMessageSet);


SignonResponseMessageSet.prototype.getType = function() {
  return MessageSetType.signon;
};


/**
 * The message for this message set.
 *
 * @return {SignonResponse} The message for this message set.
 */
SignonResponseMessageSet.prototype.getSignonResponse = function() {
  return this.signonResponse;
};
ChildAggregate.add(SignonResponseMessageSet, {order: 0, attributeType: SignonResponse, readMethod: "getSignonResponse", writeMethod: "setSignonResponse"});


/**
 * The message for this message set.
 *
 * @param {SignonResponse} signonResponse The message for this message set.
 */
SignonResponseMessageSet.prototype.setSignonResponse = function(signonResponse) {
  this.signonResponse = signonResponse;
};


/**
 * The password change response.
 *
 * @return {PasswordChangeResponseTransaction} The password change response.
 */
SignonResponseMessageSet.prototype.getPasswordChangeResponse = function() {
  return this.passwordChangeResponse;
};
ChildAggregate.add(SignonResponseMessageSet, {order: 10, attributeType: PasswordChangeResponseTransaction, readMethod: "getPasswordChangeResponse", writeMethod: "setPasswordChangeResponse"});


/**
 * The password change response.
 *
 * @param {PasswordChangeResponseTransaction} passwordChangeResponse The password change response.
 */
SignonResponseMessageSet.prototype.setPasswordChangeResponse = function(passwordChangeResponse) {
  this.passwordChangeResponse = passwordChangeResponse;
};


//todo: challenge request/response
// Inherited.
SignonResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getSignonResponse()) {
    messages.push(this.getSignonResponse());
  }

  return messages;
};




module.exports = SignonResponseMessageSet;
