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

var RequestMessageSet = require("domain/data/RequestMessageSet");
var MessageSetType = require("domain/data/MessageSetType");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessageSet
 */
function SignupRequestMessageSet () {

  /**
   * @name SignupRequestMessageSet#accountInfoRequest
   * @type AccountInfoRequestTransaction
   * @access private
   */
  this.accountInfoRequest = null;
}

inherit(SignupRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SIGNUPMSGSRQV1", SignupRequestMessageSet);


SignupRequestMessageSet.prototype.getType = function() {
  return MessageSetType.signup;
};


/**
 * The account info request.
 *
 * @return {AccountInfoRequestTransaction} The account info request.
 */
SignupRequestMessageSet.prototype.getAccountInfoRequest = function() {
  return this.accountInfoRequest;
};
ChildAggregate.add({order: 0, owner: SignupRequestMessageSet, /*type: AccountInfoRequestTransaction,*/ fcn: "getAccountInfoRequest"});


/**
 * The account info request.
 *
 * @param {AccountInfoRequestTransaction} accountInfoRequest The account info request.
 */
SignupRequestMessageSet.prototype.setAccountInfoRequest = function(accountInfoRequest) {
  this.accountInfoRequest = accountInfoRequest;
};


/**
 * The request messages.
 *
 * @return {RequestMessage[]} The request messages.
 */
SignupRequestMessageSet.prototype.getRequestMessages = function() {
  var messages = [];

  if (this.getAccountInfoRequest() !== null) {
    messages.push(this.getAccountInfoRequest());
  }
  
  return messages;
};




module.exports = SignupRequestMessageSet;
