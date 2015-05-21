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
///<reference path='../domain/data/common/BalanceInfo'/>
///<reference path='../domain/data/common/TransactionList'/>

module ofx4js.client {

import BalanceInfo = ofx4js.domain.data.common.BalanceInfo;
import TransactionList = ofx4js.domain.data.common.TransactionList;

/**
 * @author Ryan Heaton
 */
export interface AccountStatement {

  /**
   * The currency code.
   *
   * @return The currency code.
   * @see java.util.Currency#getCurrencyCode()
   */
  getCurrencyCode(): string;

  /**
   * The transaction list.
   *
   * @return The transaction list.
   */
  getTransactionList(): TransactionList;

  /**
   * The ledger balance.
   *
   * @return The ledger balance.
   */
  getLedgerBalance(): BalanceInfo;

  /**
   * The available balance.
   *
   * @return The available balance.
   */
  getAvailableBalance(): BalanceInfo;

}

}