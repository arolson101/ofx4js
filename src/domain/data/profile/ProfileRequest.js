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

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ClientRoutingCapability = require("./ClientRoutingCapability");

/**
 * @author Ryan Heaton
 * @see "Section 7.1.5, OFX Spec"
 */
function ProfileRequest () {

  /**
   * @name ProfileRequest#routingCapability
   * @type ClientRoutingCapability
   * @access private
   */
  this.routingCapability = ClientRoutingCapability.NONE;

  /**
   * @name ProfileRequest#profileLastUpdated
   * @type Date
   * @access private
   */
  this.profileLastUpdated = null;
}

inherit(ProfileRequest, "extends", RequestMessage);


Aggregate.add("PROFRQ", ProfileRequest);


/**
 * The client routing capability.
 *
 * @return {ClientRoutingCapability} The client routing capability.
 */
ProfileRequest.prototype.getRoutingCapability = function() {
  return this.routingCapability;
};
Element.add({name: "CLIENTROUTING", order: 0, owner: ProfileRequest, /*type: ClientRoutingCapability,*/ readMethod: "getRoutingCapability", writeMethod: "setRoutingCapability"});


/**
 * The client routing capability.
 *
 * @param {ClientRoutingCapability} routingCapability The client routing capability.
 */
ProfileRequest.prototype.setRoutingCapability = function(routingCapability) {
  this.routingCapability = routingCapability;
};


/**
 * The date the profile was last updated.
 *
 * @return {Date} The date the profile was last updated.
 */
ProfileRequest.prototype.getProfileLastUpdated = function() {
  return this.profileLastUpdated;
};
Element.add({name: "DTPROFUP", order: 10, owner: ProfileRequest, /*type: Date,*/ readMethod: "getProfileLastUpdated", writeMethod: "setProfileLastUpdated"});


/**
 * The date the profile was last updated.
 *
 * @param {Date} profileLastUpdated The date the profile was last updated.
 */
ProfileRequest.prototype.setProfileLastUpdated = function(profileLastUpdated) {
  this.profileLastUpdated = profileLastUpdated;
};




module.exports = ProfileRequest;
