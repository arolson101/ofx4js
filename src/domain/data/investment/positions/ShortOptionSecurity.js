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
 * How a short option is secured.
 * See "Section 13.9.2.4.4, OFX Spec"
 *
 * @enum
 */
var ShortOptionSecurity = {
  NAKED: "NAKED",
  COVERED: "COVERED",

  fromOfx: function(/*String*/ ofxVal) {
    if ("NAKED" === ofxVal) {
      return ShortOptionSecurity.NAKED;
    } else if ("COVERED" === ofxVal) {
      return ShortOptionSecurity.COVERED;
    } else {
      return null;
    }
  }
};


module.exports = ShortOptionSecurity;
