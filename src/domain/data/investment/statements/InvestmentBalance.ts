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
import { BalanceList } from "./BalanceList";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Aggregate for the investment balance.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentBalance {

  private availableCash: number;
  private marginBalance: number;
  private shortBalance: number;
  private buyingPower: number;
  private balanceList: BalanceList;

  /**
   * Gets the available cash balance across all sub-accounts, including sweep funds. This is
   * required field according to the OFX spec.
   *
   * @return the available cash balance
   */
  public getAvailableCash(): number {
    return this.availableCash;
  }

  /**
   * Sets the available cash balance across all sub-accounts, including sweep funds. This is
   * required field according to the OFX spec.
   *
   * @param availableCash the available cash balance
   */
  public setAvailableCash(availableCash: number): void {
    this.availableCash = availableCash;
  }

  /**
   * Gets the margin account balance. A positive balance indicates a positive cash balance, while
   * a negative balance indicates the customer borrowed funds. This is a required field according
   * to the OFX spec.
   *
   * @return the margin account balance
   */
  public getMarginBalance(): number {
    return this.marginBalance;
  }

  /**
   * Sets the margin account balance. A positive balance indicates a positive cash balance, while
   * a negative balance indicates the customer borrowed funds. This is a required field according
   * to the OFX spec.
   *
   * @param marginBalance the margin account balance
   */
  public setMarginBalance(marginBalance: number): void {
    this.marginBalance = marginBalance;
  }

  /**
   * Gets the market value of all short positions. This is a positive balance. This is a required
   * field according to the OFX spec.
   *
   * @return the market value of all short positions
   */
  public getShortBalance(): number {
    return this.shortBalance;
  }

  /**
   * Sets the market value of all short positions. This is a positive balance. This is a required
   * field according to the OFX spec.
   *
   * @param shortBalance the market value of all short positions
   */
  public setShortBalance(shortBalance: number): void {
    this.shortBalance = shortBalance;
  }

  /**
   * Gets the buying power amount. This is an optional field according to the OFX spec.
   *
   * @return the buying power
   */
  public getBuyingPower(): number {
    return this.buyingPower;
  }

  /**
   * Sets the buying power amount. This is an optional field according to the OFX spec.
   *
   * @param buyingPower the buying power
   */
  public setBuyingPower(buyingPower: number): void {
    this.buyingPower = buyingPower;
  }

  /**
   * Gets the investment balance list. This is an optional field according to the OFX spec.
   *
   * @return the investment balance list
   */
  public getBalanceList(): BalanceList {
    return this.balanceList;
  }

  /**
   * Sets the investment balance list. This is an optional field according to the OFX spec.
   *
   * @param balanceList the investment balance list
   */
  public setBalanceList(balanceList: BalanceList): void {
    this.balanceList = balanceList;
  }
}

Aggregate_add(InvestmentBalance, "INVBAL");
Element_add(InvestmentBalance, { name: "AVAILCASH", required: true, order: 10, type: Number, read: InvestmentBalance.prototype.getAvailableCash, write: InvestmentBalance.prototype.setAvailableCash });
Element_add(InvestmentBalance, { name: "MARGINBALANCE", required: true, order: 20, type: Number, read: InvestmentBalance.prototype.getMarginBalance, write: InvestmentBalance.prototype.setMarginBalance });
Element_add(InvestmentBalance, { name: "SHORTBALANCE", required: true, order: 30, type: Number, read: InvestmentBalance.prototype.getShortBalance, write: InvestmentBalance.prototype.setShortBalance });
Element_add(InvestmentBalance, { name: "BUYPOWER", order: 40, type: Number, read: InvestmentBalance.prototype.getBuyingPower, write: InvestmentBalance.prototype.setBuyingPower });
ChildAggregate_add(InvestmentBalance, { order: 50, type: BalanceList, read: InvestmentBalance.prototype.getBalanceList, write: InvestmentBalance.prototype.setBalanceList });
