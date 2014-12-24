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
var Element = require("meta/Element");

/**
 * BillPay Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 12.11.2 OFX Spec"
 */
function BillpayV1MessageSetInfo () {

  /**
   * @name BillpayV1MessageSetInfo#daysWith
   * @type Integer
   * @access private
   */
  this.daysWith = null;

  /**
   * @name BillpayV1MessageSetInfo#defaultDaysToPay
   * @type Integer
   * @access private
   */
  this.defaultDaysToPay = null;

  /**
   * @name BillpayV1MessageSetInfo#transferDaysWith
   * @type Integer
   * @access private
   */
  this.transferDaysWith = null;

  /**
   * @name BillpayV1MessageSetInfo#transferDefaultDaysToPay
   * @type Integer
   * @access private
   */
  this.transferDefaultDaysToPay = null;

  /**
   * @name BillpayV1MessageSetInfo#processorDaysOff
   * @type List<ProcessorDayOff>
   * @access private
   */
  this.processorDaysOff = null;

  /**
   * @name BillpayV1MessageSetInfo#processorEndTime
   * @type String
   * @access private
   */
  this.processorEndTime = null;

  /**
   * @name BillpayV1MessageSetInfo#modelWindow
   * @type Integer
   * @access private
   */
  this.modelWindow = null;

  /**
   * @name BillpayV1MessageSetInfo#postProcessorWindow
   * @type Integer
   * @access private
   */
  this.postProcessorWindow = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsStatusUpdateViaPaymentModificationResponse
   * @type Boolean
   * @access private
   */
  this.supportsStatusUpdateViaPaymentModificationResponse = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByAddress
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByAddress = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByTransfer
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByTransfer = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsPaymentByPayeeId
   * @type Boolean
   * @access private
   */
  this.supportsPaymentByPayeeId = null;

  /**
   * @name BillpayV1MessageSetInfo#userCanAddPayee
   * @type Boolean
   * @access private
   */
  this.userCanAddPayee = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsExtendedPayment
   * @type Boolean
   * @access private
   */
  this.supportsExtendedPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#canModifyPayments
   * @type Boolean
   * @access private
   */
  this.canModifyPayments = null;

  /**
   * @name BillpayV1MessageSetInfo#canModifyModels
   * @type Boolean
   * @access private
   */
  this.canModifyModels = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsDifferentFirstPayment
   * @type Boolean
   * @access private
   */
  this.supportsDifferentFirstPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsDifferentLastPayment
   * @type Boolean
   * @access private
   */
  this.supportsDifferentLastPayment = null;

  /**
   * @name BillpayV1MessageSetInfo#supportsBillPresentmentContext
   * @type Boolean
   * @access private
   */
  this.supportsBillPresentmentContext = null;
}

inherit(BillpayV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("BILLPAYMSGSETV1", BillpayV1MessageSetInfo);


BillpayV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.payments;
};


BillpayV1MessageSetInfo.prototype.getDaysWith = function() {
  return this.daysWith;
};
Element.add({name: "DAYSWITH", required: true, order: 10, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getDaysWith"});


BillpayV1MessageSetInfo.prototype.setDaysWith = function(/*Integer*/ daysWith) {
  this.daysWith = daysWith;
};


BillpayV1MessageSetInfo.prototype.getDefaultDaysToPay = function() {
  return this.defaultDaysToPay;
};
Element.add({name: "DFLTDAYSTOPAY", required: true, order: 20, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getDefaultDaysToPay"});


BillpayV1MessageSetInfo.prototype.setDefaultDaysToPay = function(/*Integer*/ defaultDaysToPay) {
  this.defaultDaysToPay = defaultDaysToPay;
};


BillpayV1MessageSetInfo.prototype.getTransferDaysWith = function() {
  return this.transferDaysWith;
};
Element.add({name: "XFERDAYSWITH", required: true, order: 30, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getTransferDaysWith"});


BillpayV1MessageSetInfo.prototype.setTransferDaysWith = function(/*Integer*/ transferDaysWith) {
  this.transferDaysWith = transferDaysWith;
};


BillpayV1MessageSetInfo.prototype.getTransferDefaultDaysToPay = function() {
  return this.transferDefaultDaysToPay;
};
Element.add({name: "XFERDFLTDAYSTOPAY", required: true, order: 40, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getTransferDefaultDaysToPay"});


BillpayV1MessageSetInfo.prototype.setTransferDefaultDaysToPay = function(/*Integer*/ transferDefaultDaysToPay) {
  this.transferDefaultDaysToPay = transferDefaultDaysToPay;
};


BillpayV1MessageSetInfo.prototype.getProcessorDaysOff = function() {
  return this.processorDaysOff;
};
Element.add({name: "PROCDAYSOFF", order: 50, owner: BillpayV1MessageSetInfo, /*type: ProcessorDayOff[],*/ fcn: "getProcessorDaysOff"});


BillpayV1MessageSetInfo.prototype.setProcessorDaysOff = function(/*ProcessorDayOff[]*/ processorDaysOff) {
  this.processorDaysOff = processorDaysOff;
};


BillpayV1MessageSetInfo.prototype.getProcessorEndTime = function() {
  return this.processorEndTime;
};
Element.add({name: "PROCENDTM", required: true, order: 60, owner: BillpayV1MessageSetInfo, /*type: String,*/ fcn: "getProcessorEndTime"});


BillpayV1MessageSetInfo.prototype.setProcessorEndTime = function(/*String*/ processorEndTime) {
  this.processorEndTime = processorEndTime;
};


BillpayV1MessageSetInfo.prototype.getModelWindow = function() {
  return this.modelWindow;
};
Element.add({name: "MODELWND", required: true, order: 70, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getModelWindow"});


BillpayV1MessageSetInfo.prototype.setModelWindow = function(/*Integer*/ modelWindow) {
  this.modelWindow = modelWindow;
};


BillpayV1MessageSetInfo.prototype.getPostProcessorWindow = function() {
  return this.postProcessorWindow;
};
Element.add({name: "POSTPROCWND", required: true, order: 80, owner: BillpayV1MessageSetInfo, /*type: Integer,*/ fcn: "getPostProcessorWindow"});


BillpayV1MessageSetInfo.prototype.setPostProcessorWindow = function(/*Integer*/ postProcessorWindow) {
  this.postProcessorWindow = postProcessorWindow;
};


BillpayV1MessageSetInfo.prototype.getSupportsStatusUpdateViaPaymentModificationResponse = function() {
  return this.supportsStatusUpdateViaPaymentModificationResponse;
};
Element.add({name: "STSVIAMODS", required: true, order: 90, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsStatusUpdateViaPaymentModificationResponse"});


BillpayV1MessageSetInfo.prototype.setSupportsStatusUpdateViaPaymentModificationResponse = function(/*Boolean*/ supportsStatusUpdateViaPaymentModificationResponse) {
  this.supportsStatusUpdateViaPaymentModificationResponse = supportsStatusUpdateViaPaymentModificationResponse;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByAddress = function() {
  return this.supportsPaymentByAddress;
};
Element.add({name: "PMTBYADDR", required: true, order: 100, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByAddress"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByAddress = function(/*Boolean*/ supportsPaymentByAddress) {
  this.supportsPaymentByAddress = supportsPaymentByAddress;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByTransfer = function() {
  return this.supportsPaymentByTransfer;
};
Element.add({name: "PMTBYXFER", required: true, order: 110, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByTransfer"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByTransfer = function(/*Boolean*/ supportsPaymentByTransfer) {
  this.supportsPaymentByTransfer = supportsPaymentByTransfer;
};


BillpayV1MessageSetInfo.prototype.getSupportsPaymentByPayeeId = function() {
  return this.supportsPaymentByPayeeId;
};
Element.add({name: "PMTBYPAYEEID", required: true, order: 120, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPaymentByPayeeId"});


BillpayV1MessageSetInfo.prototype.setSupportsPaymentByPayeeId = function(/*Boolean*/ supportsPaymentByPayeeId) {
  this.supportsPaymentByPayeeId = supportsPaymentByPayeeId;
};


BillpayV1MessageSetInfo.prototype.getUserCanAddPayee = function() {
  return this.userCanAddPayee;
};
Element.add({name: "CANADDPAYEE", required: true, order: 130, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getUserCanAddPayee"});


BillpayV1MessageSetInfo.prototype.setUserCanAddPayee = function(/*Boolean*/ userCanAddPayee) {
  this.userCanAddPayee = userCanAddPayee;
};


BillpayV1MessageSetInfo.prototype.getSupportsExtendedPayment = function() {
  return this.supportsExtendedPayment;
};
Element.add({name: "HASEXTDPMT", required: true, order: 140, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsExtendedPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsExtendedPayment = function(/*Boolean*/ supportsExtendedPayment) {
  this.supportsExtendedPayment = supportsExtendedPayment;
};


BillpayV1MessageSetInfo.prototype.getCanModifyPayments = function() {
  return this.canModifyPayments;
};
Element.add({name: "CANMODPMTS", required: true, order: 150, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getCanModifyPayments"});


BillpayV1MessageSetInfo.prototype.setCanModifyPayments = function(/*Boolean*/ canModifyPayments) {
  this.canModifyPayments = canModifyPayments;
};


BillpayV1MessageSetInfo.prototype.getCanModifyModels = function() {
  return this.canModifyModels;
};
Element.add({name: "CANMODMDLS", required: true, order: 160, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getCanModifyModels"});


BillpayV1MessageSetInfo.prototype.setCanModifyModels = function(/*Boolean*/ canModifyModels) {
  this.canModifyModels = canModifyModels;
};


BillpayV1MessageSetInfo.prototype.getSupportsDifferentFirstPayment = function() {
  return this.supportsDifferentFirstPayment;
};
Element.add({name: "DIFFFIRSTPMT", required: true, order: 170, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsDifferentFirstPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsDifferentFirstPayment = function(/*Boolean*/ supportsDifferentFirstPayment) {
  this.supportsDifferentFirstPayment = supportsDifferentFirstPayment;
};


BillpayV1MessageSetInfo.prototype.getSupportsDifferentLastPayment = function() {
  return this.supportsDifferentLastPayment;
};
Element.add({name: "DIFFLASTPMT", required: true, order: 180, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsDifferentLastPayment"});


BillpayV1MessageSetInfo.prototype.setSupportsDifferentLastPayment = function(/*Boolean*/ supportsDifferentLastPayment) {
  this.supportsDifferentLastPayment = supportsDifferentLastPayment;
};


BillpayV1MessageSetInfo.prototype.getSupportsBillPresentmentContext = function() {
  return this.supportsBillPresentmentContext;
};
Element.add({name: "BILLPUBCONTEXT", order: 190, owner: BillpayV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBillPresentmentContext"});


BillpayV1MessageSetInfo.prototype.setSupportsBillPresentmentContext = function(/*Boolean*/ supportsBillPresentmentContext) {
  this.supportsBillPresentmentContext = supportsBillPresentmentContext;
};




module.exports = BillpayV1MessageSetInfo;
