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
var ResponseMessageSet = require("../ResponseMessageSet");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Aggregate = require("../../../meta/Aggregate");
var ProfileResponseTransaction = require("./ProfileResponseTransaction");

/**
 * @class
 * @augments ResponseMessageSet
 * @see "Section 7 OFX Spec"
 */
function ProfileResponseMessageSet () {

  /**
   * @name ProfileResponseMessageSet#profileResponse
   * @type ProfileResponseTransaction
   * @access private
   */
  this.profileResponse = null;
}

inherit(ProfileResponseMessageSet, "extends", ResponseMessageSet);


Aggregate.add("PROFMSGSRSV1", ProfileResponseMessageSet);


ProfileResponseMessageSet.prototype.getType = function() {
  return MessageSetType.profile;
};


/**
 * The profile response.
 *
 * @return {ProfileResponseTransaction} The profile response.
 */
ProfileResponseMessageSet.prototype.getProfileResponse = function() {
  return this.profileResponse;
};
ChildAggregate.add(ProfileResponseMessageSet, {required: true, order: 0, attributeType: ProfileResponseTransaction, readMethod: "getProfileResponse", writeMethod: "setProfileResponse"});


/**
 * The profile response.
 *
 * @param {ProfileResponseTransaction} profileResponse The profile response.
 */
ProfileResponseMessageSet.prototype.setProfileResponse = function(profileResponse) {
  this.profileResponse = profileResponse;
};


// Inherited.
ProfileResponseMessageSet.prototype.getResponseMessages = function() {
  var messages = [];

  if (this.getProfileResponse()) {
    messages.add(this.getProfileResponse());
  }

  return messages;
};




module.exports = ProfileResponseMessageSet;
