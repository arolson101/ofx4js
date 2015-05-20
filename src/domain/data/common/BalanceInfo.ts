/*
 * Copyright 2008 Web Cohesion
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
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";

/**
 * @author Ryan Heaton
 */
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


