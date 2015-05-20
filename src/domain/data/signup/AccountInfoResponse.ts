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
import {AccountProfile} from "AccountProfile";
import {ResponseMessage} from "../ResponseMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
 */
export class AccountInfoResponse extends ResponseMessage {

  private lastUpdated: Date;
  private accounts: Array<AccountProfile>;
  
  constructor() {
    super();
    this.lastUpdated = new Date(0); //default is never updated.
  }

  public getResponseMessageName(): string {
    return "account info";
  }

  /**
   * When the account info was last updated.
   *
   * @return When the account info was last updated.
   */
  public getLastUpdated(): Date {
    return this.lastUpdated;
  }

  /**
   * When the account info was last updated.
   *
   * @param lastUpdated When the account info was last updated.
   */
  public setLastUpdated(lastUpdated: Date): void {
    this.lastUpdated = lastUpdated;
  }

  /**
   * The accounts.
   *
   * @return The accounts.
   */
  public getAccounts(): Array<AccountProfile> {
    return this.accounts;
  }

  /**
   * The accounts.
   *
   * @param accounts The accounts.
   */
  public setAccounts(accounts: Array<AccountProfile>): void {
    this.accounts = accounts;
  }
}

Aggregate_add(AccountInfoResponse, "ACCTINFORS");
Element_add(AccountInfoResponse, { name: "DTACCTUP", required: true, order: 0, type: Date, read: AccountInfoResponse.prototype.getLastUpdated, write: AccountInfoResponse.prototype.setLastUpdated });
ChildAggregate_add(AccountInfoResponse, { order: 10, type: Array, collectionEntryType: AccountProfile, read: AccountInfoResponse.prototype.getAccounts, write: AccountInfoResponse.prototype.setAccounts });

