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

var VersionSpecificMessageSetInfo = require("domain/data/profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("domain/data/MessageSetType");
var Aggregate = require("meta/Aggregate");

/**
 * @class
 * @augments VersionSpecificMessageSetInfo
 */
function ProfileV1MessageSetInfo () {
}

inherit(ProfileV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("PROFMSGSETV1", ProfileV1MessageSetInfo);


ProfileV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.profile;
};




module.exports = ProfileV1MessageSetInfo;
