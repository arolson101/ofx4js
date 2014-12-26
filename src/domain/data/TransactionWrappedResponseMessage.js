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
var Aggregate = require("../../meta/Aggregate");
var ResponseMessage = require("./ResponseMessage");

/**
 * A response message wrapped in a transaction.
 *
 * @author Ryan Heaton
 * @see "Section 2.4.6, OFX Spec"
 */
function TransactionWrappedResponseMessage(/*M*/) {

  var c = function() {
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
  };

  /**
   * UID of this transaction.
   *
   * @return {String} UID of this transaction.
   */
  c.prototype.getUID = function() {
    return this.UID;
  };
  Element.add({name: "TRNUID", required: true, order: 0, owner: c, /*type: String,*/ readMethod: "getUID", writeMethod: "setUID"});

  /**
   * UID of this transaction.
   *
   * @param {String} UID UID of this transaction.
   */
  c.prototype.setUID = function(UID) {
    this.UID = UID;
  };

  /**
   * Client cookie (echoed back by the response).
   *
   * @return {String} Client cookie (echoed back by the response).
   */
  c.prototype.getClientCookie = function() {
    return this.clientCookie;
  };
  Element.add({name: "CLTCOOKIE", order: 20, owner: c, /*type: String,*/ readMethod: "getClientCookie", writeMethod: "setClientCookie"});

  /**
   * Client cookie (echoed back by the response).
   *
   * @param {String} clientCookie Client cookie (echoed back by the response).
   */
  c.prototype.setClientCookie = function(clientCookie) {
    this.clientCookie = clientCookie;
  };

  // Inherited.
  c.prototype.getStatusHolderName = function() {
    return this.getResponseMessageName();
  };

  // Inherited.
  c.prototype.getResponseMessageName = function() {
    var name = "transaction response";
    if (this.getWrappedMessage() !== null) {
      name = this.getWrappedMessage().getResponseMessageName() + " transaction";
    }
    else if (this.getClass().isAnnotationPresent(Aggregate.class)) {
      name = this.getClass().getAnnotation(Aggregate.class).value() + " transaction";
    }

    return name;
  };

  /**
   * Status of the transaction.
   *
   * @return {Status} Status of the transaction.
   */
  c.prototype.getStatus = function() {
    return this.status;
  };
  ChildAggregate.add({required: true, order: 10, owner: c, /*type: Status,*/ readMethod: "getStatus", writeMethod: "setStatus"});

  /**
   * Status of the transaction.
   *
   * @param {Status} status Status of the transaction.
   */
  c.prototype.setStatus = function(status) {
    this.status = status;
  };

  /**
   * Get the wrapped message.
   *
   * @return The wrapped message.
   */
  c.prototype.getWrappedMessage = function() { throw new Error("not implemented"); };

  inherit(c, 'extends', ResponseMessage);
  inherit(c, 'implements', StatusHolder);
  return c;
}

module.exports = TransactionWrappedResponseMessage;
