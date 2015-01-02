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
var ClientEnrollment = require("./signup/ClientEnrollment");
var WebEnrollment = require("./signup/WebEnrollment");
var OtherEnrollment = require("./signup/OtherEnrollment");

/**
 * Servers use the Signup Message Set Profile Information to define how enrollment should proceed.
 *
 * This aggregate should contain 1 Enrollment option among <CLIENTENROLL>, <WEBENROLL>, or <OTHERENROLL>.
 * todo: review how best to enforce this constraint
 *
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 8.8 OFX Spec"
 */
function SignupV1MessageSetInfo () {
  VersionSpecificMessageSetInfo.call(this);

  /**
   * @name SignupV1MessageSetInfo#clientEnrollment
   * @type ClientEnrollment
   * @access private
   */
  this.clientEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#webEnrollment
   * @type WebEnrollment
   * @access private
   */
  this.webEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#otherEnrollment
   * @type OtherEnrollment
   * @access private
   */
  this.otherEnrollment = null;

  /**
   * @name SignupV1MessageSetInfo#supportsClientUserInfoChanges
   * @type Boolean
   * @access private
   */
  this.supportsClientUserInfoChanges = null;

  /**
   * @name SignupV1MessageSetInfo#supportsAvailableAccounts
   * @type Boolean
   * @access private
   */
  this.supportsAvailableAccounts = null;

  /**
   * @name SignupV1MessageSetInfo#supportsClientServiceActivationRequests
   * @type Boolean
   * @access private
   */
  this.supportsClientServiceActivationRequests = null;
}

inherit(SignupV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SIGNUPMSGSETV1", SignupV1MessageSetInfo);


SignupV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.signup;
};


SignupV1MessageSetInfo.prototype.getClientEnrollment = function() {
  return this.clientEnrollment;
};
ChildAggregate.add(SignupV1MessageSetInfo, {name: "CLIENTENROLL", order: 10, attributeType: ClientEnrollment, readMethod: "getClientEnrollment", writeMethod: "setClientEnrollment"});


SignupV1MessageSetInfo.prototype.setClientEnrollment = function(/*ClientEnrollment*/ clientEnrollment) {
  this.clientEnrollment = clientEnrollment;
};


SignupV1MessageSetInfo.prototype.getWebEnrollment = function() {
  return this.webEnrollment;
};
ChildAggregate.add(SignupV1MessageSetInfo, {name: "WEBENROLL", order: 20, attributeType: WebEnrollment, readMethod: "getWebEnrollment", writeMethod: "setWebEnrollment"});


SignupV1MessageSetInfo.prototype.setWebEnrollment = function(/*WebEnrollment*/ webEnrollment) {
  this.webEnrollment = webEnrollment;
};


SignupV1MessageSetInfo.prototype.getOtherEnrollment = function() {
  return this.otherEnrollment;
};
ChildAggregate.add(SignupV1MessageSetInfo, {name: "OTHERENROLL", order: 30, attributeType: OtherEnrollment, readMethod: "getOtherEnrollment", writeMethod: "setOtherEnrollment"});


SignupV1MessageSetInfo.prototype.setOtherEnrollment = function(/*OtherEnrollment*/ otherEnrollment) {
  this.otherEnrollment = otherEnrollment;
};


/**
 * Y if server supports client-based user information changes,
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsClientUserInfoChanges = function() {
  return this.supportsClientUserInfoChanges;
};
Element.add(SignupV1MessageSetInfo, {name: "CHGUSERINFO", required: true, order: 40, attributeType: Boolean, readMethod: "getSupportsClientUserInfoChanges", writeMethod: "setSupportsClientUserInfoChanges"});


SignupV1MessageSetInfo.prototype.setSupportsClientUserInfoChanges = function(/*Boolean*/ supportsClientUserInfoChanges) {
  this.supportsClientUserInfoChanges = supportsClientUserInfoChanges;
};


/**
 * Y if server can provide information on accounts with SVCSTATUS available,
 * N means client should expect to ask user for specific account information
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsAvailableAccounts = function() {
  return this.supportsAvailableAccounts;
};
Element.add(SignupV1MessageSetInfo, {name: "AVAILACCTS", required: true, order: 50, attributeType: Boolean, readMethod: "getSupportsAvailableAccounts", writeMethod: "setSupportsAvailableAccounts"});


SignupV1MessageSetInfo.prototype.setSupportsAvailableAccounts = function(/*Boolean*/ supportsAvailableAccounts) {
  this.supportsAvailableAccounts = supportsAvailableAccounts;
};


/**
 * Y if server allows clients to make service activation requests (<ACCTRQ>),
 * N if server will only advise clients via synchronization of service additions,
 * changes, or deletions.
 * @return {Boolean} Boolean
 */
SignupV1MessageSetInfo.prototype.getSupportsClientServiceActivationRequests = function() {
  return this.supportsClientServiceActivationRequests;
};
Element.add(SignupV1MessageSetInfo, {name: "CLIENTACTREQ", required: true, order: 60, attributeType: Boolean, readMethod: "getSupportsClientServiceActivationRequests", writeMethod: "setSupportsClientServiceActivationRequests"});


SignupV1MessageSetInfo.prototype.setSupportsClientServiceActivationRequests = function(/*Boolean*/ supportsClientServiceActivationRequests) {
  this.supportsClientServiceActivationRequests = supportsClientServiceActivationRequests;
};




module.exports = SignupV1MessageSetInfo;
