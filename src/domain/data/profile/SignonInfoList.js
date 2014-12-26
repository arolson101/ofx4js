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

//import java.util.List;

/**
 * List of signon information.
 *
 * @class
 * @see "Section 7.2.2, OFX Spec"
 */
function SignonInfoList () {

  /**
   * @name SignonInfoList#infoList
   * @type List<SignonInfo>
   * @access private
   */
  this.infoList = null;
}



Aggregate.add("SIGNONINFOLIST", SignonInfoList);


/**
 * List of sign-on information.
 *
 * @return {SignonInfo[]} List of sign-on information.
 */
SignonInfoList.prototype.getInfoList = function() {
  return this.infoList;
};
ChildAggregate.add(SignonInfoList, {order: 0, attributeType: Array, collectionEntryType: SignonInfo, readMethod: "getInfoList", writeMethod: "setInfoList"});


/**
 * List of sign-on information.
 *
 * @param {SignonInfo[]} infoList List of sign-on information.
 */
SignonInfoList.prototype.setInfoList = function(infoList) {
  this.infoList = infoList;
};




module.exports = SignonInfoList;
