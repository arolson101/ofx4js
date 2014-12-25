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

var StatementResponse = require("../common/StatementResponse");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments StatementResponse
 */
function BankStatementResponse () {

  /**
   * @name BankStatementResponse#account
   * @type BankAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(BankStatementResponse, "extends", StatementResponse);


Aggregate.add("STMTRS", BankStatementResponse);


BankStatementResponse.prototype.getResponseMessageName = function() {
  return "bank statement";
};


/**
 * The account for the statement.
 *
 * @return {BankAccountDetails} The account for the statement.
 */
BankStatementResponse.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name:"BANKACCTFROM", order: 10, owner: BankStatementResponse, /*type: BankAccountDetails,*/ fcn: "getAccount"});


/**
 * The account for the statement.
 *
 * @param {BankAccountDetails} account The account for the statement.
 */
BankStatementResponse.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = BankStatementResponse;
