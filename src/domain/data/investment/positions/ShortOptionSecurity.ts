
/**
 * How a short option is secured.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export enum ShortOptionSecurity {
  NAKED,
  COVERED
}

export function ShortOptionSecurity_fromOfx(ofxVal: string): ShortOptionSecurity {
  if ("NAKED" === ofxVal) {
    return ShortOptionSecurity.NAKED;
  } else if ("COVERED" === ofxVal) {
    return ShortOptionSecurity.COVERED;
  } else {
    return null;
  }
}
