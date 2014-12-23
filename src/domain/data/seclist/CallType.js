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

var inherit = require("../inherit");

/**
 * Call type for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var CallType = {
  CALL: 0,
  PUT: 1,
  PREFUND: 2,
  MATURITY: 3;

  fromOfx: function(/*String*/ ofxVal) {
    if ("CALL".equals(ofxVal)) {
      return CALL;
    } else if ("PUT".equals(ofxVal)) {
      return PUT;
    } else if ("PREFUND".equals(ofxVal)) {
      return PREFUND;
    } else if ("MATURITY".equals(ofxVal)) {
      return MATURITY;
    } else {
      return null;
    }
  }
}
;


module.exports = CallType;
