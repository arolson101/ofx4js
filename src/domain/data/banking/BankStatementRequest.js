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

var StatementRequest = require("domain/data/common/StatementRequest");
var ChildAggregate = require("meta/ChildAggregate");
var Aggregate = require("meta/Aggregate");

/**
 * @author Ryan Heaton
 */
function BankStatementRequest () {

  /**
   * @name BankStatementRequest#account
   * @type BankAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(BankStatementRequest, "extends", StatementRequest);


Aggregate.add("STMTRQ", BankStatementRequest);


/**
 * The account details.
 *
 * @return {BankAccountDetails} The account details.
 */
BankStatementRequest.prototype.getAccount = function() {
  return account;
};
ChildAggregate.add({name: "BANKACCTFROM", required: true, order: 0, owner: BankStatementRequest, /*type: BankAccountDetails,*/ fcn: "getAccount"});


/**
 * The account details.
 *
 * @param {BankAccountDetails} account The account details.
 */
BankStatementRequest.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = BankStatementRequest;
