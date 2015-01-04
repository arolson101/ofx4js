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
 * Asset class for debt.
 * See "Section 13.8.5.7, OFX Spec"
 *
 * @enum
 */
var AssetClass = {
  /**
   * Government or corporate bonds issued in the United States.
   */
  DOMESTIC_BOND: "DOMESTICBOND",

  /**
   * Government or corporate bonds issued in foreign countries or the United States.
   */
  INTL_BOND: "INTLBOND",

  /**
   * Stocks for US companies with market caps of $2B or more.
   */
  LARGE_STOCK: "LARGESTOCK",

  /**
   * Stocks for US companies with market caps of ~$100M to $2B.
   */
  SMALL_STOCK: "SMALLSTOCK",

  /**
   * Publicallt traded stocks for companies based in foreign countries.
   */
  INTL_STOCK: "INTLSTOCK",

  /**
   * Stable, short-term investments which provide income that rises and falls with short-term
   * interest rates.
   */
  MONEY_MARKET: "MONEYMARKET",

  /**
   * Investments which do not fit into any of the other types.
   */
  OTHER: "OTHER",

  fromOfx: function(/*String*/ ofxVal) {
    if ("DOMESTICBOND" === ofxVal) {
      return AssetClass.DOMESTIC_BOND;
    } else if ("INTLBOND" === ofxVal) {
      return AssetClass.INTL_BOND;
    } else if ("LARGESTOCK" === ofxVal) {
      return AssetClass.LARGE_STOCK;
    } else if ("SMALLSTOCK" === ofxVal) {
      return AssetClass.SMALL_STOCK;
    } else if ("INTLSTOCK" === ofxVal) {
      return AssetClass.INTL_STOCK;
    } else if ("MONEYMARKET" === ofxVal) {
      return AssetClass.MONEY_MARKET;
    } else if ("OTHER" === ofxVal) {
      return AssetClass.OTHER;
    } else {
      return null;
    }
  }
};


module.exports = AssetClass;
