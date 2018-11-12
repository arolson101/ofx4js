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
import { InvestmentTransaction } from "./InvestmentTransaction";
import { BaseInvestmentTransaction } from "./BaseInvestmentTransaction";
import { TransactionType } from "./TransactionType";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Base class for investment transactions that aren't buys or sales..
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
export class BaseOtherInvestmentTransaction extends BaseInvestmentTransaction {

  private investmentTransaction: InvestmentTransaction;

  constructor(transactionType: TransactionType) {
    super(transactionType);
  }

  /**
   * Gets the {@link InvestmentTransaction} aggregate.
   *
   * @return the {@link InvestmentTransaction} aggregate
   */
  // @Override
  public getInvestmentTransaction(): InvestmentTransaction {
    return this.investmentTransaction;
  }

  /**
   * Sets the {@link InvestmentTransaction} aggregate.
   *
   * @param investmentTransaction the {@link InvestmentTransaction} aggregate
   */
  public setInvestmentTransaction(investmentTransaction: InvestmentTransaction): void {
    this.investmentTransaction = investmentTransaction;
  }
}

ChildAggregate_add(BaseOtherInvestmentTransaction, { order: 10, type: InvestmentTransaction, read: BaseOtherInvestmentTransaction.prototype.getInvestmentTransaction, write: BaseOtherInvestmentTransaction.prototype.setInvestmentTransaction });
