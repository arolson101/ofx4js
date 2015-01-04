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

var inherit = require("../../util/inherit");

var StatusHolder = require("./common/StatusHolder");
var ChildAggregate = require("../../meta/ChildAggregate");
var Element = require("../../meta/Element");
var ResponseMessage = require("./ResponseMessage");
var Status = require("./common/Status");

/**
 * A response message wrapped in a transaction.
 *
 * @class
 * @augments ResponseMessage
 * @augments StatusHolder
 * See "Section 2.4.6, OFX Spec"
 */
function TransactionWrappedResponseMessage() {
  ResponseMessage.call(this);

  /**
   * @type String
   */
  this.UID = null;

  /**
   * @type String
   */
  this.clientCookie = null;

  /**
   * @type Status
   */
  this.status = null;
}

inherit(TransactionWrappedResponseMessage, "extends", ResponseMessage);
inherit(TransactionWrappedResponseMessage, "implements", StatusHolder);


/**
 * UID of this transaction.
 *
 * @return {String} UID of this transaction.
 */
TransactionWrappedResponseMessage.prototype.getUID = function() {
  return this.UID;
};
Element.add(TransactionWrappedResponseMessage, {name: "TRNUID", required: true, order: 0, attributeType: String, readMethod: "getUID", writeMethod: "setUID"});

/**
 * UID of this transaction.
 *
 * @param {String} UID UID of this transaction.
 */
TransactionWrappedResponseMessage.prototype.setUID = function(UID) {
  this.UID = UID;
};

/**
 * Client cookie (echoed back by the response).
 *
 * @return {String} Client cookie (echoed back by the response).
 */
TransactionWrappedResponseMessage.prototype.getClientCookie = function() {
  return this.clientCookie;
};
Element.add(TransactionWrappedResponseMessage, {name: "CLTCOOKIE", order: 20, attributeType: String, readMethod: "getClientCookie", writeMethod: "setClientCookie"});

/**
 * Client cookie (echoed back by the response).
 *
 * @param {String} clientCookie Client cookie (echoed back by the response).
 */
TransactionWrappedResponseMessage.prototype.setClientCookie = function(clientCookie) {
  this.clientCookie = clientCookie;
};

// Inherited.
TransactionWrappedResponseMessage.prototype.getStatusHolderName = function() {
  return this.getResponseMessageName();
};

// Inherited.
TransactionWrappedResponseMessage.prototype.getResponseMessageName = function() {
  var name = "transaction response";
  if (this.getWrappedMessage()) {
    name = this.getWrappedMessage().getResponseMessageName() + " transaction";
  }
  else {
    var AggregateIntrospector = require("../../io/AggregateIntrospector");
    var aggregateName = AggregateIntrospector.getAggregateName(this.constructor);
    if (aggregateName) {
      name = aggregateName + " transaction";
    }
  }

  return name;
};

/**
 * Status of the transaction.
 *
 * @return {Status} Status of the transaction.
 */
TransactionWrappedResponseMessage.prototype.getStatus = function() {
  return this.status;
};
ChildAggregate.add(TransactionWrappedResponseMessage, {required: true, order: 10, attributeType: Status, readMethod: "getStatus", writeMethod: "setStatus"});

/**
 * Status of the transaction.
 *
 * @param {Status} status Status of the transaction.
 */
TransactionWrappedResponseMessage.prototype.setStatus = function(status) {
  this.status = status;
};

/**
 * Get the wrapped message.
 *
 * @return The wrapped message.
 */
TransactionWrappedResponseMessage.prototype.getWrappedMessage = function() { throw new Error("not implemented"); };

module.exports = TransactionWrappedResponseMessage;
