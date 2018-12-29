
/**
 * The type of mutual fund.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export enum MutualFundType {
  OPEN_END,
  CLOSE_END,
  OTHER
}

export function MutualFundType_fromOfx(ofxVal: string): MutualFundType {
  if ("OPENEND" === ofxVal) {
    return MutualFundType.OPEN_END;
  } else if ("CLOSEEND" === ofxVal) {
    return MutualFundType.CLOSE_END;
  } else if ("OTHER" === ofxVal) {
    return MutualFundType.OTHER;
  } else {
    return null;
  }
}
