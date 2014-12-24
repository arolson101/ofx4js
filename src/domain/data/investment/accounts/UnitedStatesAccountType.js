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
 * @enum
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
  UGMA: 21,
  
  fromOfx: function(/*String*/ ofxVal) {
    if ("401K".equals(ofxVal)) {
      return UnitedStatesAccountType.R401K;
    } else if ("403B".equals(ofxVal)) {
      return UnitedStatesAccountType.R403B;
    } else if ("IRA".equals(ofxVal)) {
      return UnitedStatesAccountType.IRA;
    } else if ("KEOUGH".equals(ofxVal)) {
      return UnitedStatesAccountType.KEOUGH;
    } else if ("OTHER".equals(ofxVal)) {
      return UnitedStatesAccountType.OTHER;
    } else if ("SARSEP".equals(ofxVal)) {
      return UnitedStatesAccountType.SARSEP;
    } else if ("SIMPLE".equals(ofxVal)) {
      return UnitedStatesAccountType.SIMPLE;
    } else if ("NORMAL".equals(ofxVal)) {
      return UnitedStatesAccountType.NORMAL;
    } else if ("TDA".equals(ofxVal)) {
      return UnitedStatesAccountType.TDA;
    } else if ("TRUST".equals(ofxVal)) {
      return UnitedStatesAccountType.TRUST;
    } else if ("UGMA".equals(ofxVal)) {
      return UnitedStatesAccountType.UGMA;
    } else {
      return null;
    }
  }
};


module.exports = UnitedStatesAccountType;
