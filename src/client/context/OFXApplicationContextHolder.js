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

var DefaultApplicationContext = require("./DefaultApplicationContext");

/**
 * @class
 */
var OFXApplicationContextHolder = {};


/**
 * @name OFXApplicationContextHolder.CURRENT_CONTEXT
 * @type OFXApplicationContext
 */
OFXApplicationContextHolder.CURRENT_CONTEXT = new DefaultApplicationContext("Money", "1600"); //some apps fail unless you're Quicken or Money...




/**
 * Get the current (thread-safe) context.
 *
 * @return {OFXApplicationContext} The thread-safe context.
 */
OFXApplicationContextHolder.getCurrentContext = function() {
  //todo: implement a strategy (perhaps for thread-local access or something)?
  return OFXApplicationContextHolder.CURRENT_CONTEXT;
};


/**
 * Set the current context.
 *
 * @param {OFXApplicationContext} context The context.
 */
OFXApplicationContextHolder.setCurrentContext = function(context) {
  OFXApplicationContextHolder.CURRENT_CONTEXT = context;
};




module.exports = OFXApplicationContextHolder;
