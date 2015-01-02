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
var RequestMessageSet = require("../RequestMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var SignonRequest = require("./SignonRequest");
var PasswordChangeRequestTransaction = require("./PasswordChangeRequestTransaction");

/**
 * The sign-on request message set.
 *
 * @class
 * @augments RequestMessageSet
 * @see "Section 2.5, OFX Spec."
 */
function SignonRequestMessageSet () {

  /**
   * @name SignonRequestMessageSet#signonRequest
   * @type SignonRequest
   * @access private
   */
  this.signonRequest = null;

  /**
   * @name SignonRequestMessageSet#passwordChangeRequest
   * @type PasswordChangeRequestTransaction
   * @access private
   */
  this.passwordChangeRequest = null;
}

inherit(SignonRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SIGNONMSGSRQV1", SignonRequestMessageSet);


SignonRequestMessageSet.prototype.getType = function() {
  return MessageSetType.signon;
};


/**
 * The message for this message set.
 *
 * @return {SignonRequest} The message for this message set.
 */
SignonRequestMessageSet.prototype.getSignonRequest = function() {
  return this.signonRequest;
};
ChildAggregate.add(SignonRequestMessageSet, {required: true, order: 0, attributeType: SignonRequest, readMethod: "getSignonRequest", writeMethod: "setSignonRequest"});


/**
 * The message for this message set.
 *
 * @param {SignonRequest} signonRequest The message for this message set.
 */
SignonRequestMessageSet.prototype.setSignonRequest = function(signonRequest) {
  this.signonRequest = signonRequest;
};


/**
 * The password change request.
 *
 * @return {PasswordChangeRequestTransaction} The password change request.
 */
SignonRequestMessageSet.prototype.getPasswordChangeRequest = function() {
  return this.passwordChangeRequest;
};
ChildAggregate.add(SignonRequestMessageSet, {order: 10, attributeType: PasswordChangeRequestTransaction, readMethod: "getPasswordChangeRequest", writeMethod: "setPasswordChangeRequest"});


/**
 * The password change request.
 *
 * @param {PasswordChangeRequestTransaction} passwordChangeRequest The password change request.
 */
SignonRequestMessageSet.prototype.setPasswordChangeRequest = function(passwordChangeRequest) {
  this.passwordChangeRequest = passwordChangeRequest;
};


//todo: challenge request/response
// Inherited.
SignonRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];

  if (this.getSignonRequest()) {
    requestMessages.push(this.getSignonRequest());
  }

  if (this.getPasswordChangeRequest()) {
    requestMessages.this(this.getPasswordChangeRequest());
  }

  return requestMessages;
};




module.exports = SignonRequestMessageSet;
