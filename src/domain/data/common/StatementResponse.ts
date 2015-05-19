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
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../../../meta/Element_add'/>
///<reference path='../ResponseMessage'/>
///<reference path='../../../client/AccountStatement'/>
///<reference path='BalanceInfo'/>
///<reference path='TransactionList'/>

module ofx4js.domain.data.common {

import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;
import AccountStatement = ofx4js.client.AccountStatement;

//import java.util.Locale;

/**
 * @author Ryan Heaton
 */
export /*abstract*/ class StatementResponse extends ResponseMessage implements AccountStatement {

  private currencyCode: string;
  private transactionList: TransactionList;
  private ledgerBalance: BalanceInfo;
  private availableBalance: BalanceInfo;
  private marketingInfo: string;

  constructor() {
    super();
    this.currencyCode = "USD"; //java.util.Currency.getInstance(Locale.US).getCurrencyCode().toUpperCase();
  }

  /**
   * The currency code.
   *
   * @return The currency code.
   * @see java.util.Currency#getCurrencyCode()
   */
  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * The currency code.
   *
   * @param currencyCode The currency code.
   */
  public setCurrencyCode(currencyCode: string): void {
    this.currencyCode = currencyCode;
  }

  /**
   * The transaction list.
   *
   * @return The transaction list.
   */
  public getTransactionList(): TransactionList {
    return this.transactionList;
  }

  /**
   * The transaction list.
   *
   * @param transactionList The transaction list.
   */
  public setTransactionList(transactionList: TransactionList): void {
    this.transactionList = transactionList;
  }

  /**
   * The ledger balance.
   *
   * @return The ledger balance.
   */
  public getLedgerBalance(): BalanceInfo {
    return this.ledgerBalance;
  }

  /**
   * The ledger balance.
   *
   * @param ledgerBalance The ledger balance.
   */
  public setLedgerBalance(ledgerBalance: BalanceInfo): void {
    this.ledgerBalance = ledgerBalance;
  }

  /**
   * The available balance.
   *
   * @return The available balance.
   */
  public getAvailableBalance(): BalanceInfo {
    return this.availableBalance;
  }

  /**
   * The available balance.
   *
   * @param availableBalance The available balance.
   */
  public setAvailableBalance(availableBalance: BalanceInfo): void {
    this.availableBalance = availableBalance;
  }

  /**
   * Marketing information. (?)
   *
   * @return Marketing information.
   */
  public getMarketingInfo(): string {
    return this.marketingInfo;
  }

  /**
   * Marketing information. (?)
   *
   * @param marketingInfo Marketing information.
   */
  public setMarketingInfo(marketingInfo: string): void {
    this.marketingInfo = marketingInfo;
  }
}

Element_add(StatementResponse, { name: "CURDEF", required: true, order: 0, type: String, read: StatementResponse.prototype.getCurrencyCode, write: StatementResponse.prototype.setCurrencyCode });
ChildAggregate_add(StatementResponse, { order: 20, type: TransactionList, read: StatementResponse.prototype.getTransactionList, write: StatementResponse.prototype.setTransactionList });
ChildAggregate_add(StatementResponse, { name: "LEDGERBAL", order: 30, type: BalanceInfo, read: StatementResponse.prototype.getLedgerBalance, write: StatementResponse.prototype.setLedgerBalance });
ChildAggregate_add(StatementResponse, { name: "AVAILBAL", order: 40, type: BalanceInfo, read: StatementResponse.prototype.getAvailableBalance, write: StatementResponse.prototype.setAvailableBalance });
Element_add(StatementResponse, { name: "MKTGINFO", order: 50, type: String, read: StatementResponse.prototype.getMarketingInfo, write: StatementResponse.prototype.setMarketingInfo });
}
