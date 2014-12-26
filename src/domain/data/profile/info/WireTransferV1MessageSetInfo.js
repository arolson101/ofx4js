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

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * Wire Transfer Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.5 OFX Spec"
 */
function WireTransferV1MessageSetInfo () {

  /**
   * @name WireTransferV1MessageSetInfo#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name WireTransferV1MessageSetInfo#processEndTime
   * @type String
   * @access private
   */
  this.processEndTime = null;

  /**
   * @name WireTransferV1MessageSetInfo#supportsScheduledTransfers
   * @type Boolean
   * @access private
   */
  this.supportsScheduledTransfers = null;

  /**
   * @name WireTransferV1MessageSetInfo#domesticWireTransferFee
   * @type Double
   * @access private
   */
  this.domesticWireTransferFee = null;

  /**
   * @name WireTransferV1MessageSetInfo#internationalWireTransferFee
   * @type Double
   * @access private
   */
  this.internationalWireTransferFee = null;
}

inherit(WireTransferV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("WIREXFERMSGSETV1", WireTransferV1MessageSetInfo);


WireTransferV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.wire_transfer;
};


WireTransferV1MessageSetInfo.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add(WireTransferV1MessageSetInfo, {name: "PROCDAYSOFF", order: 10, attributeType: Array, collectionEntryType: ProcessorDayOff, readMethod: "getProcessorDaysOff", writeMethod: "setProcessorDaysOff"});


WireTransferV1MessageSetInfo.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


WireTransferV1MessageSetInfo.prototype.getProcessEndTime = function() {
  return this.processEndTime;
};
Element.add(WireTransferV1MessageSetInfo, {name: "PROCENDTM", required: true, order: 20, attributeType: String, readMethod: "getProcessEndTime", writeMethod: "setProcessEndTime"});


WireTransferV1MessageSetInfo.prototype.setProcessEndTime = function(/*String*/ processEndTime) {
  this.processEndTime = processEndTime;
};


WireTransferV1MessageSetInfo.prototype.getSupportsScheduledTransfers = function() {
  return this.supportsScheduledTransfers;
};
Element.add(WireTransferV1MessageSetInfo, {name: "CANSCHED", required: true, order: 30, attributeType: bool, readMethod: "getSupportsScheduledTransfers", writeMethod: "setSupportsScheduledTransfers"});


WireTransferV1MessageSetInfo.prototype.setSupportsScheduledTransfers = function(/*Boolean*/ supportsScheduledTransfers) {
  this.supportsScheduledTransfers = supportsScheduledTransfers;
};


WireTransferV1MessageSetInfo.prototype.getDomesticWireTransferFee = function() {
  return this.domesticWireTransferFee;
};
Element.add(WireTransferV1MessageSetInfo, {name: "DOMXFERFEE", required: true, order: 40, attributeType: Double, readMethod: "getDomesticWireTransferFee", writeMethod: "setDomesticWireTransferFee"});


WireTransferV1MessageSetInfo.prototype.setDomesticWireTransferFee = function(/*Double*/ domesticWireTransferFee) {
  this.domesticWireTransferFee = domesticWireTransferFee;
};


WireTransferV1MessageSetInfo.prototype.getInternationalWireTransferFee = function() {
  return this.internationalWireTransferFee;
};
Element.add(WireTransferV1MessageSetInfo, {name: "INTLXFERFEE", required: true, order: 50, attributeType: Double, readMethod: "getInternationalWireTransferFee", writeMethod: "setInternationalWireTransferFee"});


WireTransferV1MessageSetInfo.prototype.setInternationalWireTransferFee = function(/*Double*/ internationalWireTransferFee) {
  this.internationalWireTransferFee = internationalWireTransferFee;
};




module.exports = WireTransferV1MessageSetInfo;
