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
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";
import { SecurityInfo } from "./SecurityInfo";
import { SecurityId } from "./SecurityId";


/**
 * Base class for info about the various types of securities.
 * @see "Section 13.8.5.1, OFX Spec"
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all security info as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
export class BaseSecurityInfo {
  private securityInfo: SecurityInfo;

  /**
   * Gets the security info aggregate.
   *
   * @return the security info aggregate.
   */
  public getSecurityInfo(): SecurityInfo {
    return this.securityInfo;
  }

  /**
   * Sets the security info aggregate.
   *
   * @param securityInfo the security info aggregate.
   */
  public setSecurityInfo(securityInfo: SecurityInfo): void {
    this.securityInfo = securityInfo;
  }

  /**
   * Gets the unique security id for the security. This is a required field according to the OFX
   * spec.
   *
   * @return the security id
   */
  public getSecurityId(): SecurityId {
    return this.getSecurityInfo().getSecurityId();
  }

  /**
   * Gets the full name of the security. This is a required field according to the OFX spec.
   *
   * @return the full name of the security.
   */
  public getSecurityName(): string {
    return this.getSecurityInfo().getSecurityName();
  }

  /**
   * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
   *
   * @return the ticket symbol or null if there's no ticker symbol
   */
  public getTickerSymbol(): string {
    return this.getSecurityInfo().getTickerSymbol();
  }

  /**
   * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
   *
   * @return the FI ID number for the security
   */
  public getFiId(): string {
    return this.getSecurityInfo().getFiId();
  }

  /**
   * Gets the rating of the security. This is an optional field according to the OFX spec.
   *
   * @return the rating
   */
  public getRating(): string {
    return this.getSecurityInfo().getRating();
  }

  /**
   * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
   * share price. For bonds, this is the percentage of par. For options, this is the per share (not
   * per contact) price. This is a noptional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the per unit price
   */
  public getUnitPrice(): number {
    return this.getSecurityInfo().getUnitPrice();
  }

  /**
   * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
   *
   * @return the date as-of for the unit price
   */
  public getUnitPriceAsOfDate(): Date {
    return this.getSecurityInfo().getUnitPriceAsOfDate();
  }

  /**
   * Gets the overriding currency code for the security. If not set, implies the default currency.
   * This is an optional field according to the OFX spec.
   *
   * @return the overriding currency code or null to mean the default currency
   */
  public getCurrencyCode(): string {
    return this.getSecurityInfo().getCurrencyCode();
  }

  /**
   * Gets any memo associated with the security. This is an optional field according to the OFX
   * spec.
   *
   * @return the memo
   */
  public getMemo(): string {
    return this.getSecurityInfo().getMemo();
  }
}

ChildAggregate_add(BaseSecurityInfo, { required: true, order: 10, type: SecurityInfo, read: BaseSecurityInfo.prototype.getSecurityInfo, write: BaseSecurityInfo.prototype.setSecurityInfo });
