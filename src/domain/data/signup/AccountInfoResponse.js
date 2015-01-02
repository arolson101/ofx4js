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
var AccountProfile = require("./AccountProfile");
var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments ResponseMessage
 */
function AccountInfoResponse () {
  ResponseMessage.call(this);

  /**
   * @name AccountInfoResponse#lastUpdated
   * @type Date
   * @access private
   */
  this.lastUpdated = new Date(0);

  /**
   * @name AccountInfoResponse#accounts
   * @type Collection<AccountProfile>
   * @access private
   */
  this.accounts = null;
}

inherit(AccountInfoResponse, "extends", ResponseMessage);


Aggregate.add("ACCTINFORS", AccountInfoResponse);


AccountInfoResponse.prototype.getResponseMessageName = function() {
  return "account info";
};


/**
 * When the account info was last updated.
 *
 * @return {Date} When the account info was last updated.
 */
AccountInfoResponse.prototype.getLastUpdated = function() {
  return this.lastUpdated;
};
Element.add(AccountInfoResponse, {name: "DTACCTUP", required: true, order: 0, attributeType: Date, readMethod: "getLastUpdated", writeMethod: "setLastUpdated"});


/**
 * When the account info was last updated.
 *
 * @param {Date} lastUpdated When the account info was last updated.
 */
AccountInfoResponse.prototype.setLastUpdated = function(lastUpdated) {
  this.lastUpdated = lastUpdated;
};


/**
 * The accounts.
 *
 * @return {Collection<AccountProfile>} The accounts.
 */
AccountInfoResponse.prototype.getAccounts = function() {
  return this.accounts;
};
ChildAggregate.add(AccountInfoResponse, {order: 10, attributeType: Array, collectionEntryType: AccountProfile, readMethod: "getAccounts", writeMethod: "setAccounts"});


/**
 * The accounts.
 *
 * @param {Collection<AccountProfile>} accounts The accounts.
 */
AccountInfoResponse.prototype.setAccounts = function(accounts) {
  this.accounts = accounts;
};




module.exports = AccountInfoResponse;
