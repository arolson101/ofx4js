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
function FinancialInstitution() {
  throw new Error("interface");
}

/**
 * The financial institution data defining this FI.
 *
 * @return {Promise<FinancialInstitutionData>} The financial institution data.
 */
FinancialInstitution.prototype.getData = function() { throw new Error("not implemented"); };

/**
 * Read the specified financial institution profile. Implies a network call.
 *
 * @return {Promise<FinancialInstitutionProfile>} The profile.
 * @throws OFXException if something goes awry.
 */
FinancialInstitution.prototype.readProfile = function() { throw new Error("not implemented"); };

/**
 * Read the account profiles of the specified user.
 *
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {Promise<AccountProfile[]>} The profiles.
 */
FinancialInstitution.prototype.readAccountProfiles = function(/*username, password*/) { throw new Error("not implemented"); };

/**
 * Load a bank account.
 *
 * @param {BankAccountDetails} details The bank account details.
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {BankAccount} The bank account.
 */
FinancialInstitution.prototype.loadBankAccount = function(/*details, username, password*/) { throw new Error("not implemented"); };

/**
 * Load a credit card account.
 *
 * @param {CreditCardAccountDetails} details The credit card account details.
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {CreditCardAccount} The credit card account.
 */
FinancialInstitution.prototype.loadCreditCardAccount = function(/*details, username, password*/) { throw new Error("not implemented"); };

/**
 * Load an investment account.
 *
 * @param {InvestmentAccountDetails} details The investment account details.
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {InvestmentAccount} The investment account.
 */
FinancialInstitution.prototype.loadInvestmentAccount = function(/*details, username, password*/) { throw new Error("not implemented"); };


module.exports = FinancialInstitution;
