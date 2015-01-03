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

var OFXV2Writer = require("../../io/v2/OFXV2Writer");
var OFXV1Connection = require("./OFXV1Connection");


/**
 * @class
 */
function OFXV2Connection () {
  OFXV2Connection.call(this);
}

inherit(OFXV2Connection, "extends", OFXV1Connection);




// @Override
OFXV2Connection.prototype.newOFXWriter = function(/*OutputStream*/ out) {
  return new OFXV2Writer(out);
};




module.exports = OFXV2Connection;
