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
var StatusCode = require("./StatusCode");

/**
 * Holder for an unknown status code.
 *
 * @class
 * @augments StatusCode
 */
function UnknownStatusCode (/*int*/ code, /*String*/ message, /*Severity*/ defaultSeverity) {

  /**
   * @name UnknownStatusCode#code
   * @type int
   * @access private
   */
  this.code = code;

  /**
   * @name UnknownStatusCode#message
   * @type String
   * @access private
   */
  this.message = message;

  /**
   * @name UnknownStatusCode#defaultSeverity
   * @type Status.Severity
   * @access private
   */
  this.defaultSeverity = defaultSeverity;
}

inherit(UnknownStatusCode, "implements", StatusCode);




UnknownStatusCode.prototype.getCode = function() {
  return this.code;
};


UnknownStatusCode.prototype.getMessage = function() {
  return this.message;
};


UnknownStatusCode.prototype.getDefaultSeverity = function() {
  return this.defaultSeverity;
};


// @Override
UnknownStatusCode.prototype.toString = function() {
  return String.valueOf(this.code);
};




module.exports = UnknownStatusCode;
