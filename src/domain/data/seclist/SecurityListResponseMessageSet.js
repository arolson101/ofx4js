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
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityListResponseTransaction = require("./SecurityListResponseTransaction");
var SecurityList = require("./SecurityList");

/**
 * @class
 * @augments ResponseMessageSet
 */
function SecurityListResponseMessageSet () {
  ResponseMessageSet.call(this);

  /**
   * @name SecurityListResponseMessageSet#securityListResponse
   * @type SecurityListResponseTransaction
   * @access private
   */
  this.securityListResponse = null;

  /**
   * @name SecurityListResponseMessageSet#securityList
   * @type SecurityList
   * @access private
   */
  this.securityList = null;
}

inherit(SecurityListResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("SECLISTMSGSRSV1", SecurityListResponseMessageSet);


SecurityListResponseMessageSet.prototype.getType = function() {
  return MessageSetType.investment_security;
};


/**
 * The security list response list transaction.
 *
 * Most OFX files have a single security response.
 *
 * @return {SecurityListResponseTransaction} The security list response list.
 */
SecurityListResponseMessageSet.prototype.getSecurityListResponse = function() {
  return this.securityListResponse;
};
ChildAggregate.add(SecurityListResponseMessageSet, {order: 0, attributeType: SecurityListResponseTransaction, readMethod: "getSecurityListResponse", writeMethod: "setSecurityListResponse"});


/**
 * The security list response.
 *
 * @param {SecurityListResponseTransaction} securityListResponse The security list response.
 */
SecurityListResponseMessageSet.prototype.setSecurityListResponse = function(securityListResponse) {
  this.securityListResponse = securityListResponse;
};


SecurityListResponseMessageSet.prototype.getSecurityList = function() {
  return this.securityList;
};
ChildAggregate.add(SecurityListResponseMessageSet, {order: 10, attributeType: SecurityList, readMethod: "getSecurityList", writeMethod: "setSecurityList"});


SecurityListResponseMessageSet.prototype.setSecurityList = function(/*SecurityList*/ securityList) {
  this.securityList = securityList;
};


// Inherited.
SecurityListResponseMessageSet.prototype.getResponseMessages = function() {
  var ret = [];
  ret.push(this.securityListResponse);
  return ret;
};




module.exports = SecurityListResponseMessageSet;
