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
 * An OFX aggregate is just an aggregate of name-value pairs that identify the elements and element values of the aggregate.
 * The element values can strings or another (sub)aggregate.  The implementation of a
 *
 * @class
 */
function OFXAggregate() {
}

/**
 * The name of the OFX aggregate.
 *
 * @return {String} The name of the aggregate.
 */
OFXAggregate.prototype.getName = function() { throw new Error("not implemented"); };

/**
 * Whether this aggregate contains the specified element.
 *
 * @param {String} elementName The name of the element.
 * @return {boolean} Whether this aggregate contains the specified element.
 */
OFXAggregate.prototype.containsElement = function(/*elementName*/) { throw new Error("not implemented"); };

/**
 * The element names of this aggregate.
 *
 * @return {String[]} The element names of this aggregate.
 */
OFXAggregate.prototype.elementNames = function() { throw new Error("not implemented"); };

/**
 * The value of the element.  This will be either a string or another OFXAggregate.
 *
 * @param {String} elementName The name of the element.
 * @return {Object} The value of the specified element.
 */
OFXAggregate.prototype.getElementValue = function(/*elementName*/) { throw new Error("not implemented"); };


module.exports = OFXAggregate;
