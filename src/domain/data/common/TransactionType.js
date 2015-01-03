/*
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

"use strict";

/**
 * @enum
 */
var TransactionType = {

  /**
   * generic credit.
   */
  CREDIT: "CREDIT",

  /**
   * genertic debit.
   */
  DEBIT: "DEBIT",

  /**
   * interest earned.
   */
  INT: "INT",

  /**
   * dividend.
   */
  DIV: "DIV",

  /**
   * bank fee.
   */
  FEE: "FEE",

  /**
   * service charge.
   */
  SRVCHG: "SRVCHG",

  /**
   * deposit.
   */
  DEP: "DEP",

  /**
   * ATM transaction.
   */
  ATM: "ATM",

  /**
   * point of sale
   */
  POS: "POS",

  /**
   * transfer
   */
  XFER: "XFER",

  /**
   * check
   */
  CHECK: "CHECK",

  /**
   * electronic payment
   */
  PAYMENT: "PAYMENT",

  /**
   * cash.
   */
  CASH: "CASH",

  /**
   * direct deposit.
   */
  DIRECTDEP: "DIRECTDEP",

  /**
   * merchant-initiated debit
   */
  DIRECTDEBIT: "DIRECTDEBIT",

  /**
   * repeating payment.
   */
  REPEATPMT: "REPEATPMT",

  /**
   * other
   */
  OTHER: "OTHER",
};


module.exports = TransactionType;
