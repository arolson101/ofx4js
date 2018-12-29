
 /**
 * Asset class for debt.
 * @see "Section 13.8.5.7, OFX Spec"
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
