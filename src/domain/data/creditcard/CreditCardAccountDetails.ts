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
import { AccountDetails } from "../common/AccountDetails";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @author Ryan Heaton
 *
 * @see "OFX Spec, Section 11.3.2"
 */
export class CreditCardAccountDetails implements AccountDetails {

  private accountNumber: string;
  private accountKey: string;

  /**
   * The account number.
   *
   * @return The account number.
   */
  public getAccountNumber(): string {
    return this.accountNumber;
  }

  /**
   * The account number.
   *
   * @param accountNumber The account number.
   */
  public setAccountNumber(accountNumber: string): void {
    this.accountNumber = accountNumber;
  }

  /**
   * The account key.
   *
   * @return The account key.
   */
  public getAccountKey(): string {
    return this.accountKey;
  }

  /**
   * The account key.
   *
   * @param accountKey The account key.
   */
  public setAccountKey(accountKey: string): void {
    this.accountKey = accountKey;
  }
}

Aggregate_add( CreditCardAccountDetails );
Element_add(CreditCardAccountDetails, { name: "ACCTID", required: true, order: 0, type: String, read: CreditCardAccountDetails.prototype.getAccountNumber, write: CreditCardAccountDetails.prototype.setAccountNumber });
Element_add(CreditCardAccountDetails, { name: "ACCTKEY", order: 10, type: String, read: CreditCardAccountDetails.prototype.getAccountKey, write: CreditCardAccountDetails.prototype.setAccountKey });
