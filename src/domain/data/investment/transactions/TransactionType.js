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
 * Type of investment transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
var TransactionType = {

  BUY_DEBT: 0,
  BUY_MUTUAL_FUND: 1,
  BUY_OPTION: 2,
  BUY_OTHER: 3,
  BUY_STOCK: 4,
  CLOSE_OPTION: 5,
  INCOME: 6,
  INVESTMENT_EXPENSE: 7,
  JOURNAL_FUND: 8,
  JOURNAL_SECURITY: 9,
  MARGIN_INTEREST: 10,
  REINVEST_INCOME: 11,
  RETURN_OF_CAPITAL: 12,
  SELL_DEBT: 13,
  SELL_MUTUAL_FUND: 14,
  SELL_OPTION: 15,
  SELL_OTHER: 16,
  SELL_STOCK: 17,
  SPLIT: 18,
  TRANSFER: 19
};


module.exports = TransactionType;
