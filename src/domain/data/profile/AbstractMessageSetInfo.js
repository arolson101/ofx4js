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

var ChildAggregate = require("../../../meta/ChildAggregate");
var VersionSpecificMessageSetInfo = require("./VersionSpecificMessageSetInfo");

/**
 * Information about a message set.
 *
 * @class
 * See "Section 7.2.1, OFX Spec"
 */
function AbstractMessageSetInfo () {

  /**
   * @name AbstractMessageSetInfo#versionSpecificInformationList
   * @type VersionSpecificMessageSetInfo[]
   * @access private
   */
  this.versionSpecificInformationList = null;
}





/**
 * List of information about a message set for each version supported.
 *
 * @return {VersionSpecificMessageSetInfo[]} List of information about a message set for each version supported.
 */
AbstractMessageSetInfo.prototype.getVersionSpecificInformationList = function() {
  return this.versionSpecificInformationList;
};
ChildAggregate.add(AbstractMessageSetInfo, {order: 0, attributeType: Array, collectionEntryType: VersionSpecificMessageSetInfo, readMethod: "getVersionSpecificInformationList", writeMethod: "setVersionSpecificInformationList"});


/**
 * List of information about a message set for each version supported.
 *
 * @param {VersionSpecificMessageSetInfo[]} versionSpecificInformationList List of information about a message set for each version supported.
 */
AbstractMessageSetInfo.prototype.setVersionSpecificInformationList = function(versionSpecificInformationList) {
  this.versionSpecificInformationList = versionSpecificInformationList;
};




module.exports = AbstractMessageSetInfo;
