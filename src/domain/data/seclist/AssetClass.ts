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
 * Asset class for debt.
 * @see "Section 13.8.5.7, OFX Spec"
 *
 * @author Jon Perlow
 */
export enum AssetClass {
  /**
   * Government or corporate bonds issued in the United States.
   */
  DOMESTIC_BOND,

  /**
   * Government or corporate bonds issued in foreign countries or the United States.
   */
  INTL_BOND,

  /**
   * Stocks for US companies with market caps of $2B or more.
   */
  LARGE_STOCK,

  /**
   * Stocks for US companies with market caps of ~$100M to $2B.
   */
  SMALL_STOCK,

  /**
   * Publicallt traded stocks for companies based in foreign countries.
   */
  INTL_STOCK,

  /**
   * Stable, short-term investments which provide income that rises and falls with short-term
   * interest rates.
   */
  MONEY_MARKET,

  /**
   * Investments which do not fit into any of the other types.
   */
  OTHER
}

export function AssetClass_fromOfx(ofxVal: string): AssetClass {
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

}