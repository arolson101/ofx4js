
/**
 * Type of investment account.
 *
 * @see "OFX Spec, Section 13.6.2"
 */
export enum InvestmentAccountType {
  INDIVIDUAL,
  JOINT,
  TRUST,
  CORPORATE,
}


export function InvestmentAccountType_fromOfx(ofxVal: string): InvestmentAccountType {
  if ("INDIVIDUAL" === ofxVal) {
    return InvestmentAccountType.INDIVIDUAL;
  } else if ("JOINT" === ofxVal) {
    return InvestmentAccountType.JOINT;
  } else if ("CORPORATE" === ofxVal) {
    return InvestmentAccountType.CORPORATE;
  } else if ("CORPORATE" === ofxVal) {
    return InvestmentAccountType.CORPORATE;
  } else {
    return null;
  }
}
