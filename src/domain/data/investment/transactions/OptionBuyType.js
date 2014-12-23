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
 * Type of purchase for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var OptionBuyType = {
  BUY_TO_OPEN: 0,
  BUY_TO_CLOSE: 1;

  fromOfx: function(/*String*/ ofxVal) {
    if ("BUYTOOPEN".equals(ofxVal)) {
      return BUY_TO_OPEN;
    } else if ("BUYTOCLOSE".equals(ofxVal)) {
      return BUY_TO_CLOSE;
    } else {
      return null;
    }
  }
}
;


module.exports = OptionBuyType;
