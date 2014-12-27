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
var ChildAggregate = require("../../../meta/ChildAggregate");
var AbstractMessageSetInfo = require("./AbstractMessageSetInfo");

/**
 * @class
 * @see "Section 7.2, OFX Spec"
 */
function MessageSetInfoList () {

  /**
   * @name MessageSetInfoList#informationList
   * @type List<AbstractMessageSetInfo>
   * @access private
   */
  this.informationList = null;
}



Aggregate.add("MSGSETLIST", MessageSetInfoList);


/**
 * The list of information for each message set.
 *
 * @return {AbstractMessageSetInfo[]} The list of information for each message set.
 */
MessageSetInfoList.prototype.getInformationList = function() {
  return this.informationList;
};
ChildAggregate.add(MessageSetInfoList, {order: 0, attributeType: Array, collectionEntryType: AbstractMessageSetInfo, readMethod: "getInformationList", writeMethod: "setInformationList"});


/**
 * The list of information for each message set.
 *
 * @param {AbstractMessageSetInfo[]} informationList The list of information for each message set.
 */
MessageSetInfoList.prototype.setInformationList = function(informationList) {
  this.informationList = informationList;
};




module.exports = MessageSetInfoList;
