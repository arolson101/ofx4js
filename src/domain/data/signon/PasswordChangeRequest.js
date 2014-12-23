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

var RequestMessage = require("domain/data/RequestMessage");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

/**
 * Request to change a user password.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.2.1, OFX Spec."
 */
function PasswordChangeRequest () {

  /**
   * @name PasswordChangeRequest#userId
   * @type String
   * @access private
   */
  this.userId = null;

  /**
   * @name PasswordChangeRequest#newPassword
   * @type String
   * @access private
   */
  this.newPassword = null;
}

inherit(PasswordChangeRequest, "extends", RequestMessage);


Aggregate.add("PINCHRQ", PasswordChangeRequest);


/**
 * The id of the user changing password.
 *
 * @return {String} The id of the user changing password.
 */
PasswordChangeRequest.prototype.getUserId = function() {
  return userId;
};
Element.add({name: "USERID", required: true, order: 0, owner: PasswordChangeRequest, /*type: String,*/ fcn: "getUserId"});


/**
 * The id of the user changing password.
 *
 * @param {String} userId The id of the user changing password.
 */
PasswordChangeRequest.prototype.setUserId = function(userId) {
  this.userId = userId;
};


/**
 * The new password.
 *
 * @return {String} The new password.
 */
PasswordChangeRequest.prototype.getNewPassword = function() {
  return newPassword;
};
Element.add({name: "NEWUSERPASS", required: true, order: 10, owner: PasswordChangeRequest, /*type: String,*/ fcn: "getNewPassword"});


/**
 * The new password.
 *
 * @param {String} newPassword The new password.
 */
PasswordChangeRequest.prototype.setNewPassword = function(newPassword) {
  this.newPassword = newPassword;
};




module.exports = PasswordChangeRequest;
