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
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var Inv401KSource = {
  PRETAX: 0,
  AFTER_TAX: 1,
  MATCH: 2,
  PROFIT_SHARING: 3,
  ROLLOVER: 4,
  OTHER_VEST: 5,
  OTHER_NONVEST: 6,
  
  fromOfx: function(/*String*/ ofxVal) {
    if ("PRETAX" === ofxVal) {
      return Inv401KSource.PRETAX;
    } else if ("AFTERTAX" === ofxVal) {
      return Inv401KSource.AFTER_TAX;
    } else if ("MATCH" === ofxVal) {
      return Inv401KSource.MATCH;
    } else if ("PROFITSHARING" === ofxVal) {
      return Inv401KSource.PROFIT_SHARING;
    } else if ("ROLLOVER" === ofxVal) {
      return Inv401KSource.ROLLOVER;
    } else if ("OTHERVEST" === ofxVal) {
      return Inv401KSource.OTHER_VEST;
    } else if ("OTHERNONVEST" === ofxVal) {
      return Inv401KSource.OTHER_NONVEST;
    } else {
      return null;
    }
  }
};


module.exports = Inv401KSource;
