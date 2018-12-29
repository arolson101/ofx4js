
/**
 * Type of position.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export enum PositionType {
  LONG,
  SHORT
}

export function PositionType_fromOfx(ofxVal: string): PositionType {
  if ("LONG" === ofxVal) {
    return PositionType.LONG;
  } else if ("SHORT" === ofxVal) {
    return PositionType.SHORT;
  } else {
    return null;
  }
}
