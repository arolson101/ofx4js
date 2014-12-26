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
 * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
 * @class
 * @see "Section 8.8 OFX Spec"
 */

function OtherEnrollment () {

  /**
   * @name OtherEnrollment#message
   * @type String
   * @access private
   */
  this.message = null;
}



Aggregate.add("OTHERENROLL", OtherEnrollment);


/**
 * Message to consumer about what to do next (for example, a phone number),
 * @return {String} String
 */
OtherEnrollment.prototype.getMessage = function() {
  return this.message;
};
Element.add({name: "MESSAGE", required: true, order: 0, owner: OtherEnrollment, /*type: String,*/ readMethod: "getMessage", writeMethod: "setMessage"});


OtherEnrollment.prototype.setMessage = function(/*String*/ message) {
  this.message = message;
};




module.exports = OtherEnrollment;
