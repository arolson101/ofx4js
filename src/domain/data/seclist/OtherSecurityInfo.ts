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
import { AssetClass_fromOfx, AssetClass } from "./AssetClass";
import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Info about any other type of security.
 * @see "Section 13.8.5.5, OFX Spec"
 *
 * @author Jon Perlow
 */
export class OtherSecurityInfo extends BaseSecurityInfo {

  private typeDesc: string;
  private assetClass: string;
  private fiAssetClass: string;

  /**
   * Gets a description of the type of security. This is an optional field according to the OFX
   * spec.
   *
   * @return the description of the security
   */
  public getTypeDesc(): string {
    return this.typeDesc;
  }

  /**
   * Sets a description of the type of security. This is an optional field according to the OFX
   * spec.
   *
   * @param typeDesc the description of the security
   */
  public setTypeDesc(typeDesc: string): void {
    this.typeDesc = typeDesc;
  }

  /**
   * Gets the asset class of the option. This is an optional field according to the OFX spec.
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

Aggregate_add( OtherSecurityInfo, "OTHERINFO" );
Element_add(OtherSecurityInfo, { name: "TYPEDESC", order: 20, type: String, read: OtherSecurityInfo.prototype.getTypeDesc, write: OtherSecurityInfo.prototype.setTypeDesc });
Element_add(OtherSecurityInfo, { name: "ASSETCLASS", order: 30, type: String, read: OtherSecurityInfo.prototype.getAssetClass, write: OtherSecurityInfo.prototype.setAssetClass });
Element_add(OtherSecurityInfo, { name: "FIASSETCLASS", order: 40, type: String, read: OtherSecurityInfo.prototype.getFiAssetClass, write: OtherSecurityInfo.prototype.setFiAssetClass });
