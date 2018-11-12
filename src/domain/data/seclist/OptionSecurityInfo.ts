/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { SecurityId } from "./SecurityId";
import { OptionType, OptionType_fromOfx } from "./OptionType";
import { AssetClass, AssetClass_fromOfx } from "./AssetClass";
import { Element_add } from "../../../meta/Element_add";


/**
 * Info about an option security.
 * @see "Section 13.8.5.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class OptionSecurityInfo extends BaseSecurityInfo {

  private optionType: string;
  private strikePrice: number;
  private expirationDate: Date;
  private sharesPerContact: number;
  private underlyingSecurity: SecurityId;
  private assetClass: string;
  private fiAssetClass: string;

  /**
   * Gets the type of option. One of "PUT" or "CALL". This is a required field according to the
   * OFX spec.
   *
   * @return the option type
   */
  public getOptionType(): string {
    return this.optionType;
  }

  /**
   * Sets the type of option. One of "PUT" or "CALL". This is a required field according to the
   * OFX spec.
   *
   * @param optionType the option type
   */
  public setOptionType(optionType: string): void {
    this.optionType = optionType;
  }

  /**
   * Gets the option type as a well-known enum value.
   *
   * @return the option type or null if it's not one of the well-known types
   */
  public getOptionTypeEnum(): OptionType {
    return OptionType_fromOfx(this.getOptionType());
  }

  /**
   * Gets the strike price of the option. This is a required field according to the OFX spec.
   *
   * @return the option strike price
   */
  public getStrikePrice(): number {
    return this.strikePrice;
  }

  /**
   * Sets the strike price of the option. This is a required field according to the OFX spec.
   *
   * @param strikePrice the option strike price
   */
  public setStrikePrice(strikePrice: number): void {
    this.strikePrice = strikePrice;
  }

  /**
   * Gets the expiration date of the option. This is a required field according to the OFX spec.
   *
   * @return the expiration date of the option
   */
  public getExpirationDate(): Date {
    return this.expirationDate;
  }

  /**
   * Sets the expiration date of the option. This is a required field according to the OFX spec.
   *
   * @param expirationDate the expiration date of the option
   */
  public setExpirationDate(expirationDate: Date): void {
    this.expirationDate = expirationDate;
  }

  /**
   * Gets the number of shares per option contact. This is a required field according to the OFX
   * spec.
   *
   * @return the number of shares per option contact
   */
  public getSharesPerContact(): number {
    return this.sharesPerContact;
  }

  /**
   * Sets the number of shares per option contact. This is a required field according to the OFX
   * spec.
   *
   * @param sharesPerContact the number of shares per option contact
   */
  public setSharesPerContact(sharesPerContact: number): void {
    this.sharesPerContact = sharesPerContact;
  }

  /**
   * Gets the security id of the underling security. This is an optional field according to the OFX
   * spec.
   *
   * @return the security id of the underlying security
   */
  public getUnderlyingSecurity(): SecurityId {
    return this.underlyingSecurity;
  }

  /**
   * Sets the security id of the underling security. This is an optional field according to the OFX
   * spec.
   *
   * @param underlyingSecurity the security id of the underlying security
   */
  public setUnderlyingSecurity(underlyingSecurity: SecurityId): void {
    this.underlyingSecurity = underlyingSecurity;
  }

  /**
   * Gets the asset class of the option. This is an optional field according to the OFX spec.
   *
   * @return the asset class of the option
   */
  public getAssetClass(): string {
    return this.assetClass;
  }

  /**
   * Sets the asset class of the option. This is an optional field according to the OFX spec.
   *
   * @param assetClass the asset class of the option
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
   * Gets the FI-defined asset class of the option. This is an optional field according to the OFX
   * spec.
   *
   * @return the FI-defined asset class of the option
   */
  public getFiAssetClass(): string {
    return this.fiAssetClass;
  }

  /**
   * Sets the FI-defined asset class of the option. This is an optional field according to the OFX
   * spec.
   *
   * @param fiAssetClass the FI-defined asset class of the option
   */
  public setFiAssetClass(fiAssetClass: string): void {
    this.fiAssetClass = fiAssetClass;
  }
}

Aggregate_add( OptionSecurityInfo, "OPTINFO" );
Element_add(OptionSecurityInfo, { name: "OPTTYPE", order: 20, type: String, read: OptionSecurityInfo.prototype.getOptionType, write: OptionSecurityInfo.prototype.setOptionType });
Element_add(OptionSecurityInfo, { name: "STRIKEPRICE", order: 30, type: Number, read: OptionSecurityInfo.prototype.getStrikePrice, write: OptionSecurityInfo.prototype.setStrikePrice });
Element_add(OptionSecurityInfo, { name: "DTEXPIRE", order: 40, type: Date, read: OptionSecurityInfo.prototype.getExpirationDate, write: OptionSecurityInfo.prototype.setExpirationDate });
Element_add(OptionSecurityInfo, { name: "SHPERCTRCT", order: 50, type: Number, read: OptionSecurityInfo.prototype.getSharesPerContact, write: OptionSecurityInfo.prototype.setSharesPerContact });
Element_add(OptionSecurityInfo, { name: "SECID", order: 60, type: SecurityId, read: OptionSecurityInfo.prototype.getUnderlyingSecurity, write: OptionSecurityInfo.prototype.setUnderlyingSecurity });
Element_add(OptionSecurityInfo, { name: "ASSETCLASS", order: 70, type: String, read: OptionSecurityInfo.prototype.getAssetClass, write: OptionSecurityInfo.prototype.setAssetClass });
Element_add(OptionSecurityInfo, { name: "FIASSETCLASS", order: 80, type: String, read: OptionSecurityInfo.prototype.getFiAssetClass, write: OptionSecurityInfo.prototype.setFiAssetClass });
