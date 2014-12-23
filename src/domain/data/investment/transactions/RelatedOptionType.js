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
 * Related option transaction type.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var RelatedOptionType = {
  SPREAD: 0,
  STRADDLE: 1,
  NONE: 2,
  OTHER: 3;

  fromOfx: function(/*String*/ ofxVal) {
    if ("SPREAD".equals(ofxVal)) {
      return SPREAD;
    } else if ("STRADDLE".equals(ofxVal)) {
      return STRADDLE;
    } else if ("NONE".equals(ofxVal)) {
      return NONE;
    } else if ("OTHER".equals(ofxVal)) {
      return OTHER;
    } else {
      return null;
    }
  }
}
;


module.exports = RelatedOptionType;
