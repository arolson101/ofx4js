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
 * Basic interface for reading an OFX document.
 *
 * @class
 */
function OFXReader() {
}

/**
 * Set the handler for this OFX reader.
 *
 * @param {OFXHandler} handler The handler.
 */
OFXReader.prototype.setContentHandler = function(/*handler*/) { throw new Error("not implemented"); };

/**
 * Parse a stream.
 *
 * @param {string} text The stream or reader to parse.
 */
OFXReader.prototype.parse = function(/*text*/) { throw new Error("not implemented"); };


module.exports = OFXReader;
