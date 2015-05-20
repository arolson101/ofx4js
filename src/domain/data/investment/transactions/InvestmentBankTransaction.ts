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
import {Transaction} from "../../common/Transaction";
import {SubAccountType} from "../accounts/SubAccountType";
import {SubAccountType_fromOfx} from "../accounts/SubAccountType";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Bank transactions that are part of an investment account statement. Wraps a {@link Transaction}.
 * @see "Section 13.9.2.3, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentBankTransaction {

  private transaction: Transaction;
  private subAccountFund: string;

  /**
   * Gets the wrapped transaction aggregate.
   * @return the wrapped transaction
   */
  public getTransaction(): Transaction {
    return this.transaction;
  }

  /**
   * Sets the wrapped transaction aggregate.
   * @param transaction the wrapped transaction
   */
  public setTransaction(transaction: Transaction): void {
    this.transaction = transaction;
  }

  /**
   * Gets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.2, OFX Spec"
   *
   * @return the sub account fund for the transaction
   */
  public getSubAccountFund(): string {
    return this.subAccountFund;
  }

  /**
   * Sets the sub account type that the security is from (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.2, OFX Spec"
   *
   * @param subAccountFund the sub account fund for the transaction
   */
  public setSubAccountFund(subAccountFund: string): void {
    this.subAccountFund = subAccountFund;
  }

  /**
   * Gets the result of getSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types
   */
  public getSubAccountFundEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getSubAccountFund());
  }
}

Aggregate_add( InvestmentBankTransaction, "INVBANKTRAN" );
ChildAggregate_add(InvestmentBankTransaction, { order: 10, type: Transaction, read: InvestmentBankTransaction.prototype.getTransaction, write: InvestmentBankTransaction.prototype.setTransaction });
Element_add(InvestmentBankTransaction, { name: "SUBACCTFUND", required: true, order: 20, type: String, read: InvestmentBankTransaction.prototype.getSubAccountFund, write: InvestmentBankTransaction.prototype.setSubAccountFund });


