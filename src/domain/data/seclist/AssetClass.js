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
 * Asset class for debt.
 * @see "Section 13.8.5.7, OFX Spec"
 *
 * @author Jon Perlow
 */
var AssetClass = {
  /**
   * Government: 0 or corporate bonds issued in the United States.
   */
  DOMESTIC_BOND: 1,

  /**
   * Government: 2 or corporate bonds issued in foreign countries or the United States.
   */
  INTL_BOND: 3,

  /**
   * Stocks: 4 for US companies with market caps of $2B or more.
   */
  LARGE_STOCK: 5,

  /**
   * Stocks: 6 for US companies with market caps of ~$100M to $2B.
   */
  SMALL_STOCK: 7,

  /**
   * Publicallt: 8 traded stocks for companies based in foreign countries.
   */
  INTL_STOCK: 9,

  /**
   * Stable: 10, short-term investments which provide income that rises and falls with short-term
   * interest: 11 rates.
   */
  MONEY_MARKET: 12,

  /**
   * Investments: 13 which do not fit into any of the other types.
   */
  OTHER: 14;

  fromOfx: function(/*String*/ ofxVal) {
    if ("DOMESTICBOND".equals(ofxVal)) {
      return DOMESTIC_BOND;
    } else if ("INTLBOND".equals(ofxVal)) {
      return INTL_BOND;
    } else if ("LARGESTOCK".equals(ofxVal)) {
      return LARGE_STOCK;
    } else if ("SMALLSTOCK".equals(ofxVal)) {
      return SMALL_STOCK;
    } else if ("INTLSTOCK".equals(ofxVal)) {
      return INTL_STOCK;
    } else if ("MONEYMARKET".equals(ofxVal)) {
      return MONEY_MARKET;
    } else if ("OTHER".equals(ofxVal)) {
      return OTHER;
    } else {
      return null;
    }
  }
}
;


module.exports = AssetClass;
