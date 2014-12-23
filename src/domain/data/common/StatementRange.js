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

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * @author Ryan Heaton
 */
function StatementRange () {

  /**
   * @name StatementRange#start
   * @type Date
   * @access private
   */
  this.start = null;

  /**
   * @name StatementRange#end
   * @type Date
   * @access private
   */
  this.end = null;

  /**
   * @name StatementRange#includeTransactions
   * @type Boolean
   * @access private
   */
  this.includeTransactions = Boolean.TRUE;
}



Aggregate.add("INCTRAN", StatementRange);


/**
 * The start of the statement range.
 *
 * @return {Date} The start of the statement range.
 */
StatementRange.prototype.getStart = function() {
  return start;
};
Element.add({name: "DTSTART", order: 0, owner: StatementRange, /*type: Date,*/ fcn: "getStart"});


/**
 * The start of the statement range.
 *
 * @param {Date} start The start of the statement range.
 */
StatementRange.prototype.setStart = function(start) {
  this.start = start;
};


/**
 * The end of the statement range.
 *
 * @return {Date} The end of the statement range.
 */
StatementRange.prototype.getEnd = function() {
  return end;
};
Element.add({name: "DTEND", order: 10, owner: StatementRange, /*type: Date,*/ fcn: "getEnd"});


/**
 * The end of the statement range.
 *
 * @param {Date} end The end of the statement range.
 */
StatementRange.prototype.setEnd = function(end) {
  this.end = end;
};


/**
 * Whether to include transactions.
 *
 * @return {Boolean} Whether to include transactions.
 */
StatementRange.prototype.getIncludeTransactions = function() {
  return includeTransactions;
};
Element.add({name: "INCLUDE", required: true, order: 20, owner: StatementRange, /*type: Boolean,*/ fcn: "getIncludeTransactions"});


/**
 * Whether to include transactions.
 *
 * @param {Boolean} includeTransactions Whether to include transactions.
 */
StatementRange.prototype.setIncludeTransactions = function(includeTransactions) {
  this.includeTransactions = includeTransactions;
};




module.exports = StatementRange;
