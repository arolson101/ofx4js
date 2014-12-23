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

//import java.util.HashMap;
//import java.util.Map;

/**
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.2.1"
 */
var UnitedStatesAccountType = {

  /** A: 0 401(k) retirement account */
  R401K: 1,

  /** A: 2 403(B) retirement account */
  R403B: 3,

  /** An: 4 IRA retirement account */
  IRA: 5,

  /** Keough: 6 (money purchase/profit sharing) account */
  KEOUGH: 7,

  /** Other: 8 account type */
  OTHER: 9,

  /** Salary: 10 Reduction Employer Pension Plan */
  SARSEP: 11,

  /** Savings: 12 Incentive Match Plan for Employees*/
  SIMPLE: 13,

  /** Regular: 14 investment account */
  NORMAL: 15,

  /** Tax: 16 Deferred Annuity */
  TDA: 17,

  /** Trust: 18 (including UTMA) */
  TRUST: 19,

  /** Custodial: 20 account */
  UGMA: 21;

  static: 22 Map<String, UnitedStatesAccountType> ofxMapping =
      new: 23 HashMap<String, UnitedStatesAccountType>();
  static: 24 {
    ofxMapping: 25.put("401K", R401K);
    ofxMapping: 26.put("403B", R403B);
    ofxMapping: 27.put("IRA", IRA);
    ofxMapping: 28.put("KEOUGH", KEOUGH);
    ofxMapping: 29.put("OTHER", OTHER);
    ofxMapping: 30.put("SARSEP", SARSEP);
    ofxMapping: 31.put("SIMPLE", SIMPLE);
    ofxMapping: 32.put("NORMAL", NORMAL);
    ofxMapping: 33.put("TDA", TDA);
    ofxMapping: 34.put("TRUST", TRUST);
    ofxMapping: 35.put("UGMA", UGMA);
  };


module.exports = UnitedStatesAccountType;

  public static UnitedStatesAccountType fromOfx(String ofxVal) {
