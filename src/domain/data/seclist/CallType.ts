
/**
 * Call type for debt.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export enum CallType {
  CALL,
  PUT,
  PREFUND,
  MATURITY
}

export function CallType_fromOfx(ofxVal: string): CallType {
  if ("CALL" === ofxVal) {
    return CallType.CALL;
  } else if ("PUT" === ofxVal) {
    return CallType.PUT;
  } else if ("PREFUND" === ofxVal) {
    return CallType.PREFUND;
  } else if ("MATURITY" === ofxVal) {
    return CallType.MATURITY;
  } else {
    return null;
  }
}
