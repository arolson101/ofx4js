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
///<reference path="../project.d.ts"/>
import {BankAccount} from "BankAccount";
import {CreditCardAccount} from "CreditCardAccount";
import {InvestmentAccount} from "InvestmentAccount";
import {FinancialInstitutionData} from "FinancialInstitutionData";
import {FinancialInstitutionProfile} from "FinancialInstitutionProfile";
import {OFXException} from "../OFXException";
import {BankAccountDetails} from "../domain/data/banking/BankAccountDetails";
import {CreditCardAccountDetails} from "../domain/data/creditcard/CreditCardAccountDetails";
import {InvestmentAccountDetails} from "../domain/data/investment/accounts/InvestmentAccountDetails";
import {AccountProfile} from "../domain/data/signup/AccountProfile";

/**
 * @author Ryan Heaton
 */
export interface FinancialInstitution {

  /**
   * The financial institution data defining this FI.
   *
   * @return The financial institution data.
   */
  getData(): FinancialInstitutionData;

  /**
   * Read the specified financial institution profile. Implies a network call.
   *
   * @return The profile.
   * @throws OFXException if something goes awry.
   */
  readProfile() /*throws OFXException*/ : Promise<FinancialInstitutionProfile>;

  /**
   * Read the account profiles of the specified user.
   *
   * @param username The username.
   * @param password The password.
   * @return The profiles.
   */
  readAccountProfiles(username: string, password: string) /*throws OFXException*/: Promise<Array<AccountProfile>>;

  /**
   * Load a bank account.
   *
   * @param details The bank account details.
   * @param username The username.
   * @param password The password.
   * @return The bank account.
   */
  loadBankAccount(details: BankAccountDetails, username: string, password: string): BankAccount;

  /**
   * Load a credit card account.
   *
   * @param details The credit card account details.
   * @param username The username.
   * @param password The password.
   * @return The credit card account.
   */
  loadCreditCardAccount(details: CreditCardAccountDetails, username: string, password: string): CreditCardAccount;


  /**
   * Load an investment account.
   *
   * @param details The investment account details.
   * @param username The username.
   * @param password The password.
   * @return The investment account.
   */
  loadInvestmentAccount(details: InvestmentAccountDetails, username: string, password: string): InvestmentAccount;
}


