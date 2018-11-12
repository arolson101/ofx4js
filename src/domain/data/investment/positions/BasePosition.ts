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
import { InvestmentPosition } from "./InvestmentPosition";
import { SecurityId } from "../../seclist/SecurityId";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { PositionType, PositionType_fromOfx } from "./PositionType";
import { Inv401KSource, Inv401KSource_fromOfx } from "./Inv401KSource";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Base class for the various types of positions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all positions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
export class BasePosition {
  private investmentPosition: InvestmentPosition;

  /**
   * Gets the investment position child aggregate.
   *
   * @return the investment position child aggregate
   */
  public getInvestmentPosition(): InvestmentPosition {
    return this.investmentPosition;
  }

  /**
   * Sets the investment position child aggregate.
   *
   * @param investmentPosition the investment position child aggregate
   */
  public setInvestmentPosition(investmentPosition: InvestmentPosition): void {
    this.investmentPosition = investmentPosition;
  }

  /**
   * Gets the security id for the position. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the security id for the position
   */
  public getSecurityId(): SecurityId {
    return this.getInvestmentPosition().getSecurityId();
  }

  /**
   * Gets the sub-account type. One of "CASH", "MARGIN", "SHORT", "OTHER". This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the sub-account type
   */
  public getHeldInAccount(): string {
    return this.getInvestmentPosition().getHeldInAccount();
  }

  /**
   * Gets the sub-account type as one of the well-known types.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the sub-account type or null if it's not one of the well-known types
   */
  getHeldInAccountEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getHeldInAccount());
  }

  /**
   * Gets the position type. One of SHORT or LONG. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the position type
   */
  public getPositionType(): string {
    return this.getInvestmentPosition().getPositionType();
  }

  /**
   * Gets the position type as one of the well-known types.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the position type or null if it's not one of the well-known types
   */
  public getPositionTypeEnum(): PositionType {
    return PositionType_fromOfx(this.getPositionType());
  }

  /**
   * Gets the number of units in the position. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the number of units in the position
   */
  public getUnits(): number {
    return this.getInvestmentPosition().getUnits();
  }

  /**
   * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
   * share price. For bonds, this is the percentage of par. For options, this is the per share (not
   * per contact) price. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the per unit price
   */
  public getUnitPrice(): number {
    return this.getInvestmentPosition().getUnitPrice();
  }

  /**
   * Gets the market value of this position. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the market value of the position
   */
  public getMarketValue(): number {
    return this.getInvestmentPosition().getMarketValue();
  }

  /**
   * Gets the date and time of the unit price and market value. This is a required field according
   * to the OFX spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the market value date
   */
  public getMarketValueDate(): Date {
    return this.getInvestmentPosition().getMarketValueDate();
  }

  /**
   * Gets the currency code of the position. This is an optional field according to the OFX spec.
   * If not present, it's the default currency of the account.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the currency code of the position or null for the default currency
   */
  public getCurrencyCode(): string {
    return this.getInvestmentPosition().getCurrencyCode();
  }

  /**
   * Gets the memo associated with the position. This is an optional field according to the OFX
   * spec.
   * @see "Section 13.9.2.6.1, OFX Spec"
   *
   * @return the memo
   */
  public getMemo(): string {
    return this.getInvestmentPosition().getMemo();
  }

  /**
   * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
   * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the 401k source
   */
  public get401kSource(): string {
    return this.getInvestmentPosition().get401kSource();
  }

  /**
   * Gets the 401k source as one of the well-known types.
   *
   * @return the 401k source or null if it's not one of the well-known types
   */
  public get401kSourceEnum(): Inv401KSource {
    return Inv401KSource_fromOfx(this.get401kSource());
  }
}

ChildAggregate_add(BasePosition, { required: true, order: 10, type: InvestmentPosition, read: BasePosition.prototype.getInvestmentPosition, write: BasePosition.prototype.setInvestmentPosition });
