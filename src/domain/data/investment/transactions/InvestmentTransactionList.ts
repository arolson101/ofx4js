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
///<reference path='BaseOtherInvestmentTransaction'/>
///<reference path='InvestmentBankTransaction'/>

module ofx4js.domain.data.investment.transactions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * The transaction list aggregate.
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentTransactionList {
  private start: Date;
  private end: Date;
  private transactions: Array<BaseInvestmentTransaction>;
  private bankTransactions: Array<InvestmentBankTransaction>;

  /**
   * Gets the start date. This is a required field according to the OFX spec.
   *
   * @return The start date
   */
  public getStart(): Date {
    return this.start;
  }

  /**
   * Sets the start date. This is a required field according to the OFX spec.
   *
   * @param start The start date
   */
  public setStart(start: Date): void {
    this.start = start;
  }

  /**
   * Gets the end date. This is a required field according to the OFX spec.
   *
   * @return he end date
   */
  public getEnd(): Date {
    return this.end;
  }

  /**
   * Sets the end date. This is a required field according to the OFX spec.
   *
   * @param end the end date
   */
  public setEnd(end: Date): void {
    this.end = end;
  }

  /**
   * Gets the investment transaction list. This is a heterogenous list of different types of
   * transactions returned in the order the brokerage provides them.
   *
   * @return the investment transaction list
   */
  public getInvestmentTransactions(): Array<BaseInvestmentTransaction> {
    return this.transactions;
  }

  /**
   * Sets the investment transaction list. This is a heterogenous list of different types of
   * transactions returned in the order the brokerage provides them.
   *
   * @param transactions the investment transaction list
   */
  public setInvestmentTransactions(transactions: Array<BaseInvestmentTransaction>): void {
    this.transactions = transactions;
  }

  /**
   * Gets the bank transaction list.
   *
   * @return the bank transaction list
   */
  public getBankTransactions(): Array<InvestmentBankTransaction> {
    return this.bankTransactions;
  }

  /**
   * Sets the bank transaction list.
   *
   * @param bankTransactions the bank transaction list
   */
  public setBankTransactions(bankTransactions: Array<InvestmentBankTransaction>): void {
    this.bankTransactions = bankTransactions;
  }
}

Aggregate_add( InvestmentTransactionList, "INVTRANLIST" );
Element_add(InvestmentTransactionList, { name: "DTSTART", required: true, order: 0, type: Date, read: InvestmentTransactionList.prototype.getStart, write: InvestmentTransactionList.prototype.setStart });
Element_add(InvestmentTransactionList, { name: "DTEND", required: true, order: 10, type: Date, read: InvestmentTransactionList.prototype.getEnd, write: InvestmentTransactionList.prototype.setEnd });
ChildAggregate_add(InvestmentTransactionList, { order: 20, type: Array, collectionEntryType: BaseInvestmentTransaction, read: InvestmentTransactionList.prototype.getInvestmentTransactions, write: InvestmentTransactionList.prototype.setInvestmentTransactions });
ChildAggregate_add(InvestmentTransactionList, { order: 30, type: Array, collectionEntryType: InvestmentBankTransaction, read: InvestmentTransactionList.prototype.getBankTransactions, write: InvestmentTransactionList.prototype.setBankTransactions });

}
