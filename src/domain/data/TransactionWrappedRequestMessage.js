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
 * @see "Section 2.4.6, OFX Spec"
 * @param {RequestMessage} M
 */
function TransactionWrappedRequestMessage(/*M*/) {

  /**
   * constructor
   */
  var c = function() {
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
  };

  /**
   * UID of this transaction.
   *
   * @return UID of this transaction.
   */
  c.prototype.getUID = function() {
    return this.UID;
  };
  Element.add({name: "TRNUID", required: true, order: 0, owner: c, /*type: String,*/ fcn: "getUID"});


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
  Element.add({name: "CLTCOOKIE", order: 10, owner: c, /*type: String,*/ fcn: "getClientCookie"});

  /**
   * Client cookie (echoed back by the response).
   *
   * @param {String} clientCookie Client cookie (echoed back by the response).
   */
  c.prototype.setClientCookie = function(clientCookie) {
    this.clientCookie = clientCookie;
  };

  /**
   * The transaction authorization number.
   *
   * @return {String} The transaction authorization number.
   */
  c.prototype.getTransactionAuthorizationNumber = function() {
    return this.transactionAuthorizationNumber;
  };
  Element.add({name: "TAN", order: 20, owner: c, /*type: String,*/ fcn: "getTransactionAuthorizationNumber"});

  /**
   * The transaction authorization number.
   *
   * @param {String} transactionAuthorizationNumber The transaction authorization number.
   */
  c.prototype.setTransactionAuthorizationNumber = function(transactionAuthorizationNumber) {
    this.transactionAuthorizationNumber = transactionAuthorizationNumber;
  };
  
  
  /**
   * Set the wrapped message.
   *
   * @param {M} message The wrapped message.
   */
  c.prototype.setWrappedMessage = function(/*message*/) { throw new Error("not implemented"); };


  inherit(c, 'extends', RequestMessage);
  return c;
}

module.exports = TransactionWrappedRequestMessage;
