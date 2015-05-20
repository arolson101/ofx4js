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
import {BasePosition} from "BasePosition";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Represents a mutual fund position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class MutualFundPosition extends BasePosition {

  private unitsStreet: number;
  private unitsUser: number;
  private reinvestDividends: boolean;
  private reinvestCapitalGains: boolean;

  /**
   * Gets the number of units in the financial insititution's street name.
   *
   * @return the number of units in the financial insititution's street name.
   */
  public getUnitsStreet(): number {
    return this.unitsStreet;
  }

  /**
   * Sets the number of units in the financial insititution's street name.
   *
   * @param unitsStreet the number of units in the financial insititution's street name.
   */
  public setUnitsStreet(unitsStreet: number): void {
    this.unitsStreet = unitsStreet;
  }

  /**
   * Gets the number of units in the user's name.
   *
   * @return the number of units in the user's name.
   */
  public getUnitsUser(): number {
    return this.unitsUser;
  }

  /**
   * Sets the number of units in the user's name.
   *
   * @param unitsUser the number of units in the user's name.
   */
  public setUnitsUser(unitsUser: number): void {
    this.unitsUser = unitsUser;
  }

  /**
   * Gets whether dividends are automatically reinvested.
   *
   * @return whether dividends are automatically reinvested
   */
  public getReinvestDividends(): boolean {
    return this.reinvestDividends;
  }

  /**
   * Sets whether dividends are automatically reinvested.
   *
   * @param reinvestDividends whether dividends are automatically reinvested
   */
  public setReinvestDividends(reinvestDividends: boolean): void {
    this.reinvestDividends = reinvestDividends;
  }

  /**
   * Gets whether capital gains are automatically reinvested.
   *
   * @return whether capital gains are automatically reinvested
   */
  public getReinvestCapitalGains(): boolean {
    return this.reinvestCapitalGains;
  }

  /**
   * Sets whether capital gains are automatically reinvested.
   *
   * @param reinvestCapitalGains whether capital gains are automatically reinvested
   */
  public setReinvestCapitalGains(reinvestCapitalGains: boolean): void {
    this.reinvestCapitalGains = reinvestCapitalGains;
  }
}

Aggregate_add( MutualFundPosition, "POSMF" );
Element_add(MutualFundPosition, { name: "UNITSSTREET", order: 20, type: Number, read: MutualFundPosition.prototype.getUnitsStreet, write: MutualFundPosition.prototype.setUnitsStreet });
Element_add(MutualFundPosition, { name: "UNITSUSER", order: 30, type: Number, read: MutualFundPosition.prototype.getUnitsUser, write: MutualFundPosition.prototype.setUnitsUser });
Element_add(MutualFundPosition, { name: "REINVDIV", order: 50, type: Boolean, read: MutualFundPosition.prototype.getReinvestDividends, write: MutualFundPosition.prototype.setReinvestDividends });
Element_add(MutualFundPosition, { name: "REINVCG", order: 60, type: Boolean, read: MutualFundPosition.prototype.getReinvestCapitalGains, write: MutualFundPosition.prototype.setReinvestCapitalGains });


