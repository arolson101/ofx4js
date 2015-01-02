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

var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var ResponseMessageSet = require("../ResponseMessageSet");
var MessageSetType = require("../MessageSetType");
var AccountInfoResponseTransaction = require("./AccountInfoResponseTransaction");

/**
 * @class
 * @augments ResponseMessageSet
 */
function SignupResponseMessageSet () {

  /**
   * @name SignupResponseMessageSet#accountInfoResponse
   * @type AccountInfoResponseTransaction
   * @access private
   */
  this.accountInfoResponse = null;
}

inherit(SignupResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SIGNUPMSGSRSV1", SignupResponseMessageSet);


SignupResponseMessageSet.prototype.getType = function() {
  return MessageSetType.signup;
};


/**
 * The account info response.
 *
 * @return {AccountInfoResponseTransaction} The account info response.
 */
SignupResponseMessageSet.prototype.getAccountInfoResponse = function() {
  return this.accountInfoResponse;
};
ChildAggregate.add(SignupResponseMessageSet, {order: 0, attributeType: AccountInfoResponseTransaction, readMethod: "getAccountInfoResponse", writeMethod: "setAccountInfoResponse"});


/**
 * The account info response.
 *
 * @param {AccountInfoResponseTransaction} accountInfoResponse The account info response.
 */
SignupResponseMessageSet.prototype.setAccountInfoResponse = function(accountInfoResponse) {
  this.accountInfoResponse = accountInfoResponse;
};


/**
 * The response messages.
 *
 * @return {ResponseMessage[]} The response messages.
 */
SignupResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getAccountInfoResponse()) {
    messages.push(this.getAccountInfoResponse());
  }

  return messages;
};




module.exports = SignupResponseMessageSet;
