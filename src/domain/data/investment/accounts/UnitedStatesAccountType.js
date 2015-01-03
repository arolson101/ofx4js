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

  /** A 401(k) retirement account */
  R401K: "401K",

  /** A 403(B) retirement account */
  R403B: "403B",

  /** An IRA retirement account */
  IRA: "IRA",

  /** Keough (money purchase/profit sharing) account */
  KEOUGH: "KEOUGH",

  /** Other account type */
  OTHER: "OTHER",

  /** Salary Reduction Employer Pension Plan */
  SARSEP: "SARSEP",

  /** Savings Incentive Match Plan for Employees*/
  SIMPLE: "SIMPLE",

  /** Regular investment account */
  NORMAL: "NORMAL",

  /** Tax Deferred Annuity */
  TDA: "TDA",

  /** Trust (including UTMA) */
  TRUST: "TRUST",

  /** Custodial account */
  UGMA: "UGMA",
  
  fromOfx: function(/*String*/ ofxVal) {
    if ("401K" === ofxVal) {
      return UnitedStatesAccountType.R401K;
    } else if ("403B" === ofxVal) {
      return UnitedStatesAccountType.R403B;
    } else if ("IRA" === ofxVal) {
      return UnitedStatesAccountType.IRA;
    } else if ("KEOUGH" === ofxVal) {
      return UnitedStatesAccountType.KEOUGH;
    } else if ("OTHER" === ofxVal) {
      return UnitedStatesAccountType.OTHER;
    } else if ("SARSEP" === ofxVal) {
      return UnitedStatesAccountType.SARSEP;
    } else if ("SIMPLE" === ofxVal) {
      return UnitedStatesAccountType.SIMPLE;
    } else if ("NORMAL" === ofxVal) {
      return UnitedStatesAccountType.NORMAL;
    } else if ("TDA" === ofxVal) {
      return UnitedStatesAccountType.TDA;
    } else if ("TRUST" === ofxVal) {
      return UnitedStatesAccountType.TRUST;
    } else if ("UGMA" === ofxVal) {
      return UnitedStatesAccountType.UGMA;
    } else {
      return null;
    }
  }
};


module.exports = UnitedStatesAccountType;
