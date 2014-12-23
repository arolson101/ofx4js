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
 * Coupon freqency for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var CouponFrequency = {
  MONTHLY: 0,
  QUARTERLY: 1,
  SEMIANNUAL: 2,
  ANNUAL: 3,
  OTHER: 4;

  fromOfx: function(/*String*/ ofxVal) {
    if ("MONTHLY".equals(ofxVal)) {
      return MONTHLY;
    } else if ("QUARTERLY".equals(ofxVal)) {
      return QUARTERLY;
    } else if ("SEMIANNUAL".equals(ofxVal)) {
      return SEMIANNUAL;
    } else if ("ANNUAL".equals(ofxVal)) {
      return ANNUAL;
    } else if ("OTHER".equals(ofxVal)) {
      return OTHER;
    } else {
      return null;
    }
  }
}
;


module.exports = CouponFrequency;
