import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { StockType, StockType_fromOfx } from "./StockType";
import { AssetClass, AssetClass_fromOfx } from "./AssetClass";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";

/**
 * Info about a stock security.
 * @see "Section 13.8.5.6, OFX Spec"
 */
export class StockSecurityInfo extends BaseSecurityInfo {

  private stockType: string;
  private yield: number;
  private dateYieldAsOf: Date;
  private assetClass: string;
  private fiAssetClass: string;

  /**
   * Gets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
   * optional field according to the OFX spec.
   *
   * @return the type of stock
   */
  public getType(): string {
    return this.stockType;
  }

  /**
   * Sets the type of stock. One of "COMMON", "PREFERRED", "CONVERTIBLE", or "OTHER". This is an
   * optional field according to the OFX spec.
   *
   * @param stockType the type of stock
   */
  public setType(stockType: string): void {
    this.stockType = stockType;
  }

  /**
   * Gets the type of stock as one of the well-known types.
   *
   * @return the type of stock or null if it's not one of the well-known types
   */
  public getTypeEnum(): StockType {
    return StockType_fromOfx(this.getType());
  }

  /**
   * Gets the current yield reported as the dividend expressed as a portion of the current stock
   * price, a rate. This is an optional field according to the OFX spec.
   *
   * @return the dividend yield
   */
  public getYield(): number {
    return this.yield;
  }

  /**
   * Sets the current yield reported as the dividend expressed as a portion of the current stock
   * price, a rate. This is an optional field according to the OFX spec.
   *
   * @param yield the dividend yield
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

  /**
   * Gets the asset class of the stock. This is an optional field according to the OFX spec.
   *
   * @return the asset class of the stock
   */
  public getAssetClass(): string {
    return this.assetClass;
  }

  /**
   * Sets the asset class of the stock. This is an optional field according to the OFX spec.
   *
   * @param assetClass the asset class of the stock
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
   * Gets the FI-defined asset class of the stock. This is an optional field according to the OFX
   * spec.
   *
   * @return the FI-defined asset class of the stock
   */
  public getFiAssetClass(): string {
    return this.fiAssetClass;
  }

  /**
   * Sets the FI-defined asset class of the stock. This is an optional field according to the OFX
   * spec.
   *
   * @param fiAssetClass the FI-defined asset class of the stock
   */
  public setFiAssetClass(fiAssetClass: string): void {
    this.fiAssetClass = fiAssetClass;
  }
}

Aggregate_add( StockSecurityInfo, "STOCKINFO" );
Element_add(StockSecurityInfo, { name: "STOCKTYPE", order: 20, type: String, read: StockSecurityInfo.prototype.getType, write: StockSecurityInfo.prototype.setType });
Element_add(StockSecurityInfo, { name: "YIELD", order: 30, type: Number, read: StockSecurityInfo.prototype.getYield, write: StockSecurityInfo.prototype.setYield });
Element_add(StockSecurityInfo, { name: "DTYIELDASOF", order: 40, type: Date, read: StockSecurityInfo.prototype.getDateYieldAsOf, write: StockSecurityInfo.prototype.setDateYieldAsOf });
Element_add(StockSecurityInfo, { name: "ASSETCLASS", order: 50, type: String, read: StockSecurityInfo.prototype.getAssetClass, write: StockSecurityInfo.prototype.setAssetClass });
Element_add(StockSecurityInfo, { name: "FIASSETCLASS", order: 60, type: String, read: StockSecurityInfo.prototype.getFiAssetClass, write: StockSecurityInfo.prototype.setFiAssetClass });
