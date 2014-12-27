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

var inherit = require("../../../../util/inherit");

var AbstractMessageSetInfo = require("../../profile/AbstractMessageSetInfo");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var ProfileV1MessageSetInfo = require("./ProfileV1MessageSetInfo");

/**
 * @class
 * @augments AbstractMessageSetInfo
 */
function ProfileMessageSetInfo () {

  /**
   * @name ProfileMessageSetInfo#version1Info
   * @type ProfileV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(ProfileMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("PROFMSGSET", ProfileMessageSetInfo);


ProfileMessageSetInfo.prototype.getVersion1Info = function() {
  return this.version1Info;
};
ChildAggregate.add(ProfileMessageSetInfo, {order: 0, attributeType: ProfileV1MessageSetInfo, readMethod: "getVersion1Info", writeMethod: "setVersion1Info"});


ProfileMessageSetInfo.prototype.setVersion1Info = function(/*ProfileV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = ProfileMessageSetInfo;
