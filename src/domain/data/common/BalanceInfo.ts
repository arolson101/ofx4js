import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


export class BalanceInfo {

  private amount: number;
  private asOfDate: Date;

  /**
   * The amount.
   *
   * @return The amount.
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * The amount.
   *
   * @param amount The amount.
   */
  public setAmount(amount: number): void {
    this.amount = amount;
  }

  /**
   * The as-of date.
   *
   * @return The as-of date.
   */
  public getAsOfDate(): Date {
    return this.asOfDate;
  }

  /**
   * The as-of date.
   *
   * @param asOfDate The as-of date.
   */
  public setAsOfDate(asOfDate: Date): void {
    this.asOfDate = asOfDate;
  }
}

Aggregate_add( BalanceInfo );
Element_add(BalanceInfo, { name: "BALAMT", required: true, order: 0, type: Number, read: BalanceInfo.prototype.getAmount, write: BalanceInfo.prototype.setAmount });
Element_add(BalanceInfo, { name: "DTASOF", required: true, order: 10, type: Date, read: BalanceInfo.prototype.getAsOfDate, write: BalanceInfo.prototype.setAsOfDate });
