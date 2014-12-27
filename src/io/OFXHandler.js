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
 * Handler for events during OFX parsing.
 *
 * @author Ryan Heaton
 */
function OFXHandler() {
}

/**
 * Handler an OFX header.
 *
 * @param {String} name The name of the header.
 * @param {String} value The value of the header.
 */
OFXHandler.prototype.onHeader = function(/*name, value*/) { throw new Error("not implemented"); };

/**
 * Handle a new OFX element.
 *
 * @param {String} name The name of the element.
 * @param {String} value The value of the element.
 */
OFXHandler.prototype.onElement = function(/*name, value*/) { throw new Error("not implemented"); };

/**
 * Handle the start of a new OFX aggregate.
 *
 * @param {String} aggregateName The name of the aggregate.
 */
OFXHandler.prototype.startAggregate = function(/*aggregateName*/) { throw new Error("not implemented"); };

/**
 * Handle the end of an OFX aggregate.
 *
 * @param {String} aggregateName The aggregate name.
 */
OFXHandler.prototype.endAggregate = function(/*aggregateName*/) { throw new Error("not implemented"); };


module.exports = OFXHandler;
