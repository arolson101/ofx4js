
/**
 * The class of debt.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export enum DebtClass {
  TREASURY,
  MUNICIPAL,
  CORPORATE,
  OTHER
}

export function DebtClass_fromOfx(ofxVal: string): DebtClass {
  if ("TREASURY" === ofxVal) {
    return DebtClass.TREASURY;
  } else if ("MUNICIPAL" === ofxVal) {
    return DebtClass.MUNICIPAL;
  } else if ("CORPORATE" === ofxVal) {
    return DebtClass.CORPORATE;
  } else if ("OTHER" === ofxVal) {
    return DebtClass.OTHER;
  } else {
    return null;
  }
}
