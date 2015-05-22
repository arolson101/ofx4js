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
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='BaseSellInvestmentTransaction'/>
///<reference path='SellType'/>

module ofx4js.domain.data.investment.transactions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Transaction for selling stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SellStockTransaction extends BaseSellInvestmentTransaction {

  private sellType: string;

  constructor() {
    super(TransactionType.SELL_STOCK);
  }

  /**
   * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sell type
   */
  public getSellType(): string {
    return this.sellType;
  }

  /**
   * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sellType the sell type
   */
  public setSellType(sellType: string): void {
    this.sellType = sellType;
  }

  /**
   * Gets the sell type as one of the well-known types.
   *
   * @return the type of sale or null if it's not known
   */
  public getSellTypeEnum(): SellType {
    return SellType_fromOfx(this.sellType);
  }
}

Aggregate_add( SellStockTransaction, "SELLSTOCK" );
Element_add(SellStockTransaction, { name: "SELLTYPE", required: true, order: 20, type: String, read: SellStockTransaction.prototype.getSellType, write: SellStockTransaction.prototype.setSellType });

}
