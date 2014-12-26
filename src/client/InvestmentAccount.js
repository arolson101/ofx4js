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
 * @class
 */
function InvestmentAccount() {
}

/**
 * Read an account statement.
 *
 * @param {Date} start The start date of the statement.
 * @param {Date} end The end date of the statement.
 * @throws OFXException if there's an error talking to the brokerage
 * @return {InvestmentStatementResponse} The account statement.
 */
InvestmentAccount.prototype.readStatement = function(/*start, end*/) { throw new Error("not implemented"); };

/**
 * Reads a list of securities from the brokerage
 *
 * @param {SecurityRequest[]} securities the securities to read
 * @return {SecurityList} The security response containing the security infos
 * @throws OFXException if there's an error talking to the brokerage
 */
InvestmentAccount.prototype.readSecurityList = function(/*securities*/) { throw new Error("not implemented"); };

/**
 * The details of the account.
 *
 * @return {InvestmentAccountDetails} The details of the account.
 */
InvestmentAccount.prototype.getDetails = function() { throw new Error("not implemented"); };


module.exports = InvestmentAccount;
