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

var AbstractMessageSetInfo = require("domain/data/profile/AbstractMessageSetInfo");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

/**
 * @author Ryan Heaton
 */
function SignupMessageSetInfo () {

  /**
   * @name SignupMessageSetInfo#version1Info
   * @type SignupV1MessageSetInfo
   * @access private
   */
  this.version1Info = null;
}

inherit(SignupMessageSetInfo, "extends", AbstractMessageSetInfo);


Aggregate.add("SIGNUPMSGSET", SignupMessageSetInfo);


SignupMessageSetInfo.prototype.getVersion1Info = function() {
  return version1Info;
};
ChildAggregate.add({order: 0, owner: SignupMessageSetInfo, /*type: SignupV1MessageSetInfo,*/ fcn: "getVersion1Info"});


SignupMessageSetInfo.prototype.setVersion1Info = function(/*SignupV1MessageSetInfo*/ version1Info) {
  this.version1Info = version1Info;
};




module.exports = SignupMessageSetInfo;
