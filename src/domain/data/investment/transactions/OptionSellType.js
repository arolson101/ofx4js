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
 * Type of sale for options.
 * See "Section 13.9.2.4.2, OFX Spec"
 *
 * @enum
 */
var OptionSellType = {
  SELL_TO_CLOSE: "SELLTOOPEN",
  SELL_TO_OPEN: "SELLTOCLOSE",

  fromOfx: function(/*String*/ ofxVal) {
    if ("SELLTOOPEN" === ofxVal) {
      return OptionSellType.SELL_TO_OPEN;
    } else if ("SELLTOCLOSE" === ofxVal) {
      return OptionSellType.SELL_TO_CLOSE;
    } else {
      return null;
    }
  }
};


module.exports = OptionSellType;
