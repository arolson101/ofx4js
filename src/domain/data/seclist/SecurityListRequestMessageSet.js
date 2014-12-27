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
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityListRequestTransaction = require("./SecurityListRequestTransaction");

/**
 * Security list request message set.
 * @see "Section 13.7.2.2.1, OFX Spec"
 *
 * @class
 * @augments RequestMessageSet
 */
function SecurityListRequestMessageSet () {

  /**
   * @name SecurityListRequestMessageSet#securityListRequest
   * @type SecurityListRequestTransaction
   * @access private
   */
  this.securityListRequest = null;
}

inherit(SecurityListRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("SECLISTMSGSRQV1", SecurityListRequestMessageSet);


SecurityListRequestMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the security list request.
 *
 * @return {SecurityListRequestTransaction} the request
 */
SecurityListRequestMessageSet.prototype.getSecurityListRequest = function() {
  return this.securityListRequest;
};
ChildAggregate.add(SecurityListRequestMessageSet, {order: 0, attributeType: SecurityListRequestTransaction, readMethod: "getSecurityListRequest", writeMethod: "setSecurityListRequest"});


/**
 * Sets the security list request.
 *
 * @param {SecurityListRequestTransaction} statementRequest the request
 */
SecurityListRequestMessageSet.prototype.setSecurityListRequest = function(statementRequest) {
  this.securityListRequest = statementRequest;
};


// Inherited.
SecurityListRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getSecurityListRequest() !== null) {
    requestMessages.push(this.getSecurityListRequest());
  }
  return requestMessages;
};




module.exports = SecurityListRequestMessageSet;
