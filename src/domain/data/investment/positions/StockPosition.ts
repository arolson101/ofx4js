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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='BasePosition'/>

module ofx4js.domain.data.investment.positions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Represents a stock position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class StockPosition extends BasePosition {
  private unitsStreet: number;
  private unitsUser: number;
  private reinvestDividends: boolean;

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
}

Aggregate_add( StockPosition, "POSSTOCK" );
Element_add(StockPosition, { name: "UNITSSTREET", order: 20, type: Number, read: StockPosition.prototype.getUnitsStreet, write: StockPosition.prototype.setUnitsStreet });
Element_add(StockPosition, { name: "UNITSUSER", order: 30, type: Number, read: StockPosition.prototype.getUnitsUser, write: StockPosition.prototype.setUnitsUser });
Element_add(StockPosition, { name: "REINVDIV", order: 40, type: Boolean, read: StockPosition.prototype.getReinvestDividends, write: StockPosition.prototype.setReinvestDividends });

}
