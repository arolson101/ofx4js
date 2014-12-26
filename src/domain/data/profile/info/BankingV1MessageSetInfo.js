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

var VersionSpecificMessageSetInfo = require("../VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");

/**
 * Banking Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.2.1 OFX Spec"
 */
function BankingV1MessageSetInfo () {

  /**
   * @name BankingV1MessageSetInfo#invalidAccountTypes
   * @type List<AccountType>
   * @access private
   */
  this.invalidAccountTypes = null;

  /**
   * @name BankingV1MessageSetInfo#closingAvail
   * @type Boolean
   * @access private
   */
  this.closingAvail = null;

  /**
   * @name BankingV1MessageSetInfo#transferProfile
   * @type TransferProfile
   * @access private
   */
  this.transferProfile = null;

  /**
   * @name BankingV1MessageSetInfo#stopCheckProfile
   * @type StopCheckProfile
   * @access private
   */
  this.stopCheckProfile = null;

  /**
   * @name BankingV1MessageSetInfo#emailProfile
   * @type EmailProfile
   * @access private
   */
  this.emailProfile = null;

  /**
   * @name BankingV1MessageSetInfo#imageProfile
   * @type ImageProfile
   * @access private
   */
  this.imageProfile = null;
}

inherit(BankingV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("BANKMSGSETV1", BankingV1MessageSetInfo);


BankingV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.banking;
};


/**
 * The invalidAccountTypes list.
 *
 * @return {AccountType[]} The invalidAccountTypes list.
 */
BankingV1MessageSetInfo.prototype.getInvalidAccountTypes = function() {
  return this.invalidAccountTypes;
};
ChildAggregate.add({order: 10, owner: BankingV1MessageSetInfo, /*type: AccountType[],*/ readMethod: "getInvalidAccountTypes", writeMethod: "setInvalidAccountTypes"});


/**
 * The invalidAccountTypes list.
 *
 * @param {AccountType[]} invalidAccountTypes The invalidAccountTypes list.
 */
BankingV1MessageSetInfo.prototype.setInvalidAccountTypes = function(invalidAccountTypes) {
  this.invalidAccountTypes = invalidAccountTypes;
};


/**
 * Gets whether closing statement information is available
 *
 * @return {Boolean} whether closing statement information is available
 */
BankingV1MessageSetInfo.prototype.getClosingAvail = function() {
  return this.closingAvail;
};
Element.add({name: "CLOSINGAVAIL", required: true, order: 20, owner: BankingV1MessageSetInfo, /*type: Boolean,*/ readMethod: "getClosingAvail", writeMethod: "setClosingAvail"});


/**
 * Sets whether closing statement information is available
 *
 * @param {Boolean} closingAvail whether closing statement information is available
 */
BankingV1MessageSetInfo.prototype.setClosingAvail = function(closingAvail) {
  this.closingAvail = closingAvail;
};


BankingV1MessageSetInfo.prototype.getTransferProfile = function() {
  return this.transferProfile;
};
ChildAggregate.add({name: "XFERPROF", order: 30, owner: BankingV1MessageSetInfo, /*type: TransferProfile,*/ readMethod: "getTransferProfile", writeMethod: "setTransferProfile"});


BankingV1MessageSetInfo.prototype.setTransferProfile = function(/*TransferProfile*/ transferProfile) {
  this.transferProfile = transferProfile;
};


BankingV1MessageSetInfo.prototype.getStopCheckProfile = function() {
  return this.stopCheckProfile;
};
ChildAggregate.add({name: "STPCKPROF", order: 40, owner: BankingV1MessageSetInfo, /*type: StopCheckProfile,*/ readMethod: "getStopCheckProfile", writeMethod: "setStopCheckProfile"});


BankingV1MessageSetInfo.prototype.setStopCheckProfile = function(/*StopCheckProfile*/ stopCheckProfile) {
  this.stopCheckProfile = stopCheckProfile;
};


BankingV1MessageSetInfo.prototype.getEmailProfile = function() {
  return this.emailProfile;
};
ChildAggregate.add({name: "EMAILPROF", required: true, order: 50, owner: BankingV1MessageSetInfo, /*type: EmailProfile,*/ readMethod: "getEmailProfile", writeMethod: "setEmailProfile"});


BankingV1MessageSetInfo.prototype.setEmailProfile = function(/*EmailProfile*/ emailProfile) {
  this.emailProfile = emailProfile;
};


BankingV1MessageSetInfo.prototype.getImageProfile = function() {
  return this.imageProfile;
};
ChildAggregate.add({name: "IMAGEPROF", order: 60, owner: BankingV1MessageSetInfo, /*type: ImageProfile,*/ readMethod: "getImageProfile", writeMethod: "setImageProfile"});


BankingV1MessageSetInfo.prototype.setImageProfile = function(/*ImageProfile*/ imageProfile) {
  this.imageProfile = imageProfile;
};




module.exports = BankingV1MessageSetInfo;
