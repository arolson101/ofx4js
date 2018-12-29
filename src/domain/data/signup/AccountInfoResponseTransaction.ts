import { AccountInfoResponse } from "./AccountInfoResponse";
import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class AccountInfoResponseTransaction extends TransactionWrappedResponseMessage<AccountInfoResponse> {

  private message: AccountInfoResponse;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): AccountInfoResponse {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: AccountInfoResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): AccountInfoResponse {
    return this.getMessage();
  }
}

Aggregate_add( AccountInfoResponseTransaction, "ACCTINFOTRNRS" );
ChildAggregate_add(AccountInfoResponseTransaction, { required: true, order: 30, type: AccountInfoResponse, read: AccountInfoResponseTransaction.prototype.getMessage, write: AccountInfoResponseTransaction.prototype.setMessage });
