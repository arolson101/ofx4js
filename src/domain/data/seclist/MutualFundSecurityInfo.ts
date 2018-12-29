import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { MutualFundType, MutualFundType_fromOfx } from "./MutualFundType";
import { Element_add } from "../../../meta/Element_add";


/**
 * Info about a mutual fund security.
 * @see "Section 13.8.5.3, OFX Spec"
 */
export class MutualFundSecurityInfo extends BaseSecurityInfo {
  private mfType: string;
  private yield: number;
  private dateYieldAsOf: Date;

  /**
   * Gets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
   * according to the OFX spec.
   *
   * @return the mutual fund type
   */
  public getType(): string {
    return this.mfType;
  }

  /**
   * Sets the mutual fund type. One of "OPENEND", "CLOSEEND", or "OTHER". This is an optional field
   * according to the OFX spec.
   *
   * @param mfType the mutual fund type
   */
  public setType(mfType: string): void {
    this.mfType = mfType;
  }

  /**
   * Gets the mutual fund type as one of the well-known types.
   *
   * @return the mutual fund type or null if it's not one of the well-known types
   */
  public getTypeEnum(): MutualFundType {
    return MutualFundType_fromOfx(this.getType());
  }

  /**
   * Gets the yield as a rate. This is an optional field according to the OFX spec.
   *
   * @return the yield as a rate
   */
  public getYield(): number {
    return this.yield;
  }

  /**
   * Sets the yield as a rate. This is an optional field according to the OFX spec.
   *
   * @param yield the yield as a rate
   */
  public setYield(yield_: number): void {
    this.yield = yield_;
  }

  /**
   * Gets the as-of date for the yield. This is an optional field according to the OFX spec.
   *
   * @return the as-of date for the yield
   */
  public getDateYieldAsOf(): Date {
    return this.dateYieldAsOf;
  }

  /**
   * Sets the as-of date for the yield. This is an optional field according to the OFX spec.
   *
   * @param dateYieldAsOf the as-of date for the yield
   */
  public setDateYieldAsOf(dateYieldAsOf: Date): void {
    this.dateYieldAsOf = dateYieldAsOf;
  }

  // TODO(jonp) -- MFASSERTCLASS and FIMFASSERTCLASS child aggregates
}

Aggregate_add( MutualFundSecurityInfo, "MFINFO" );
Element_add(MutualFundSecurityInfo, { name: "MFTYPE", order: 20, type: String, read: MutualFundSecurityInfo.prototype.getType, write: MutualFundSecurityInfo.prototype.setType });
Element_add(MutualFundSecurityInfo, { name: "YIELD", order: 30, type: Number, read: MutualFundSecurityInfo.prototype.getYield, write: MutualFundSecurityInfo.prototype.setYield });
Element_add(MutualFundSecurityInfo, { name: "DTYIELDASOF", order: 40, type: Date, read: MutualFundSecurityInfo.prototype.getDateYieldAsOf, write: MutualFundSecurityInfo.prototype.setDateYieldAsOf });
