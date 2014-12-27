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
 * Interface for converting to/from OFX strings.
 *
 * @class
 */
function StringConversion() {
}

/**
 * Convert the specified object to a string.
 *
 * @param {Object} value The value to convert to a string.
 * @return {String} The string.
 */
StringConversion.prototype.toString = function(/*value*/) { throw new Error("not implemented"); };

/**
 * Convert the specified value to an object of the specified type.
 *
 * @param {Class<E>} clazz The class.
 * @param {String} value The value.
 * @return {E} The converted value.
 * @throws OFXSyntaxException If there was something wrong with the syntax of the string.
 */
StringConversion.prototype.fromString = function(/*clazz, value*/) { throw new Error("not implemented"); };


module.exports = StringConversion;
