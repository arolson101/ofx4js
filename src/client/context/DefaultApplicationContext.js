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

var inherit = require("../../util/inherit");
var OFXApplicationContext = require("./OFXApplicationContext");

/**
 * Default application context.
 * 
 * @class
 */
function DefaultApplicationContext () {

  /**
   * @name DefaultApplicationContext#appId
   * @type String
   * @access private
   */
  this.appId = null;

  /**
   * @name DefaultApplicationContext#appVersion
   * @type String
   * @access private
   */
  this.appVersion = null;
}

inherit(DefaultApplicationContext, "implements", OFXApplicationContext);




DefaultApplicationContext.prototype.DefaultApplicationContext = function(/*String*/ appId, /*String*/ appVersion) {
  this.appId = appId;
  this.appVersion = appVersion;
};


DefaultApplicationContext.prototype.getAppId = function() {
  return this.appId;
};


DefaultApplicationContext.prototype.getAppVersion = function() {
  return this.appVersion;
};




module.exports = DefaultApplicationContext;
