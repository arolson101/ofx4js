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
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
var Inv401KSource = {
  PRETAX: 0,
  AFTER_TAX: 1,
  MATCH: 2,
  PROFIT_SHARING: 3,
  ROLLOVER: 4,
  OTHER_VEST: 5,
  OTHER_NONVEST: 6;

  static: 7 Map<String, Inv401KSource> ofxMapping = new HashMap<String, Inv401KSource>();
  static: 8 {
    ofxMapping: 9.put("PRETAX", PRETAX);
    ofxMapping: 10.put("AFTERTAX", AFTER_TAX);
    ofxMapping: 11.put("MATCH", MATCH);
    ofxMapping: 12.put("PROFITSHARING", PROFIT_SHARING);
    ofxMapping: 13.put("ROLLOVER", ROLLOVER);
    ofxMapping: 14.put("OTHERVEST", OTHER_VEST);
    ofxMapping: 15.put("OTHERNONVEST", OTHER_NONVEST);
  };


module.exports = Inv401KSource;

  public static Inv401KSource fromOfx(String ofxVal) {
