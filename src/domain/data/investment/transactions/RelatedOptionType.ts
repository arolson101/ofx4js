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
 * Related option transaction type.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export enum RelatedOptionType {
  SPREAD,
  STRADDLE,
  NONE,
  OTHER
}

export function RelatedOptionType_fromOfx(ofxVal: string): RelatedOptionType {
  if ("SPREAD" === ofxVal) {
    return RelatedOptionType.SPREAD;
  } else if ("STRADDLE" === ofxVal) {
    return RelatedOptionType.STRADDLE;
  } else if ("NONE" === ofxVal) {
    return RelatedOptionType.NONE;
  } else if ("OTHER" === ofxVal) {
    return RelatedOptionType.OTHER;
  } else {
    return null;
  }
}
