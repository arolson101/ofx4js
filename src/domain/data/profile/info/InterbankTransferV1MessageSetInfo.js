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
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var TransferProfile = require("./common/TransferProfile");

/**
 * Interbank Funds Transfer Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.4 OFX Spec"
 */
function InterbankTransferV1MessageSetInfo () {
  VersionSpecificMessageSetInfo.call(this);

  /**
   * @name InterbankTransferV1MessageSetInfo#transferProfile
   * @type TransferProfile
   * @access private
   */
  this.transferProfile = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#supportsBillPay
   * @type Boolean
   * @access private
   */
  this.supportsBillPay = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#cancelWindow
   * @type Integer
   * @access private
   */
  this.cancelWindow = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#domesticInterbankTransferFee
   * @type Double
   * @access private
   */
  this.domesticInterbankTransferFee = null;

  /**
   * @name InterbankTransferV1MessageSetInfo#internationalInterbankTransferFee
   * @type Double
   * @access private
   */
  this.internationalInterbankTransferFee = null;
}

inherit(InterbankTransferV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("INTERXFERMSGSETV1", InterbankTransferV1MessageSetInfo);


InterbankTransferV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.interbank_transfer;
};


InterbankTransferV1MessageSetInfo.prototype.getTransferProfile = function() {
  return this.transferProfile;
};
ChildAggregate.add(InterbankTransferV1MessageSetInfo, {name: "XFERPROF", required: true, order: 10, attributeType: TransferProfile, readMethod: "getTransferProfile", writeMethod: "setTransferProfile"});


InterbankTransferV1MessageSetInfo.prototype.setTransferProfile = function(/*TransferProfile*/ transferProfile) {
  this.transferProfile = transferProfile;
};


InterbankTransferV1MessageSetInfo.prototype.getSupportsBillPay = function() {
  return this.supportsBillPay;
};
Element.add(InterbankTransferV1MessageSetInfo, {name: "CANBILLPAY", required: true, order: 20, attributeType: Boolean, readMethod: "getSupportsBillPay", writeMethod: "setSupportsBillPay"});


InterbankTransferV1MessageSetInfo.prototype.setSupportsBillPay = function(/*Boolean*/ supportsBillPay) {
  this.supportsBillPay = supportsBillPay;
};


InterbankTransferV1MessageSetInfo.prototype.getCancelWindow = function() {
  return this.cancelWindow;
};
Element.add(InterbankTransferV1MessageSetInfo, {name: "CANCELWND", required: true, order: 30, attributeType: Number, readMethod: "getCancelWindow", writeMethod: "setCancelWindow"});


InterbankTransferV1MessageSetInfo.prototype.setCancelWindow = function(/*Integer*/ cancelWindow) {
  this.cancelWindow = cancelWindow;
};


InterbankTransferV1MessageSetInfo.prototype.getDomesticInterbankTransferFee = function() {
  return this.domesticInterbankTransferFee;
};
Element.add(InterbankTransferV1MessageSetInfo, {name: "DOMXFERFEE", required: true, order: 40, attributeType: Number, readMethod: "getDomesticInterbankTransferFee", writeMethod: "setDomesticInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setDomesticInterbankTransferFee = function(/*Double*/ domesticInterbankTransferFee) {
  this.domesticInterbankTransferFee = domesticInterbankTransferFee;
};


InterbankTransferV1MessageSetInfo.prototype.getInternationalInterbankTransferFee = function() {
  return this.internationalInterbankTransferFee;
};
Element.add(InterbankTransferV1MessageSetInfo, {name: "INTLXFERFEE", required: true, order: 50, attributeType: Number, readMethod: "getInternationalInterbankTransferFee", writeMethod: "setInternationalInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setInternationalInterbankTransferFee = function(/*Double*/ internationalInterbankTransferFee) {
  this.internationalInterbankTransferFee = internationalInterbankTransferFee;
};




module.exports = InterbankTransferV1MessageSetInfo;
