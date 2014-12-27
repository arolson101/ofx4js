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

var MessageSetType = require("../../MessageSetType");
var ResponseMessageSet = require("../../ResponseMessageSet");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var InvestmentStatementResponseTransaction = require("./InvestmentStatementResponseTransaction");

/**
 * Investment statement response message set.
 * @see "Section 13.7.1.2.2, OFX Spec"
 *
 * @class
 * @augments ResponseMessageSet
 */
function InvestmentStatementResponseMessageSet () {

  /**
   * @name InvestmentStatementResponseMessageSet#statementResponses
   * @type List<InvestmentStatementResponseTransaction>
   * @access private
   */
  this.statementResponses = null;
}

inherit(InvestmentStatementResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("INVSTMTMSGSRSV1", InvestmentStatementResponseMessageSet);


InvestmentStatementResponseMessageSet.prototype.getType = function() {
  return MessageSetType.investment;
};


/**
 * Gets the statement response list. Most OFX files have a single statement response.
 *
 * @return {InvestmentStatementResponseTransaction[]} the statement response list
 */
InvestmentStatementResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add(InvestmentStatementResponseMessageSet, {order: 0, attributeType: Array, collectionEntryType: InvestmentStatementResponseTransaction, readMethod: "getStatementResponses", writeMethod: "setStatementResponses"});


/**
 * Sets the statement reponse list. Most OFX files have a single statement response.
 *
 * @param {InvestmentStatementResponseTransaction[]} statementResponses the statement response list
 */
InvestmentStatementResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


/**
 * Gets the first statement response. Use getStatementResponses() if you are expecting multiple
 * responses.
 *
 * @return {InvestmentStatementResponseTransaction} the first investment statement response.
 */
InvestmentStatementResponseMessageSet.prototype.getStatementResponse = function() {
  return this.statementResponses === null || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


/**
 * Sets the statement response if there is a single response.
 *
 * @param {InvestmentStatementResponseTransaction} statementResponse The statement response.
 */
InvestmentStatementResponseMessageSet.prototype.setStatementResponse = function(statementResponse) {
  this.statementResponses = [statementResponse];
};


// Inherited.
InvestmentStatementResponseMessageSet.prototype.getResponseMessages = function() {
  return this.statementResponses;
};




module.exports = InvestmentStatementResponseMessageSet;
