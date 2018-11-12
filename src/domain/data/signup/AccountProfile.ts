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
import { BankAccountInfo } from "../banking/BankAccountInfo";
import { CreditCardAccountInfo } from "../creditcard/CreditCardAccountInfo";
import { InvestmentAccountInfo } from "../investment/accounts/InvestmentAccountInfo";
import { AccountInfo } from "../common/AccountInfo";
import { OFXException } from "../../../OFXException";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Ryan Heaton
 */
export class AccountProfile {

  private description: string;
  private phone: string;
  private bankSpecifics: BankAccountInfo;
  private creditCardSpecifics: CreditCardAccountInfo;
  private investSpecifics: InvestmentAccountInfo;

  /**
   * Description of the account.
   *
   * @return The description of the account.
   */
  public getDescription(): string {
    return this.description;
  }

  /**
   * The description of the account.
   *
   * @param description The description of the account.
   */
  public setDescription(description: string): void {
    this.description = description;
  }

  /**
   * Phone number for the account.
   *
   * @return Phone number for the account.
   */
  public getPhone(): string {
    return this.phone;
  }

  /**
   * Phone number for the account.
   *
   * @param phone Phone number for the account.
   */
  public setPhone(phone: string): void {
    this.phone = phone;
  }

  /**
   * Account specifics.
   *
   * @return Account specifics.
   */
  public getSpecifics(): AccountInfo {
    if (this.getBankSpecifics() != null && this.getCreditCardSpecifics() != null) {
      throw new OFXException("Only one account specifics aggregate can be set at a time.");
    }
    else if (this.getBankSpecifics() != null) {
      return this.getBankSpecifics();
    } else if (this.getInvestmentSpecifics() != null) {
      return this.getInvestmentSpecifics();
    }
    else {
      return this.getCreditCardSpecifics();
    }
  }

  /**
   * Account specifics.
   *
   * @param specifics Account specifics.
   */
  public setSpecifics(specifics: AccountInfo): void {
    if (specifics instanceof BankAccountInfo) {
      this.setBankSpecifics(<BankAccountInfo> specifics);
    }
    else if (specifics instanceof CreditCardAccountInfo) {
      this.setCreditCardSpecifics(<CreditCardAccountInfo> specifics);
    } else if (specifics instanceof InvestmentAccountInfo) {
      this.setInvestmentSpecifics(<InvestmentAccountInfo> specifics);
    }
    else {
      throw new OFXException("Unknown specifics type: " + specifics);
    }
  }

  /**
   * Bank-specific info.
   *
   * @return Bank-specific info.
   */
  public getBankSpecifics(): BankAccountInfo {
    return this.bankSpecifics;
  }

  /**
   * Bank-specific info.
   *
   * @param bankSpecifics Bank-specific info.
   */
  public setBankSpecifics(bankSpecifics: BankAccountInfo): void {
    this.creditCardSpecifics = null;
    this.investSpecifics = null;
    this.bankSpecifics = bankSpecifics;
  }

  /**
   * Credit-card account info.
   *
   * @return Credit-card account info.
   */
  public getCreditCardSpecifics(): CreditCardAccountInfo {
    return this.creditCardSpecifics;
  }

  /**
   * Credit-card account info.
   *
   * @param creditCardSpecifics Credit-card account info.
   */
  public setCreditCardSpecifics(creditCardSpecifics: CreditCardAccountInfo): void {
    this.bankSpecifics = null;
    this.investSpecifics = null;
    this.creditCardSpecifics = creditCardSpecifics;
  }

  /**
   * Investment account info.
   *
   * @return Investment account info.
   */
  public getInvestmentSpecifics(): InvestmentAccountInfo {
    return this.investSpecifics;
  }

  /**
   * Investment account info.
   *
   * @param investSpecifics Investment account info.
   */
  public setInvestmentSpecifics(investSpecifics: InvestmentAccountInfo): void {
    this.bankSpecifics = null;
    this.creditCardSpecifics = null;
    this.investSpecifics = investSpecifics;
  }
}

Aggregate_add( AccountProfile, "ACCTINFO" );
Element_add(AccountProfile, { name: "DESC", order: 0, type: String, read: AccountProfile.prototype.getDescription, write: AccountProfile.prototype.setDescription });
Element_add(AccountProfile, { name: "PHONE", order: 10, type: String, read: AccountProfile.prototype.getPhone, write: AccountProfile.prototype.setPhone });
ChildAggregate_add(AccountProfile, { order: 20, type: BankAccountInfo, read: AccountProfile.prototype.getBankSpecifics, write: AccountProfile.prototype.setBankSpecifics });
ChildAggregate_add(AccountProfile, { order: 30, type: CreditCardAccountInfo, read: AccountProfile.prototype.getCreditCardSpecifics, write: AccountProfile.prototype.setCreditCardSpecifics });
ChildAggregate_add(AccountProfile, { order: 40, type: InvestmentAccountInfo, read: AccountProfile.prototype.getInvestmentSpecifics, write: AccountProfile.prototype.setInvestmentSpecifics });
