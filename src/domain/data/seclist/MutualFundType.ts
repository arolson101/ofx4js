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

module ofx4js.domain.data.seclist {

/**
 * The type of mutual fund.
 * @see "Section 13.8.5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export enum MutualFundType {
  OPEN_END,
  CLOSE_END,
  OTHER
}

export function MutualFundType_fromOfx(ofxVal: string): MutualFundType {
  if ("OPENEND" === ofxVal) {
    return MutualFundType.OPEN_END;
  } else if ("CLOSEEND" === ofxVal) {
    return MutualFundType.CLOSE_END;
  } else if ("OTHER" === ofxVal) {
    return MutualFundType.OTHER;
  } else {
    return null;
  }
}

}
