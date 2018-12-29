import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


export class AccountInfoRequest extends RequestMessage {

  private lastUpdated: Date;

  constructor() {
    super();
    this.lastUpdated = new Date(0); //default is never updated.
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
}

Aggregate_add(AccountInfoRequest, "ACCTINFORQ");
Element_add(AccountInfoRequest, { name: "DTACCTUP", required: true, order: 0, type: Date, read: AccountInfoRequest.prototype.getLastUpdated, write: AccountInfoRequest.prototype.setLastUpdated });
