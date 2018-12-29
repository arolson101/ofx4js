
/**
 * Reason debt was sold.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum SellDebtReason {
  CALL,
  SELL,
  MATURITY
}

export function SellDebtReason_fromOfx(ofxVal: string): SellDebtReason {
  if ("CALL" === ofxVal) {
    return SellDebtReason.CALL;
  } else if ("SELL" === ofxVal) {
    return SellDebtReason.SELL;
  } else if ("MATURITY" === ofxVal) {
    return SellDebtReason.MATURITY;
  } else {
    return null;
  }
}
