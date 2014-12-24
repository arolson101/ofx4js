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
 * Type of income.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var IncomeType = {
  LONG_TERM_CAP_GAINS: 0,
  SHORT_TERM_CAP_GAINS: 1,
  DIVIDEND: 2,
  INTEREST: 3,
  MISC: 4,

  fromOfx: function(/*String*/ ofxVal) {
    if ("CGLONG".equals(ofxVal)) {
      return IncomeType.LONG_TERM_CAP_GAINS;
    } else if ("CGSHORT".equals(ofxVal)) {
      return IncomeType.SHORT_TERM_CAP_GAINS;
    } else if ("DIV".equals(ofxVal)) {
      return IncomeType.DIVIDEND;
    } else if ("INTEREST".equals(ofxVal)) {
      return IncomeType.INTEREST;
    } else if ("MISC".equals(ofxVal)) {
      return IncomeType.MISC;
    } else {
      return null;
    }
  }
};


module.exports = IncomeType;
