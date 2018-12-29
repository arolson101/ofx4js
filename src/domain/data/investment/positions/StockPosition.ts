import { BasePosition } from "./BasePosition";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Represents a stock position.
 * @see "Section 13.9.2.6.1, OFX Spec"
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
