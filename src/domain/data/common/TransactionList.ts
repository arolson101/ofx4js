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
import {Transaction} from "Transaction";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

//import java.util.Date;
//import java.util.List;

/**
 * @author Ryan Heaton
 */
export class TransactionList {

  private start: Date;
  private end: Date;
  private transactions: Array<Transaction>;

  /**
   * The start date.
   *
   * @return The start date.
   */
  public getStart(): Date {
    return this.start;
  }

  /**
   * The start date.
   *
   * @param start The start date.
   */
  public setStart(start: Date): void {
    this.start = start;
  }

  /**
   * The end date.
   *
   * @return The end date.
   */
  public getEnd(): Date {
    return this.end;
  }

  /**
   * The end date.
   *
   * @param end The end date.
   */
  public setEnd(end: Date): void {
    this.end = end;
  }

  /**
   * The transaction list.
   *
   * @return The transaction list.
   */
  public getTransactions(): Array<Transaction> {
    return this.transactions;
  }

  /**
   * The transaction list.
   *
   * @param transactions The transaction list.
   */
  public setTransactions(transactions: Array<Transaction>): void {
    this.transactions = transactions;
  }
}

Aggregate_add( TransactionList, "BANKTRANLIST" );
Element_add(TransactionList, { name: "DTSTART", required: true, order: 0, type: Date, read: TransactionList.prototype.getStart, write: TransactionList.prototype.setStart });
Element_add(TransactionList, { name: "DTEND", required: true, order: 10, type: Date, read: TransactionList.prototype.getEnd, write: TransactionList.prototype.setEnd });
ChildAggregate_add(TransactionList, { order: 20, type: Array, collectionEntryType: Transaction, read: TransactionList.prototype.getTransactions, write: TransactionList.prototype.setTransactions });


