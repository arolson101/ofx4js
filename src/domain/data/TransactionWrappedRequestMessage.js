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

var Element = require("../../meta/Element");
var UUID = require("uuid");
var RequestMessage = require("./ResponseMessage");

/**
 * A request message wrapped in a transaction.
 *
 * @class
 * See "Section 2.4.6, OFX Spec"
 */
function TransactionWrappedRequestMessage() {
  RequestMessage.call(this);

  var UID;
  if(arguments.length === 1) {
    UID = arguments[0];
  } else {
    UID = UUID.v4();
  }

  /**
   * @type String
   */
  this.UID = UID;

  /**
   * @type String
   */
  this.clientCookie = null;

  /**
   * @type String
   */
  this.transactionAuthorizationNumber = null;
}

inherit(TransactionWrappedRequestMessage, "extends", RequestMessage);


/**
 * UID of this transaction.
 *
 * @return UID of this transaction.
 */
TransactionWrappedRequestMessage.prototype.getUID = function() {
  return this.UID;
};
Element.add(TransactionWrappedRequestMessage, {name: "TRNUID", required: true, order: 0, attributeType: String, readMethod: "getUID", writeMethod: "setUID"});


/**
 * UID of this transaction.
 *
 * @param {String} UID UID of this transaction.
 */
TransactionWrappedRequestMessage.prototype.setUID = function(UID) {
  this.UID = UID;
};

/**
 * Client cookie (echoed back by the response).
 *
 * @return {String} Client cookie (echoed back by the response).
 */
TransactionWrappedRequestMessage.prototype.getClientCookie = function() {
  return this.clientCookie;
};
Element.add(TransactionWrappedRequestMessage, {name: "CLTCOOKIE", order: 10, attributeType: String, readMethod: "getClientCookie", writeMethod: "setClientCookie"});

/**
 * Client cookie (echoed back by the response).
 *
 * @param {String} clientCookie Client cookie (echoed back by the response).
 */
TransactionWrappedRequestMessage.prototype.setClientCookie = function(clientCookie) {
  this.clientCookie = clientCookie;
};

/**
 * The transaction authorization number.
 *
 * @return {String} The transaction authorization number.
 */
TransactionWrappedRequestMessage.prototype.getTransactionAuthorizationNumber = function() {
  return this.transactionAuthorizationNumber;
};
Element.add(TransactionWrappedRequestMessage, {name: "TAN", order: 20, attributeType: String, readMethod: "getTransactionAuthorizationNumber", writeMethod: "setTransactionAuthorizationNumber"});

/**
 * The transaction authorization number.
 *
 * @param {String} transactionAuthorizationNumber The transaction authorization number.
 */
TransactionWrappedRequestMessage.prototype.setTransactionAuthorizationNumber = function(transactionAuthorizationNumber) {
  this.transactionAuthorizationNumber = transactionAuthorizationNumber;
};


/**
 * Set the wrapped message.
 *
 * @param {M} message The wrapped message.
 */
TransactionWrappedRequestMessage.prototype.setWrappedMessage = function(/*message*/) { throw new Error("not implemented"); };



module.exports = TransactionWrappedRequestMessage;
