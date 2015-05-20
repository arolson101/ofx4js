/*
 * Copyright 2010 Web Cohesion
 *
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

/**
 * Activation status of an account.
 * @see "Section 13.6.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export enum ActivationStatus {
  ACTIVE,
  PENDING,
  AVAILABLE
}

export function ActivationStatus_fromOfx(ofxVal: string): ActivationStatus {
  if ("ACTIVE" === ofxVal) {
    return ActivationStatus.ACTIVE;
  } else if ("PEND" === ofxVal) {
    return ActivationStatus.PENDING;
  } else if ("AVAIL" === ofxVal) {
    return ActivationStatus.AVAILABLE;
  } else {
    return null;
  }
}

