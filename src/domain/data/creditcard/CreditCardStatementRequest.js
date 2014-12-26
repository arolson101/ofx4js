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

var StatementRequest = require("../common/StatementRequest");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments StatementRequest
 */
function CreditCardStatementRequest () {

  /**
   * @name CreditCardStatementRequest#account
   * @type CreditCardAccountDetails
   * @access private
   */
  this.account = null;
}

inherit(CreditCardStatementRequest, "extends", StatementRequest);


Aggregate.add("CCSTMTRQ", CreditCardStatementRequest);


/**
 * The account details.
 *
 * @return {CreditCardAccountDetails} The account details.
 */
CreditCardStatementRequest.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add({name: "CCACCTFROM", required: true, order: 0, owner: CreditCardStatementRequest, /*type: CreditCardAccountDetails,*/ readMethod: "getAccount", writeMethod: "setAccount"});


/**
 * The account details.
 *
 * @param {CreditCardAccountDetails} account The account details.
 */
CreditCardStatementRequest.prototype.setAccount = function(account) {
  this.account = account;
};




module.exports = CreditCardStatementRequest;
