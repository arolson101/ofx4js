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
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Investment transaction aggregate ("INVTRAN").
 * @see "Section 13.9.2.4.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentTransaction {

  private transactionId: string;
  private serverId: string;
  private tradeDate: Date;
  private settlementDate: Date;
  private reversalTransactionId: string;
  private memo: string;

  /**
   * Gets the unique financial institution assigned transaction id. This is a
   * required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the financial institution asssigned transaction id
   */
  public getTransactionId(): string {
    return this.transactionId;
  }

  /**
   * Sets the unique financial institution assigned transaction id. This is a
   * required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param transactionId the financial institution asssigned transaction id
   */
  public setTransactionId(transactionId: string): void {
    this.transactionId = transactionId;
  }

  /**
   * Gets the server assigned transaction id. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the server assigned transaction id
   */
  public getServerId(): string {
    return this.serverId;
  }

  /**
   * Sets the server assigned transaction id. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param serverId the server assigned transaction id
   */
  public setServerId(serverId: string): void {
    this.serverId = serverId;
  }

  /**
   * Gets the trade date of the transaction. For stock splits, this is the
   * day of record. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the trade date
   */
  public getTradeDate(): Date {
    return this.tradeDate;
  }

  /**
   * Sets the trade date of the transaction. For stock splits, this is the
   * day of record. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param tradeDate the trade date
   */
  public setTradeDate(tradeDate: Date): void {
    this.tradeDate = tradeDate;
  }

  /**
   * Gets the settlement date of the transaction. For stock splits, this is the
   * day of of execution. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the trade date
   */
  public getSettlementDate(): Date {
    return this.settlementDate;
  }

  /**
   * Sets the settlement date of the transaction. For stock splits, this is the
   * day of of execution. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param settlementDate the trade date
   */
  public setSettlementDate(settlementDate: Date): void {
    this.settlementDate = settlementDate;
  }

  /**
   * For a reveral transaction, gets the financial institution assigned
   * transaction id for the transaction being revesed.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the transaction id of the transaction being reversed
   */
  public getReversalTransactionId(): string {
    return this.reversalTransactionId;
  }

  /**
   * For a reveral transaction, gets the financial institution assigned
   * transaction id for the transaction being revesed.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param reversalTransactionId the transaction id of the transaction being reversed
   */
  public setReversalTransactionId(reversalTransactionId: string): void {
    this.reversalTransactionId = reversalTransactionId;
  }

  /**
   * Gets the memo associated with the transaction. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the memo
   */
  public getMemo(): string {
    return this.memo;
  }

  /**
   * Sets the memo associated with the transaction. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @param memo the memo
   */
  public setMemo(memo: string): void {
    this.memo = memo;
  }
}

Aggregate_add( InvestmentTransaction, "INVTRAN" );
Element_add(InvestmentTransaction, { name: "FITID", required: true, order: 0, type: String, read: InvestmentTransaction.prototype.getTransactionId, write: InvestmentTransaction.prototype.setTransactionId });
Element_add(InvestmentTransaction, { name: "SRVRTID", order: 10, type: String, read: InvestmentTransaction.prototype.getServerId, write: InvestmentTransaction.prototype.setServerId });
Element_add(InvestmentTransaction, { name: "DTTRADE", required: true, order: 20, type: Date, read: InvestmentTransaction.prototype.getTradeDate, write: InvestmentTransaction.prototype.setTradeDate });
Element_add(InvestmentTransaction, { name: "DTSETTLE", order: 30, type: Date, read: InvestmentTransaction.prototype.getSettlementDate, write: InvestmentTransaction.prototype.setSettlementDate });
Element_add(InvestmentTransaction, { name: "REVERSALFITID", order: 40, type: String, read: InvestmentTransaction.prototype.getReversalTransactionId, write: InvestmentTransaction.prototype.setReversalTransactionId });
Element_add(InvestmentTransaction, { name: "MEMO", order: 50, type: String, read: InvestmentTransaction.prototype.getMemo, write: InvestmentTransaction.prototype.setMemo });


