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
 * Reason debt was sold.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var SellDebtReason = {
  CALL: 0,
  SELL: 1,
  MATURITY: 2;

  fromOfx: function(/*String*/ ofxVal) {
    if ("CALL".equals(ofxVal)) {
      return CALL;
    } else if ("SELL".equals(ofxVal)) {
      return SELL;
    } else if ("MATURITY".equals(ofxVal)) {
      return MATURITY;
    } else {
      return null;
    }
  }
}
;


module.exports = SellDebtReason;
