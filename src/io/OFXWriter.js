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
 * @class
 */
function OFXWriter() {
}

/**
 * Write the specified headers.
 *
 * @param {} headers The headers to be written.
 */
OFXWriter.prototype.writeHeaders = function(/*headers*/) { throw new Error("not implemented"); };

/**
 * Write the start of a new aggregate.
 *
 * @param {String} aggregateName The aggregate name.
 */
OFXWriter.prototype.writeStartAggregate = function(/*aggregateName*/) { throw new Error("not implemented"); };

/**
 * Write an element to the current aggregate.
 *
 * @param {String} name The name of the element.
 * @param {String} value The value of the element.
 */
OFXWriter.prototype.writeElement = function(/*name, value*/) { throw new Error("not implemented"); };

/**
 * Write the end of an aggregate.
 *
 * @param {String} aggregateName The aggregate name.
 * @throws IllegalArgumentException If the specified aggregate hasn't been started.
 */
OFXWriter.prototype.writeEndAggregate = function(/*aggregateName*/) { throw new Error("not implemented"); };

/**
 * Close this OFX writer.
 */
OFXWriter.prototype.close = function() { throw new Error("not implemented"); };


module.exports = OFXWriter;
