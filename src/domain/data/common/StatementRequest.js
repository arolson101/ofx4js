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

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var StatementRange = require("./StatementRange");

/**
 * @class
 * @augments RequestMessage
 */
function StatementRequest () {
  RequestMessage.call(this);

  /**
   * @name StatementRequest#statementRange
   * @type StatementRange
   * @access private
   */
  this.statementRange = null;
}

inherit(StatementRequest, "extends", RequestMessage);


Aggregate.add("STMTRQ", StatementRequest);


/**
 * The statement range.
 *
 * @return {StatementRange} The statement range.
 */
StatementRequest.prototype.getStatementRange = function() {
  return this.statementRange;
};
ChildAggregate.add(StatementRequest, {name: "INCTRAN", required: false, order: 10, attributeType: StatementRange, readMethod: "getStatementRange", writeMethod: "setStatementRange"});


/**
 * The statement range.
 *
 * @param {StatementRange} statementRange The statement range.
 */
StatementRequest.prototype.setStatementRange = function(statementRange) {
  this.statementRange = statementRange;
};




module.exports = StatementRequest;
