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

/**
 * Credit Card Message Set Profile
 * @class
 * @augments VersionSpecificMessageSetInfo
 * @see "Section 11.13.3 OFX Spec"
 */
function CreditCardV1MessageSetInfo () {

  /**
   * @name CreditCardV1MessageSetInfo#closingAvail
   * @type Boolean
   * @access private
   */
  this.closingAvail = null;

  /**
   * @name CreditCardV1MessageSetInfo#imageProfile
   * @type ImageProfile
   * @access private
   */
  this.imageProfile = null;
}

inherit(CreditCardV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("CREDITCARDMSGSETV1", CreditCardV1MessageSetInfo);


CreditCardV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.creditcard;
};


/**
 * Closing statement information available
 * @return {Boolean} Boolean
 */
CreditCardV1MessageSetInfo.prototype.getClosingAvail = function() {
  return this.closingAvail;
};
Element.add({name: "CLOSINGAVAIL", required: true, order: 20, owner: CreditCardV1MessageSetInfo, /*type: Boolean,*/ fcn: "getClosingAvail"});


CreditCardV1MessageSetInfo.prototype.setClosingAvail = function(/*Boolean*/ closingAvail) {
  this.closingAvail = closingAvail;
};


/**
 * Image profile (if supported)
 * @return {ImageProfile} ImageProfile
 */
CreditCardV1MessageSetInfo.prototype.getImageProfile = function() {
  return this.imageProfile;
};
ChildAggregate.add({name: "IMAGEPROF", order: 10, owner: CreditCardV1MessageSetInfo, /*type: ImageProfile,*/ fcn: "getImageProfile"});


CreditCardV1MessageSetInfo.prototype.setImageProfile = function(/*ImageProfile*/ imageProfile) {
  this.imageProfile = imageProfile;
};




module.exports = CreditCardV1MessageSetInfo;
