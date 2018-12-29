import { ResponseMessage } from "../ResponseMessage";
import { AccountProfile } from "./AccountProfile";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";

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
