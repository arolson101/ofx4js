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
var BalanceRecord = require("../../common/BalanceRecord");

/**
 * Aggregate for the investment balance list.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @class
 */
function BalanceList () {

  /**
   * @name BalanceList#balanceRecords
   * @type BalanceRecord[]
   * @access private
   */
  this.balanceRecords = null;
}



Aggregate.add("BALLIST", BalanceList);


/**
 * Gets the list of balance records.
 *
 * @return {BalanceRecord[]} the list of balance records.
 */
BalanceList.prototype.getBalanceRecords = function() {
  return this.balanceRecords;
};
ChildAggregate.add(BalanceList, {order: 10, attributeType: Array, collectionEntryType: BalanceRecord, readMethod: "getBalanceRecords", writeMethod: "setBalanceRecords"});


/**
 * Sets the list of balance records.
 *
 * @param {BalanceRecord[]} balanceRecords the list of balance records.
 */
BalanceList.prototype.setBalanceRecords = function(balanceRecords) {
  this.balanceRecords = balanceRecords;
};




module.exports = BalanceList;
