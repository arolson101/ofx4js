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
 * Type of option.
 * See "Section 13.8.5.4, OFX Spec"
 *
 * @enum
 */
var OptionType = {
  PUT: "PUT",
  CALL: "CALL",

  fromOfx: function(/*String*/ ofxVal) {
    if ("PUT" === ofxVal) {
      return OptionType.PUT;
    } else if ("CALL" === ofxVal) {
      return OptionType.CALL;
    } else {
      return null;
    }
  }
};


module.exports = OptionType;
