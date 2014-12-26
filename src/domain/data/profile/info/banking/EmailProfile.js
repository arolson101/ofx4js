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
 * Email Profile
 * @class
 * @see "Section 11.13.2.3 OFX Spec"
 */
function EmailProfile () {

  /**
   * @name EmailProfile#canEmail
   * @type Boolean
   * @access private
   */
  this.canEmail = null;

  /**
   * @name EmailProfile#canNotify
   * @type Boolean
   * @access private
   */
  this.canNotify = null;
}



Aggregate.add("EMAILPROF", EmailProfile);


EmailProfile.prototype.getCanEmail = function() {
  return this.canEmail;
};
Element.add(EmailProfile, {name: "CANEMAIL", required: true, order: 10, attributeType: bool, readMethod: "getCanEmail", writeMethod: "setCanEmail"});


EmailProfile.prototype.setCanEmail = function(/*Boolean*/ canEmail) {
  this.canEmail = canEmail;
};


EmailProfile.prototype.getCanNotify = function() {
  return this.canNotify;
};
Element.add(EmailProfile, {name: "CANNOTIFY", required: true, order: 20, attributeType: bool, readMethod: "getCanNotify", writeMethod: "setCanNotify"});


EmailProfile.prototype.setCanNotify = function(/*Boolean*/ canNotify) {
  this.canNotify = canNotify;
};




module.exports = EmailProfile;
