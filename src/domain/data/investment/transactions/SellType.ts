
/**
 * Type of sale for stocks and mutual funds.
 */
export enum SellType {
  SELL,
  SELL_SHORT
}

export function SellType_fromOfx(ofxVal: string): SellType {
  if ("SELL" === ofxVal) {
    return SellType.SELL;
  } else if ("SELLSHORT" === ofxVal) {
    return SellType.SELL_SHORT;
  } else {
    return null;
  }
}
