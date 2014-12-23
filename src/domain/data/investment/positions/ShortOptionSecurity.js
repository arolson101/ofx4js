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
 * How a short option is secured.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var ShortOptionSecurity = {
  NAKED: 0,
  COVERED: 1;

  fromOfx: function(/*String*/ ofxVal) {
    if ("NAKED".equals(ofxVal)) {
      return NAKED;
    } else if ("COVERED".equals(ofxVal)) {
      return COVERED;
    } else {
      return null;
    }
  }
}
;


module.exports = ShortOptionSecurity;
