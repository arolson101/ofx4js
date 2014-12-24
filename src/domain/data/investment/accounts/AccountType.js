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
 * Type of investment account.
 *
 * @enum
 * @see "OFX Spec, Section 13.6.2"
 */
var AccountType = {
  INDIVIDUAL: 0,
  JOINT: 1,
  TRUST: 2,
  CORPORATE: 3,

  fromOfx: function(/*String*/ ofxVal) {
    if ("INDIVIDUAL".equals(ofxVal)) {
      return AccountType.INDIVIDUAL;
    } else if ("JOINT".equals(ofxVal)) {
      return AccountType.JOINT;
    } else if ("CORPORATE".equals(ofxVal)) {
      return AccountType.CORPORATE;
    } else if ("CORPORATE".equals(ofxVal)) {
      return AccountType.CORPORATE;
    } else {
      return null;
    }
  }
};


module.exports = AccountType;
