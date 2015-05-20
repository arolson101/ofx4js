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
import {BaseBuyInvestmentTransaction} from "BaseBuyInvestmentTransaction";
import {TransactionType} from "TransactionType";
import {BuyType, BuyType_fromOfx} from "BuyType";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Transaction for buying stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class BuyStockTransaction extends BaseBuyInvestmentTransaction {

  private buyType: string;

  constructor() {
    super(TransactionType.BUY_STOCK);
  }

  /**
   * Gets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the buy type
   */
  public getBuyType(): string {
    return this.buyType;
  }

  /**
   * Sets the type of stock purchase (i.e. "BUY" or "BUYTOCOVER"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param buyType the buy type
   */
  public setBuyType(buyType: string): void {
    this.buyType = buyType;
  }

  /**
   * Gets the buy type as one of the well-known types.
   *
   * @return the type of purchase or null if it's not well known
   */
  public getBuyTypeEnum(): BuyType {
    return BuyType_fromOfx(this.buyType);
  }
}

Aggregate_add( BuyStockTransaction, "BUYSTOCK" );
Element_add(BuyStockTransaction, { name: "BUYTYPE", required: true, order: 20, type: String, read: BuyStockTransaction.prototype.getBuyType, write: BuyStockTransaction.prototype.setBuyType });


