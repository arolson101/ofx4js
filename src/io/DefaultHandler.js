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

var inherit = require("../util/inherit");
var OFXHandler = require("./OFXHandler");

/**
 * Default (no-op) implementation of an OFX handler.
 *
 * @class
 */
function DefaultHandler () {
}

inherit(DefaultHandler, "implements", OFXHandler);




DefaultHandler.prototype.onHeader = function(/*name, value*/) {
};


DefaultHandler.prototype.onElement = function(/*name, value*/) {
};


DefaultHandler.prototype.startAggregate = function(/*aggregateName*/) {
};


DefaultHandler.prototype.endAggregate = function(/*aggregateName*/) {
};




module.exports = DefaultHandler;
