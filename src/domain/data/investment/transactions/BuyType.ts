
/**
 * Type of purchase for stocks and mutual funds.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum BuyType {
  BUY,
  BUY_TO_COVER
}

export function BuyType_fromOfx(ofxVal: string): BuyType {
  if ("BUY" === ofxVal) {
    return BuyType.BUY;
  } else if ("BUYTOCOVER" === ofxVal) {
    return BuyType.BUY_TO_COVER;
  } else {
    return null;
  }
}
