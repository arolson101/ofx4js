/*
 * Copyright 2012 TheStash
 *
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

var Aggregate = require("../../../../../meta/Aggregate");
var Element = require("../../../../../meta/Element");

/**
 * Stop Check Profile
 * @class
 * @see "Section 11.13.2.3 OFX Spec"
 */
function StopCheckProfile () {

  /**
   * @name StopCheckProfile#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name StopCheckProfile#processEndTime
   * @type String
   * @access private
   */
  this.processEndTime = null;

  /**
   * @name StopCheckProfile#canUseRange
   * @type Boolean
   * @access private
   */
  this.canUseRange = null;

  /**
   * @name StopCheckProfile#canUseDescription
   * @type Boolean
   * @access private
   */
  this.canUseDescription = null;

  /**
   * @name StopCheckProfile#stopCheckFee
   * @type Double
   * @access private
   */
  this.stopCheckFee = null;
}



Aggregate.add("STPCHKPROF", StopCheckProfile);


/**
 * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
 * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
 * @return {ProcessorDayOff[]} List of days during the week that no processing occurs.
 */
StopCheckProfile.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 0, owner: StopCheckProfile, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


StopCheckProfile.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


/**
 * Gets time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.
 * @see "Section 3.2.8.3 OFX Spec"
 * @return {String} Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
StopCheckProfile.prototype.getProcessEndTime = function() {
  return this.processEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 10, owner: StopCheckProfile, /*type: String,*/ fcn: "getProcessEndTime"});


/**
 * Sets the time of day that day's processing ends.
 *
 * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
 * the milliseconds and time zone are still optional, and default to GMT.

 * @see "Section 3.2.8.3 OFX Spec"
 * @param {String} processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
 */
StopCheckProfile.prototype.setProcessEndTime = function(processEndTime) {
  this.processEndTime = processEndTime;
};


StopCheckProfile.prototype.getCanUseRange = function() {
  return this.canUseRange;
};
Element.add({name: "CANUSERANGE", required: true, order: 20, owner: StopCheckProfile, /*type: Boolean,*/ fcn: "getCanUseRange"});


StopCheckProfile.prototype.setCanUseRange = function(/*Boolean*/ canUseRange) {
  this.canUseRange = canUseRange;
};


StopCheckProfile.prototype.getCanUseDescription = function() {
  return this.canUseDescription;
};
Element.add({name: "CANUSEDESC", required: true, order: 30, owner: StopCheckProfile, /*type: Boolean,*/ fcn: "getCanUseDescription"});


StopCheckProfile.prototype.setCanUseDescription = function(/*Boolean*/ canUseDescription) {
  this.canUseDescription = canUseDescription;
};


StopCheckProfile.prototype.getStopCheckFee = function() {
  return this.stopCheckFee;
};
Element.add({name: "STPCHKFEE", required: true, order: 40, owner: StopCheckProfile, /*type: Double,*/ fcn: "getStopCheckFee"});


StopCheckProfile.prototype.setStopCheckFee = function(/*Double*/ stopCheckFee) {
  this.stopCheckFee = stopCheckFee;
};




module.exports = StopCheckProfile;
