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

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

/**
 * Web Enrollment option containing URL to direct user for web based enrollment, if supported.
 * @class
 * @see "Section 8.8 OFX Spec"
 */
function WebEnrollment () {

  /**
   * @name WebEnrollment#url
   * @type String
   * @access private
   */
  this.url = null;
}



Aggregate.add("WEBENROLL", WebEnrollment);


/**
 * URL to start enrollment process
 * @return {String} String
 */
WebEnrollment.prototype.getUrl = function() {
  return this.url;
};
Element.add({name: "URL", required: true, order: 0, owner: WebEnrollment, /*type: String,*/ fcn: "getUrl"});


WebEnrollment.prototype.setUrl = function(/*String*/ url) {
  this.url = url;
};




module.exports = WebEnrollment;
