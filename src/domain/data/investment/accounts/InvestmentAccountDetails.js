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

var inherit = require("../../../../util/inherit");

var AccountDetails = require("../../common/AccountDetails");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Aggregate for the details that identifity a brokerage account.
 *
 * @class
 * @augments AccountDetails
 * @see "OFX Spec, Section 13.6.1"
 */
function InvestmentAccountDetails () {

  /**
   * @name InvestmentAccountDetails#brokerId
   * @type String
   * @access private
   */
  this.brokerId = null;

  /**
   * @name InvestmentAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name InvestmentAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(InvestmentAccountDetails, "implements", AccountDetails);


Aggregate.add("InvestmentAccountDetails", InvestmentAccountDetails);


/**
 * Gets the broker id.
 *
 * @return {String} the id of the broker
 */
InvestmentAccountDetails.prototype.getBrokerId = function() {
  return this.brokerId;
};
Element.add({name: "BROKERID", required: true, order: 0, owner: InvestmentAccountDetails, /*type: String,*/ readMethod: "getBrokerId", writeMethod: "setBrokerId"});


/**
 * Sets the broker id.
 *
 * @param {String} brokerId the id of the broker
 */
InvestmentAccountDetails.prototype.setBrokerId = function(brokerId) {
  this.brokerId = brokerId;
};


/**
 * Gets the account number.
 *
 * @return {String} the account number
 */
InvestmentAccountDetails.prototype.getAccountNumber = function() {
  return this.accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 20, owner: InvestmentAccountDetails, /*type: String,*/ readMethod: "getAccountNumber", writeMethod: "setAccountNumber"});


/**
 * Sets the account number.
 *
 * @param {String} accountNumber the account number
 */
InvestmentAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * Gets the account key.
 *
 * @return {String} the account key
 */
InvestmentAccountDetails.prototype.getAccountKey = function() {
  return this.accountKey;
};
Element.add({name: "ACCTKEY", order: 40, owner: InvestmentAccountDetails, /*type: String,*/ readMethod: "getAccountKey", writeMethod: "setAccountKey"});


/**
 * Sets the account key.
 *
 * @param {String} accountKey the account key
 */
InvestmentAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = InvestmentAccountDetails;
