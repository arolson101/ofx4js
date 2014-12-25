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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 */
function TransactionList () {

  /**
   * @name TransactionList#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name TransactionList#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name TransactionList#transactions
   * @type List<Transaction>
   * @access private
   */
  this.transactions = null;
}



Aggregate.add("BANKTRANLIST", TransactionList);


/**
 * The start date.
 *
 * @return {Date} The start date.
 */
TransactionList.prototype.getStart = function() {
  return this.start;
};
Element.add({name: "DTSTART", required: true, order: 0, owner: TransactionList, /*type: Date,*/ fcn: "getStart"});


/**
 * The start date.
 *
 * @param {Date} start The start date.
 */
TransactionList.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * The end date.
 *
 * @return {Date} The end date.
 */
TransactionList.prototype.getEnd = function() {
  return this.end;
};
Element.add({name: "DTEND", required: true, order: 10, owner: TransactionList, /*type: Date,*/ fcn: "getEnd"});


/**
 * The end date.
 *
 * @param {Date} end The end date.
 */
TransactionList.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * The transaction list.
 *
 * @return {Transaction[]} The transaction list.
 */
TransactionList.prototype.getTransactions = function() {
  return this.transactions;
};
ChildAggregate.add({order: 20, owner: TransactionList, /*type: Transaction[],*/ fcn: "getTransactions"});


/**
 * The transaction list.
 *
 * @param {Transaction[]} transactions The transaction list.
 */
TransactionList.prototype.setTransactions = function(transactions) {
  this.transactions = transactions;
};




module.exports = TransactionList;
