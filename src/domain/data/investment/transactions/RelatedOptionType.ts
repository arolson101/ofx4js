
 /**
 * Related option transaction type.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export enum RelatedOptionType {
  SPREAD,
  STRADDLE,
  NONE,
  OTHER
}

export function RelatedOptionType_fromOfx(ofxVal: string): RelatedOptionType {
  if ("SPREAD" === ofxVal) {
    return RelatedOptionType.SPREAD;
  } else if ("STRADDLE" === ofxVal) {
    return RelatedOptionType.STRADDLE;
  } else if ("NONE" === ofxVal) {
    return RelatedOptionType.NONE;
  } else if ("OTHER" === ofxVal) {
    return RelatedOptionType.OTHER;
  } else {
    return null;
  }
}
