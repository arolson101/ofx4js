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

/**
 * Holder for an unknown status code.
 *
 * @author Ryan Heaton
 */
function UnknownStatusCode () {

  /**
   * @name UnknownStatusCode#code
   * @type int
   * @access private
   */
  this.code = null;

  /**
   * @name UnknownStatusCode#message
   * @type String
   * @access private
   */
  this.message = null;

  /**
   * @name UnknownStatusCode#defaultSeverity
   * @type Status.Severity
   * @access private
   */
  this.defaultSeverity = null;
}

inherit(UnknownStatusCode, "implements", StatusCode);




UnknownStatusCode.prototype.UnknownStatusCode = function(/*int*/ code, /*String*/ message, /*Severity*/ defaultSeverity) {
  this.code = code;
  this.message = message;
  this.defaultSeverity = defaultSeverity;
};


UnknownStatusCode.prototype.getCode = function() {
  return code;
};


UnknownStatusCode.prototype.getMessage = function() {
  return message;
};


UnknownStatusCode.prototype.getDefaultSeverity = function() {
  return defaultSeverity;
};


// @Override
UnknownStatusCode.prototype.toString = function() {
  return String.valueOf(code);
};




module.exports = UnknownStatusCode;
