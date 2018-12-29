
/**
 * Types of well-known sub-accounts.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum SubAccountType {
  CASH,
  MARGIN,
  SHORT,
  OTHER
}

export function SubAccountType_fromOfx(ofxVal: string): SubAccountType {
  if ("CASH" === ofxVal) {
    return SubAccountType.CASH;
  } else if ("MARGIN" === ofxVal) {
    return SubAccountType.MARGIN;
  } else if ("SHORT" === ofxVal) {
    return SubAccountType.SHORT;
  } else if ("OTHER" === ofxVal) {
    return SubAccountType.OTHER;
  } else {
    return null;
  }
}
