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

var ResponseMessage = require("../ResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * Response to a change a user password request.
 *
 * @class
 * @augments ResponseMessage
 * @see "Section 2.5.2.2, OFX Spec."
 */
function PasswordChangeResponse () {

  /**
   * @name PasswordChangeResponse#userId
   * @type String
   * @access private
   */
  this.userId = null;

  /**
   * @name PasswordChangeResponse#changeTimestamp
   * @type Date
   * @access private
   */
  this.changeTimestamp = null;
}

inherit(PasswordChangeResponse, "extends", ResponseMessage);


Aggregate.add("PINCHRQ", PasswordChangeResponse);


/**
 * The id of the user changing password.
 *
 * @return {String} The id of the user changing password.
 */
PasswordChangeResponse.prototype.getUserId = function() {
  return this.userId;
};
Element.add({name: "USERID", required: true, order: 0, owner: PasswordChangeResponse, /*type: String,*/ fcn: "getUserId"});


// Inherited.
PasswordChangeResponse.prototype.getResponseMessageName = function() {
  return "password change";
};


/**
 * The id of the user changing password.
 *
 * @param {String} userId The id of the user changing password.
 */
PasswordChangeResponse.prototype.setUserId = function(userId) {
  this.userId = userId;
};


/**
 * The timestamp of the password change.
 *
 * @return {Date} The timestamp of the password change.
 */
PasswordChangeResponse.prototype.getChangeTimestamp = function() {
  return this.changeTimestamp;
};
Element.add({name: "DTCHANGED", order: 10, owner: PasswordChangeResponse, /*type: Date,*/ fcn: "getChangeTimestamp"});


/**
 * The timestamp of the password change.
 *
 * @param {Date} changeTimestamp The timestamp of the password change.
 */
PasswordChangeResponse.prototype.setChangeTimestamp = function(changeTimestamp) {
  this.changeTimestamp = changeTimestamp;
};




module.exports = PasswordChangeResponse;
