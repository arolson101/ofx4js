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
function Tax1099ResponseMessageSet () {

  /**
   * @name Tax1099ResponseMessageSet#taxResponseTransaction
   * @type List<Tax1099ResponseTransaction>
   * @access private
   */
  this.taxResponseTransaction = null;
}

inherit(Tax1099ResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("TAX1099MSGSRSV1", Tax1099ResponseMessageSet);


Tax1099ResponseMessageSet.prototype.getType = function() {
  return MessageSetType.tax1099;
};


/**
 * The taxResponseTransaction list.
 *
 * Most OFX files have a single statement response, except MT2OFX
 * which outputs OFX with multiple statement responses
 * in a single banking response message set.
 *
 * @return {Tax1099ResponseTransaction[]} The taxResponseTransaction list.
 */
Tax1099ResponseMessageSet.prototype.getTaxResponseTransaction = function() {
  return this.taxResponseTransaction;
};
ChildAggregate.add({order: 0, owner: Tax1099ResponseMessageSet, /*type: Tax1099ResponseTransaction[],*/ readMethod: "getTaxResponseTransaction", writeMethod: "setTaxResponseTransaction"});


/**
 * The taxResponseTransaction.
 *
 * @param {Tax1099ResponseTransaction[]} taxResponseTransaction The statement responses.
 */
Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction = function(taxResponseTransaction) {
  this.taxResponseTransaction = taxResponseTransaction;
};


// Inherited.
Tax1099ResponseMessageSet.prototype.getResponseMessages = function() {
  return this.taxResponseTransaction;
};


/**
 * The first statement response.
 *
 * @return {Tax1099ResponseTransaction} the first bank statement response.
 * @deprecated Use getStatementResponses() because sometimes there are multiple responses
 */
Tax1099ResponseMessageSet.prototype.getStatementResponse = function() {
  return this.taxResponseTransaction === null || this.taxResponseTransaction.isEmpty() ? null : this.taxResponseTransaction.get(0);
};


Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction = function(/*Tax1099ResponseTransaction*/ taxResponseTransaction) {
  this.taxResponseTransaction = taxResponseTransaction;
};




module.exports = Tax1099ResponseMessageSet;
