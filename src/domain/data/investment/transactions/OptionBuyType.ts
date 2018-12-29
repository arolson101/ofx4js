
/**
 * Type of purchase for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum OptionBuyType {
  BUY_TO_OPEN,
  BUY_TO_CLOSE
}

export function OptionBuyType_fromOfx(ofxVal: string): OptionBuyType {
  if ("BUYTOOPEN" === ofxVal) {
    return OptionBuyType.BUY_TO_OPEN;
  } else if ("BUYTOCLOSE" === ofxVal) {
    return OptionBuyType.BUY_TO_CLOSE;
  } else {
    return null;
  }
}
