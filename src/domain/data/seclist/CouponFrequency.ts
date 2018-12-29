
/**
 * Coupon freqency for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export enum CouponFrequency {
  MONTHLY,
  QUARTERLY,
  SEMIANNUAL,
  ANNUAL,
  OTHER
}

export function CouponFrequency_fromOfx(ofxVal: string): CouponFrequency {
  if ("MONTHLY" === ofxVal) {
    return CouponFrequency.MONTHLY;
  } else if ("QUARTERLY" === ofxVal) {
    return CouponFrequency.QUARTERLY;
  } else if ("SEMIANNUAL" === ofxVal) {
    return CouponFrequency.SEMIANNUAL;
  } else if ("ANNUAL" === ofxVal) {
    return CouponFrequency.ANNUAL;
  } else if ("OTHER" === ofxVal) {
    return CouponFrequency.OTHER;
  } else {
    return null;
  }
}
