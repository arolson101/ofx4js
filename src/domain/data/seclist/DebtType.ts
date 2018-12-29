
/**
 * The type of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export enum DebtType {
  COUPON,
  ZERO
}

export function DebtType_fromOfx(ofxVal: string): DebtType {
  if ("COUPON" === ofxVal) {
    return DebtType.COUPON;
  } else if ("ZERO" === ofxVal) {
    return DebtType.ZERO;
  } else {
    return null;
  }
}
