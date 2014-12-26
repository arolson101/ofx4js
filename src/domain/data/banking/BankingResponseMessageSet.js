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

/**
 * @class
 * @augments ResponseMessageSet
 */
function BankingResponseMessageSet () {

  /**
   * @name BankingResponseMessageSet#statementResponses
   * @type List<BankStatementResponseTransaction>
   * @access private
   */
  this.statementResponses = null;
}

inherit(BankingResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("BANKMSGSRSV1", BankingResponseMessageSet);


BankingResponseMessageSet.prototype.getType = function() {
  return MessageSetType.banking;
};


/**
 * The statement response list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {BankStatementResponseTransaction[]} The statement response list.
 */
BankingResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add({order: 0, owner: BankingResponseMessageSet, /*type: BankStatementResponseTransaction[],*/ readMethod: "getStatementResponses", writeMethod: "setStatementResponses"});


/**
 * The statement response.
 *
 * @param {BankStatementResponseTransaction[]} statementResponses The statement responses.
 */
BankingResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


// Inherited.
BankingResponseMessageSet.prototype.getResponseMessages = function() {
  return [this.statementResponses];
};


/**
 * The first statement response.
 *
 * @return {BankStatementResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
BankingResponseMessageSet.prototype.getStatementResponse = function() {
  return this.statementResponses === null || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


BankingResponseMessageSet.prototype.setStatementResponse = function(/*BankStatementResponseTransaction*/ statementResponse) {
  this.statementResponses = [statementResponse];
};




module.exports = BankingResponseMessageSet;
