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
 * See "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var IncomeType = {
  LONG_TERM_CAP_GAINS: "CGLONG",
  SHORT_TERM_CAP_GAINS: "CGSHORT",
  DIVIDEND: "DIV",
  INTEREST: "INTEREST",
  MISC: "MISC",

  fromOfx: function(/*String*/ ofxVal) {
    if ("CGLONG" === ofxVal) {
      return IncomeType.LONG_TERM_CAP_GAINS;
    } else if ("CGSHORT" === ofxVal) {
      return IncomeType.SHORT_TERM_CAP_GAINS;
    } else if ("DIV" === ofxVal) {
      return IncomeType.DIVIDEND;
    } else if ("INTEREST" === ofxVal) {
      return IncomeType.INTEREST;
    } else if ("MISC" === ofxVal) {
      return IncomeType.MISC;
    } else {
      return null;
    }
  }
};


module.exports = IncomeType;
