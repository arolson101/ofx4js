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
 * Activation status of an account.
 * @see "Section 13.6.2, OFX Spec"
 *
 * @enum
 */
var ActivationStatus = {
  ACTIVE: 0,
  PENDING: 1,
  AVAILABLE: 2,

  fromOfx: function(/*String*/ ofxVal) {
    if ("ACTIVE".equals(ofxVal)) {
      return ActivationStatus.ACTIVE;
    } else if ("PEND".equals(ofxVal)) {
      return ActivationStatus.PENDING;
    } else if ("AVAIL".equals(ofxVal)) {
      return ActivationStatus.AVAILABLE;
    } else {
      return null;
    }
  }
}
;


module.exports = ActivationStatus;
