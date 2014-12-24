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
 * A message set enclosed in an OFX request envelope.
 *
 * @class
 */
function RequestMessageSet () {

  /**
   * @name RequestMessageSet#version
   * @type String
   * @access private
   */
  this.version = "1";
}


RequestMessageSet.prototype.getType = function() { throw new Error("not implemented"); };

/**
 * The version of this request message.
 *
 * @return {String} The version of this request message.
 */
RequestMessageSet.prototype.getVersion = function() {
  return this.version;
};

/**
 * The version of this request message.
 *
 * @param {String} version The version of this request message.
 */
RequestMessageSet.prototype.setVersion = function(version) {
  this.version = version;
};

/**
 * The request messages for this request message set.
 *
 * @return {RequestMessage[]} The request messages for this request message set.
 */
RequestMessageSet.prototype.getRequestMessages = function() { throw new Error("not implemented"); };

// Inherited.
RequestMessageSet.prototype.compareTo = function(/*RequestMessageSet*/ o) {
  return this.getType().compareTo(o.getType());
};




module.exports = RequestMessageSet;
