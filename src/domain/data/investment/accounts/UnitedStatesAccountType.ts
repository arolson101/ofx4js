
//import java.util.HashMap;
//import java.util.Map;

/**
 * @see "OFX Spec, Section 13.6.2.1"
 */
export enum UnitedStatesAccountType {

  /** A 401(k) retirement account */
  R401K,

  /** A 403(B) retirement account */
  R403B,

  /** An IRA retirement account */
  IRA,

  /** Keough (money purchase/profit sharing) account */
  KEOUGH,

  /** Other account type */
  OTHER,

  /** Salary Reduction Employer Pension Plan */
  SARSEP,

  /** Savings Incentive Match Plan for Employees*/
  SIMPLE,

  /** Regular investment account */
  NORMAL,

  /** Tax Deferred Annuity */
  TDA,

  /** Trust (including UTMA) */
  TRUST,

  /** Custodial account */
  UGMA
}

interface OfxMappingType {
  [key: string]: UnitedStatesAccountType;
}

var ofxMapping: OfxMappingType = {
  "401K": UnitedStatesAccountType.R401K,
  "403B": UnitedStatesAccountType.R403B,
  "IRA": UnitedStatesAccountType.IRA,
  "KEOUGH": UnitedStatesAccountType.KEOUGH,
  "OTHER": UnitedStatesAccountType.OTHER,
  "SARSEP": UnitedStatesAccountType.SARSEP,
  "SIMPLE": UnitedStatesAccountType.SIMPLE,
  "NORMAL": UnitedStatesAccountType.NORMAL,
  "TDA": UnitedStatesAccountType.TDA,
  "TRUST": UnitedStatesAccountType.TRUST,
  "UGMA": UnitedStatesAccountType.UGMA,
};

export function UnitedStatesAccountType_fromOfx(ofxVal: string): UnitedStatesAccountType {
  return ofxVal == null ? null : ofxMapping[ofxVal];
}
