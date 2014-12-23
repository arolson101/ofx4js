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

var Element = require("meta/Element");
var Aggregate = require("meta/Aggregate");
var AccountDetails = require("domain/data/common/AccountDetails");

/**
 * @author Ryan Heaton
 * 
 * @see "OFX Spec, Section 11.3.2"
 */
function CreditCardAccountDetails () {

  /**
   * @name CreditCardAccountDetails#accountNumber
   * @type String
   * @access private
   */
  this.accountNumber = null;

  /**
   * @name CreditCardAccountDetails#accountKey
   * @type String
   * @access private
   */
  this.accountKey = null;
}

inherit(CreditCardAccountDetails, "implements", AccountDetails);


Aggregate.add("CreditCardAccountDetails", CreditCardAccountDetails);


/**
 * The account number.
 *
 * @return {String} The account number.
 */
CreditCardAccountDetails.prototype.getAccountNumber = function() {
  return accountNumber;
};
Element.add({name: "ACCTID", required: true, order: 0, owner: CreditCardAccountDetails, /*type: String,*/ fcn: "getAccountNumber"});


/**
 * The account number.
 *
 * @param {String} accountNumber The account number.
 */
CreditCardAccountDetails.prototype.setAccountNumber = function(accountNumber) {
  this.accountNumber = accountNumber;
};


/**
 * The account key.
 *
 * @return {String} The account key.
 */
CreditCardAccountDetails.prototype.getAccountKey = function() {
  return accountKey;
};
Element.add({name: "ACCKEY", order: 10, owner: CreditCardAccountDetails, /*type: String,*/ fcn: "getAccountKey"});


/**
 * The account key.
 *
 * @param {String} accountKey The account key.
 */
CreditCardAccountDetails.prototype.setAccountKey = function(accountKey) {
  this.accountKey = accountKey;
};




module.exports = CreditCardAccountDetails;
