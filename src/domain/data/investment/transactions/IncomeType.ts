
/**
 * Type of income.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum IncomeType {
  LONG_TERM_CAP_GAINS,
  SHORT_TERM_CAP_GAINS,
  DIVIDEND,
  INTEREST,
  MISC
}

export function IncomeType_fromOfx(ofxVal: string): IncomeType {
  if ("CGLONG" === ofxVal) {
    return IncomeType.LONG_TERM_CAP_GAINS;
  } else if ("CGSHORT" === ofxVal) {
    return IncomeType.SHORT_TERM_CAP_GAINS;
  } else if ("DIV" === ofxVal) {
    return IncomeType.DIVIDEND;
  } else if ("INTEREST" === ofxVal) {
    return IncomeType.INTEREST;
  } else if ("MISC" === ofxVal) {
    return IncomeType.MISC;
  } else {
    return null;
  }
}
