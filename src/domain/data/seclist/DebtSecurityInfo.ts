import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { DebtType, DebtType_fromOfx } from "./DebtType";
import { DebtClass, DebtClass_fromOfx } from "./DebtClass";
import { CouponFrequency, CouponFrequency_fromOfx } from "./CouponFrequency";
import { CallType, CallType_fromOfx } from "./CallType";
import { AssetClass, AssetClass_fromOfx } from "./AssetClass";
import { Element_add } from "../../../meta/Element_add";


/**
 * Info about a debt security.
 * @see "Section 13.8.5.2, OFX Spec"
 */
export class DebtSecurityInfo extends BaseSecurityInfo {

  private parValue: number;
  private debtType: string;
  private debtClass: string;
  private couponRate: number;
  private nextMaturityDate: Date;
  private couponFrequency: string;
  private callPrice: number;
  private yieldToCall: number;
  private nextCallDate: Date;
  private callType: string;
  private yieldToMaturity: number;
  private debtMaturityDate: Date;
  private assetClass: string;
  private fiAssetClass: string;

  /**
   * Gets the par value of the debt. This is a required field according to the OFX spec.
   *
   * @return the par value of the debt
   */
  public getParValue(): number {
    return this.parValue;
  }

  /**
   * Sets the par value of the debt. This is a required field according to the OFX spec.
   *
   * @param parValue the par value of the debt
   */
  public setParValue(parValue: number): void {
    this.parValue = parValue;
  }

  /**
   * Gets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
   * OFX spec.
   *
   * @return the type of debt
   */
  public getDebtType(): string {
    return this.debtType;
  }

  /**
   * Sets the type of debt. One of "COUPON" or "ZERO". This is a required field according to the
   * OFX spec.
   *
   * @param debtType the type of debt
   */
  public setDebtType(debtType: string): void {
    this.debtType = debtType;
  }

  /**
   * Gets the type of debt as one of the well-known types.
   *
   * @return the type of debt or null if it's not one of the well-known types
   */
  public getDebtTypeEnum(): DebtType {
    return DebtType_fromOfx(this.getDebtType());
  }

  /**
   * Gets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
   * This is an optional field according to the OFX spec.
   *
   * @return the class of debt
   */
  public getDebtClass(): string {
    return this.debtClass;
  }

  /**
   * Sets the class of debt. One of "TREASURY", "MUNICIPAL", "CORPORATE", or "OTHER".
   * This is an optional field according to the OFX spec.
   *
   * @param debtClass the class of debt
   */
  public setDebtClass(debtClass: string): void {
    this.debtClass = debtClass;
  }

  /**
   * Gets the class of debt as one of the well-known types.
   *
   * @return the class of debt or null if it's not one of the well-known types
   */
  public getDebtClassEnum(): DebtClass {
    return DebtClass_fromOfx(this.debtClass);
  }

  /**
   * Gets the coupon rate of the debt for the next closest call date.
   * This is an optional field according to the OFX spec.
   *
   * @return the coupon rate
   */
  public getCouponRate(): number {
    return this.couponRate;
  }

  /**
   * Sets the coupon rate of the debt for the next closest call date.
   * This is an optional field according to the OFX spec.
   *
   * @param couponRate the coupon rate
   */
  public setCouponRate(couponRate: number): void {
    this.couponRate = couponRate;
  }

  /**
   * Gets the next maturity date for the next coupon.
   * This is an optional field according to the OFX spec.
   *
   * @return the maturity date for the next coupon
   */
  public getNextMaturityDate(): Date {
    return this.nextMaturityDate;
  }

  /**
   * Sets the next maturity date for the next coupon.
   * This is an optional field according to the OFX spec.
   *
   * @param nextMaturityDate the maturity date for the next coupon.
   */
  public setNextMaturityDate(nextMaturityDate: Date): void {
    this.nextMaturityDate = nextMaturityDate;
  }

  /**
   * Gets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
   * This is an optional field according to the OFX spec.
   *
   * @return the coupon frequency
   */
  public getCouponFrequency(): string {
    return this.couponFrequency;
  }

  /**
   * Sets the coupon frequency. One of "MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", or "OTHER".
   * This is an optional field according to the OFX spec.
   *
   * @param couponFrequency the coupon frequency
   */
  public setCouponFrequency(couponFrequency: string): void {
    this.couponFrequency = couponFrequency;
  }

  /**
   * Gets the coupon frequency as one of the well-known types.
   *
   * @return the coupon frequency or null if it's not one of the well-known types
   */
  public getCouponFrequencyEnum(): CouponFrequency {
    return CouponFrequency_fromOfx(this.getCouponFrequency());
  }

  /**
   * Gets the bond price. This is an optional field according to the OFX spec.
   *
   * @return the bond price
   */
  public getCallPrice(): number {
    return this.callPrice;
  }

  /**
   * Sets the bond price. This is an optional field according to the OFX spec.
   *
   * @param callPrice the bond price
   */
  public setCallPrice(callPrice: number): void {
    this.callPrice = callPrice;
  }

  /**
   * Gets the yield to call as a rate. This is an optional field according to the OFX spec.
   *
   * @return the yield to call rate
   */
  public getYieldToCall(): number {
    return this.yieldToCall;
  }

  /**
   * Sets the yield to call as a rate. This is an optional field according to the OFX spec.
   *
   * @param yieldToCall the yield to call rate
   */
  public setYieldToCall(yieldToCall: number): void {
    this.yieldToCall = yieldToCall;
  }

  /**
   * Gets the next call date. This is an optional field according to the OFX spec.
   *
   * @return the next call date.
   */
  public getNextCallDate(): Date {
    return this.nextCallDate;
  }

  /**
   * Sets the next call date. This is an optional field according to the OFX spec.
   *
   * @param nextCallDate the next call date.
   */
  public setNextCallDate(nextCallDate: Date): void {
    this.nextCallDate = nextCallDate;
  }

  /**
   * Gets the type of call.
   *
   * @return the type of call
   */
  public getCallType(): string {
    return this.callType;
  }

  /**
   * Sets the type of call.
   *
   * @param callType the type of call
   */
  public setCallType(callType: string): void {
    this.callType = callType;
  }

  /**
   * Gets the type of call as one of the well-known types.
   *
   * @return the type of call or null if it's not one of the well-known types
   */
  public getCallTypeEnum(): CallType {
    return CallType_fromOfx(this.getCallType());
  }

  /**
   * Gets the yield to maturity as a rate. This is an optional field according to the OFX spec.
   *
   * @return the yield to call rate
   */
  public getYieldToMaturity(): number {
    return this.yieldToMaturity;
  }

  /**
   * Sets the yield to maturity as a rate. This is an optional field according to the OFX spec.
   *
   * @param yieldToMaturity the yield to call rate
   */
  public setYieldToMaturity(yieldToMaturity: number): void {
    this.yieldToMaturity = yieldToMaturity;
  }

  /**
   * Gets the date when the debt matures. This is an optional field according to the OFX spec.
   *
   * @return the date when the debt matures
   */
  public getDebtMaturityDate(): Date {
    return this.debtMaturityDate;
  }

  /**
   * Sets the date when the debt matures. This is an optional field according to the OFX spec.
   *
   * @param debtMaturityDate the date when the debt matures
   */
  public setDebtMaturityDate(debtMaturityDate: Date): void {
    this.debtMaturityDate = debtMaturityDate;
  }

  /**
   * Gets the asset class of the debt. This is an optional field according to the OFX spec.
   *
   * @return the asset class of the debt
   */
  public getAssetClass(): string {
    return this.assetClass;
  }

  /**
   * Sets the asset class of the debt. This is an optional field according to the OFX spec.
   *
   * @param assetClass the asset class of the debt
   */
  public setAssetClass(assetClass: string): void {
    this.assetClass = assetClass;
  }

  /**
   * Gets the assert class as one of the well-known types.
   *
   * @return the asset class or null if it's not one of the well-known types
   */
  public getAssetClassEnum(): AssetClass {
    return AssetClass_fromOfx(this.getAssetClass());
  }

  /**
   * Gets the FI-defined asset class of the debt. This is an optional field according to the OFX
   * spec.
   *
   * @return the FI-defined asset class of the debt
   */
  public getFiAssetClass(): string {
    return this.fiAssetClass;
  }

  /**
   * Sets the FI-defined asset class of the debt. This is an optional field according to the OFX
   * spec.
   *
   * @param fiAssetClass the FI-defined asset class of the debt
   */
  public setFiAssetClass(fiAssetClass: string): void {
    this.fiAssetClass = fiAssetClass;
  }
}

Aggregate_add( DebtSecurityInfo, "DEBTINFO" );
Element_add(DebtSecurityInfo, { name: "PARVALUE", required:true, order: 20, type: Number, read: DebtSecurityInfo.prototype.getParValue, write: DebtSecurityInfo.prototype.setParValue });
Element_add(DebtSecurityInfo, { name: "DEBTTYPE", required:true, order: 30, type: String, read: DebtSecurityInfo.prototype.getDebtType, write: DebtSecurityInfo.prototype.setDebtType });
Element_add(DebtSecurityInfo, { name: "DEBTCLASS", order: 40, type: String, read: DebtSecurityInfo.prototype.getDebtClass, write: DebtSecurityInfo.prototype.setDebtClass });
Element_add(DebtSecurityInfo, { name: "COUPONRT", order: 50, type: Number, read: DebtSecurityInfo.prototype.getCouponRate, write: DebtSecurityInfo.prototype.setCouponRate });
Element_add(DebtSecurityInfo, { name: "DTCOUPON", order: 60, type: Date, read: DebtSecurityInfo.prototype.getNextMaturityDate, write: DebtSecurityInfo.prototype.setNextMaturityDate });
Element_add(DebtSecurityInfo, { name: "COUPONFREQ", order: 70, type: String, read: DebtSecurityInfo.prototype.getCouponFrequency, write: DebtSecurityInfo.prototype.setCouponFrequency });
Element_add(DebtSecurityInfo, { name: "CALLPRICE", order: 80, type: Number, read: DebtSecurityInfo.prototype.getCallPrice, write: DebtSecurityInfo.prototype.setCallPrice });
Element_add(DebtSecurityInfo, { name: "YIELDTOCALL", order: 90, type: Number, read: DebtSecurityInfo.prototype.getYieldToCall, write: DebtSecurityInfo.prototype.setYieldToCall });
Element_add(DebtSecurityInfo, { name: "DTCALL", order: 100, type: Date, read: DebtSecurityInfo.prototype.getNextCallDate, write: DebtSecurityInfo.prototype.setNextCallDate });
Element_add(DebtSecurityInfo, { name: "CALLTYPE", order: 110, type: String, read: DebtSecurityInfo.prototype.getCallType, write: DebtSecurityInfo.prototype.setCallType });
Element_add(DebtSecurityInfo, { name: "YIELDTOMAT", order: 120, type: Number, read: DebtSecurityInfo.prototype.getYieldToMaturity, write: DebtSecurityInfo.prototype.setYieldToMaturity });
Element_add(DebtSecurityInfo, { name: "DTMAT", order: 130, type: Date, read: DebtSecurityInfo.prototype.getDebtMaturityDate, write: DebtSecurityInfo.prototype.setDebtMaturityDate });
Element_add(DebtSecurityInfo, { name: "ASSETCLASS", order: 140, type: String, read: DebtSecurityInfo.prototype.getAssetClass, write: DebtSecurityInfo.prototype.setAssetClass });
Element_add(DebtSecurityInfo, { name: "FIASSETCLASS", order: 150, type: String, read: DebtSecurityInfo.prototype.getFiAssetClass, write: DebtSecurityInfo.prototype.setFiAssetClass });
