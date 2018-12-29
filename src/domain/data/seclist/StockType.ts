
/**
 * The type of debt.
 * @see "Section 13.8.5.6, OFX Spec"
 */
export enum StockType {
  COMMON,
  PREFERRED,
  CONVERTIBLE,
  OTHER
}

export function StockType_fromOfx(ofxVal: string): StockType {
  if ("COMMON" === ofxVal) {
    return StockType.COMMON;
  } else if ("PREFERRED" === ofxVal) {
    return StockType.PREFERRED;
  } else if ("CONVERTIBLE" === ofxVal) {
    return StockType.CONVERTIBLE;
  } else if ("OTHER" === ofxVal) {
    return StockType.OTHER;
  } else {
    return null;
  }
}
