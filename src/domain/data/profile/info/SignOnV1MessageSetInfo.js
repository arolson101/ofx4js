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

var MessageSetType = require("domain/data/MessageSetType");
var VersionSpecificMessageSetInfo = require("domain/data/profile/VersionSpecificMessageSetInfo");
var Aggregate = require("meta/Aggregate");

/**
 * @author Jon Perlow
 */
function SignOnV1MessageSetInfo () {
}

inherit(SignOnV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SIGNONMSGSETV1", SignOnV1MessageSetInfo);


SignOnV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.signon;
};




module.exports = SignOnV1MessageSetInfo;
