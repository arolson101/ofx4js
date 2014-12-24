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

/**
 * A message set enclosed in a response envelope.
 *
 * @class
 */
function ResponseMessageSet () {

  /**
   * @name ResponseMessageSet#version
   * @type String
   * @access private
   */
  this.version = "1";
}


ResponseMessageSet.prototype.getType = function() { throw new Error("not implemented"); };

/**
 * The version of this message set.
 *
 * @return {String} The version of this message set.
 */
ResponseMessageSet.prototype.getVersion = function() {
  return this.version;
};

/**
 * The version of this message set.
 *
 * @param {String} version The version of this message set.
 */
ResponseMessageSet.prototype.setVersion = function(version) {
  this.version = version;
};

/**
 * The list of response messages.
 *
 * @return {ResponseMessage[]} The list of response messages.
 */
ResponseMessageSet.prototype.getResponseMessages = function() { throw new Error("not implemented"); };

// Inherited.
ResponseMessageSet.prototype.compareTo = function(/*ResponseMessageSet*/ o) {
  return this.getType().compareTo(o.getType());
};




module.exports = ResponseMessageSet;
