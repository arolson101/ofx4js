
/**
 * Type of sale for options.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum OptionSellType {
  SELL_TO_CLOSE,
  SELL_TO_OPEN
}

export function OptionSellType_fromOfx(ofxVal: string): OptionSellType {
  if ("SELLTOOPEN" === ofxVal) {
    return OptionSellType.SELL_TO_OPEN;
  } else if ("SELLTOCLOSE" === ofxVal) {
    return OptionSellType.SELL_TO_CLOSE;
  } else {
    return null;
  }
}
