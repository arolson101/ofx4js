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

var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var BasePosition = require("./BasePosition");

/**
 * Aggregate for a list of invesment positions.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @class
 */
function InvestmentPositionList () {

  /**
   * @name InvestmentPositionList#positions
   * @type BasePosition[]
   * @access private
   */
  this.positions = null;
}



Aggregate.add("INVPOSLIST", InvestmentPositionList);


/**
 * Gets the list of positions
 *
 * @return {BasePosition[]} the list of positions
 */
InvestmentPositionList.prototype.getPositions = function() {
  return this.positions;
};
ChildAggregate.add(InvestmentPositionList, {order: 10, attributeType: Array, collectionEntryType: BasePosition, readMethod: "getPositions", writeMethod: "setPositions"});


/**
 * Sets the list of positions.
 *
 * @param {BasePosition[]} positions the list of positions
 */
InvestmentPositionList.prototype.setPositions = function(positions) {
  this.positions = positions;
};




module.exports = InvestmentPositionList;
