/*
 * Copyright 2010 Web Cohesion
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
import {AccountDetails} from "../../common/AccountDetails";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Aggregate for the details that identifity a brokerage account.
 *
 * @author Jon Perlow
 * @see "OFX Spec, Section 13.6.1"
 */
export class InvestmentAccountDetails implements AccountDetails {

  private brokerId: string;
  private accountNumber: string;
  private accountKey: string;


  /**
   * Gets the broker id.
   *
   * @return the id of the broker
   */
  public getBrokerId(): string {
    return this.brokerId;
  }

  /**
   * Sets the broker id.
   *
   * @param brokerId the id of the broker
   */
  public setBrokerId(brokerId: string): void {
    this.brokerId = brokerId;
  }

  /**
   * Gets the account number.
   *
   * @return the account number
   */
  public getAccountNumber(): string {
    return this.accountNumber;
  }

  /**
   * Sets the account number.
   *
   * @param accountNumber the account number
   */
  public setAccountNumber(accountNumber: string): void {
    this.accountNumber = accountNumber;
  }

  /**
   * Gets the account key.
   *
   * @return the account key
   */
  public getAccountKey(): string {
    return this.accountKey;
  }

  /**
   * Sets the account key.
   *
   * @param accountKey the account key
   */
  public setAccountKey(accountKey: string): void {
    this.accountKey = accountKey;
  }
}

Aggregate_add( InvestmentAccountDetails );
Element_add(InvestmentAccountDetails, { name: "BROKERID", required: true, order: 0, type: String, read: InvestmentAccountDetails.prototype.getBrokerId, write: InvestmentAccountDetails.prototype.setBrokerId });
Element_add(InvestmentAccountDetails, { name: "ACCTID", required: true, order: 20, type: String, read: InvestmentAccountDetails.prototype.getAccountNumber, write: InvestmentAccountDetails.prototype.setAccountNumber });
Element_add(InvestmentAccountDetails, { name: "ACCTKEY", order: 40, type: String, read: InvestmentAccountDetails.prototype.getAccountKey, write: InvestmentAccountDetails.prototype.setAccountKey });


