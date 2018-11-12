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
 * Type of investment account.
 *
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.2"
 */
export enum AccountType {
  INDIVIDUAL,
  JOINT,
  TRUST,
  CORPORATE,
}


export function AccountType_fromOfx(ofxVal: string): AccountType {
  if ("INDIVIDUAL" === ofxVal) {
    return AccountType.INDIVIDUAL;
  } else if ("JOINT" === ofxVal) {
    return AccountType.JOINT;
  } else if ("CORPORATE" === ofxVal) {
    return AccountType.CORPORATE;
  } else if ("CORPORATE" === ofxVal) {
    return AccountType.CORPORATE;
  } else {
    return null;
  }
}
