
/**
 * Type of option.
 * @see "Section 13.8.5.4, OFX Spec"
 */
export enum OptionType {
  PUT,
  CALL
}


export function OptionType_fromOfx(ofxVal: string): OptionType {
  if ("PUT" === ofxVal) {
    return OptionType.PUT;
  } else if ("CALL" === ofxVal) {
    return OptionType.CALL;
  } else {
    return null;
  }
}
