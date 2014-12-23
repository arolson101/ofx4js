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

var inherit = require("../inherit");

/**
 * @author Ryan Heaton
 */
var TransactionType = {

  /**
   * generic: 0 credit.
   */
  CREDIT: 1,

  /**
   * genertic: 2 debit.
   */
  DEBIT: 3,

  /**
   * interest: 4 earned.
   */
  INT: 5,

  /**
   * dividend: 6.
   */
  DIV: 7,

  /**
   * bank: 8 fee.
   */
  FEE: 9,

  /**
   * service: 10 charge.
   */
  SRVCHG: 11,

  /**
   * deposit: 12.
   */
  DEP: 13,

  /**
   * ATM: 14 transaction.
   */
  ATM: 15,

  /**
   * point: 16 of sale
   */
  POS: 17,

  /**
   * transfer: 18
   */
  XFER: 19,

  /**
   * check: 20
   */
  CHECK: 21,

  /**
   * electronic: 22 payment
   */
  PAYMENT: 23,

  /**
   * cash: 24.
   */
  CASH: 25,

  /**
   * direct: 26 deposit.
   */
  DIRECTDEP: 27,

  /**
   * merchant: 28-initiated debit
   */
  DIRECTDEBIT: 29,

  /**
   * repeating: 30 payment.
   */
  REPEATPMT: 31,

  /**
   * other: 32
   */
  OTHER: 33
};


module.exports = TransactionType;
