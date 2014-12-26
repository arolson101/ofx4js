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

var MessageSetType = require("../MessageSetType");
var RequestMessageSet = require("../RequestMessageSet");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments RequestMessageSet
 * @see "Section 7 OFX Spec"
 */
function ProfileRequestMessageSet () {

  /**
   * @name ProfileRequestMessageSet#profileRequest
   * @type ProfileRequestTransaction
   * @access private
   */
  this.profileRequest = null;
}

inherit(ProfileRequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("PROFMSGSRQV1", ProfileRequestMessageSet);


ProfileRequestMessageSet.prototype.getType = function() {
  return MessageSetType.profile;
};


/**
 * The profile request.
 *
 * @return {ProfileRequestTransaction} The profile request.
 */
ProfileRequestMessageSet.prototype.getProfileRequest = function() {
  return this.profileRequest;
};
ChildAggregate.add(ProfileRequestMessageSet, {required: true, order: 0, attributeType: ProfileRequestTransaction, readMethod: "getProfileRequest", writeMethod: "setProfileRequest"});


/**
 * The profile request.
 *
 * @param {ProfileRequestTransaction} profileRequest The profile request.
 */
ProfileRequestMessageSet.prototype.setProfileRequest = function(profileRequest) {
  this.profileRequest = profileRequest;
};


// Inherited.
ProfileRequestMessageSet.prototype.getRequestMessages = function() {
  var requestMessages = [];
  if (this.getProfileRequest() !== null) {
    requestMessages.push(this.getProfileRequest());
  }
  return requestMessages;
};




module.exports = ProfileRequestMessageSet;
