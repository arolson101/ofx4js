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
var CreditCardStatementResponseTransaction = require("./CreditCardStatementResponseTransaction");

/**
 * @class
 * @augments ResponseMessageSet
 */
function CreditCardResponseMessageSet () {
  ResponseMessageSet.call(this);

  /**
   * @name CreditCardResponseMessageSet#statementResponses
   * @type CreditCardStatementResponseTransaction[]
   * @access private
   */
  this.statementResponses = null;
}

inherit(CreditCardResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("CREDITCARDMSGSRSV1", CreditCardResponseMessageSet);


CreditCardResponseMessageSet.prototype.getType = function() {
  return MessageSetType.creditcard;
};


/**
 * The statement response list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {CreditCardStatementResponseTransaction[]} The statement response list.
 */
CreditCardResponseMessageSet.prototype.getStatementResponses = function() {
  return this.statementResponses;
};
ChildAggregate.add(CreditCardResponseMessageSet, {order: 0, attributeType: Array, collectionEntryType: CreditCardStatementResponseTransaction, readMethod: "getStatementResponses", writeMethod: "setStatementResponses"});


/**
 * The statement reponse list.
 *
 * @param {CreditCardStatementResponseTransaction[]} statementResponses The statement response list.
 */
CreditCardResponseMessageSet.prototype.setStatementResponses = function(statementResponses) {
  this.statementResponses = statementResponses;
};


/**
 * The first statement response.
 *
 * @return {CreditCardStatementResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
CreditCardResponseMessageSet.prototype.getStatementResponse = function() {
  return !this.statementResponses || this.statementResponses.length === 0 ? null : this.statementResponses[0];
};


/**
 * The statement response.
 *
 * @param {CreditCardStatementResponseTransaction} statementResponse The statement response.
 */
CreditCardResponseMessageSet.prototype.setStatementResponse = function(statementResponse) {
  this.statementResponses = [statementResponse];
};


// Inherited.
CreditCardResponseMessageSet.prototype.getResponseMessages = function() {
  return this.statementResponses;
};




module.exports = CreditCardResponseMessageSet;
