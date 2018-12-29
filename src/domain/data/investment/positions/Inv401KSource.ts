
/**
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 */
export enum Inv401KSource {
  PRETAX,
  AFTER_TAX,
  MATCH,
  PROFIT_SHARING,
  ROLLOVER,
  OTHER_VEST,
  OTHER_NONVEST
}

interface MappingType {
  [key: string]: Inv401KSource;
}

var ofxMapping: MappingType = {
  "PRETAX": Inv401KSource.PRETAX,
  "AFTERTAX": Inv401KSource.AFTER_TAX,
  "MATCH": Inv401KSource.MATCH,
  "PROFITSHARING": Inv401KSource.PROFIT_SHARING,
  "ROLLOVER": Inv401KSource.ROLLOVER,
  "OTHERVEST": Inv401KSource.OTHER_VEST,
  "OTHERNONVEST": Inv401KSource.OTHER_NONVEST,
};

export function Inv401KSource_fromOfx(ofxVal: string): Inv401KSource {
  return ofxVal == null ? null : ofxMapping[ofxVal];
}
