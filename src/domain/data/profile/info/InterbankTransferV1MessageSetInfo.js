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
var TransferProfile = require("domain/data/profile/info/common/TransferProfile");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

/**
 * Interbank Funds Transfer Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.4 OFX Spec"
 */
function InterbankTransferV1MessageSetInfo () {

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
  return transferProfile;
};
ChildAggregate.add({name: "XFERPROF", required: true, order: 10, owner: InterbankTransferV1MessageSetInfo, /*type: TransferProfile,*/ fcn: "getTransferProfile"});


InterbankTransferV1MessageSetInfo.prototype.setTransferProfile = function(/*TransferProfile*/ transferProfile) {
  this.transferProfile = transferProfile;
};


InterbankTransferV1MessageSetInfo.prototype.getSupportsBillPay = function() {
  return supportsBillPay;
};
Element.add({name: "CANBILLPAY", required: true, order: 20, owner: InterbankTransferV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBillPay"});


InterbankTransferV1MessageSetInfo.prototype.setSupportsBillPay = function(/*Boolean*/ supportsBillPay) {
  this.supportsBillPay = supportsBillPay;
};


InterbankTransferV1MessageSetInfo.prototype.getCancelWindow = function() {
  return cancelWindow;
};
Element.add({name: "CANCELWND", required: true, order: 30, owner: InterbankTransferV1MessageSetInfo, /*type: Integer,*/ fcn: "getCancelWindow"});


InterbankTransferV1MessageSetInfo.prototype.setCancelWindow = function(/*Integer*/ cancelWindow) {
  this.cancelWindow = cancelWindow;
};


InterbankTransferV1MessageSetInfo.prototype.getDomesticInterbankTransferFee = function() {
  return domesticInterbankTransferFee;
};
Element.add({name: "DOMXFERFEE", required: true, order: 40, owner: InterbankTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getDomesticInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setDomesticInterbankTransferFee = function(/*Double*/ domesticInterbankTransferFee) {
  this.domesticInterbankTransferFee = domesticInterbankTransferFee;
};


InterbankTransferV1MessageSetInfo.prototype.getInternationalInterbankTransferFee = function() {
  return internationalInterbankTransferFee;
};
Element.add({name: "INTLXFERFEE", required: true, order: 50, owner: InterbankTransferV1MessageSetInfo, /*type: Double,*/ fcn: "getInternationalInterbankTransferFee"});


InterbankTransferV1MessageSetInfo.prototype.setInternationalInterbankTransferFee = function(/*Double*/ internationalInterbankTransferFee) {
  this.internationalInterbankTransferFee = internationalInterbankTransferFee;
};




module.exports = InterbankTransferV1MessageSetInfo;
