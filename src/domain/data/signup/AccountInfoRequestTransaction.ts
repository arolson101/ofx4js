import { TransactionWrappedRequestMessage } from "../TransactionWrappedRequestMessage";
import { AccountInfoRequest } from "./AccountInfoRequest";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class AccountInfoRequestTransaction extends TransactionWrappedRequestMessage<AccountInfoRequest> {

  private message: AccountInfoRequest;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): AccountInfoRequest {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: AccountInfoRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: AccountInfoRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( AccountInfoRequestTransaction, "ACCTINFOTRNRQ" );
ChildAggregate_add(AccountInfoRequestTransaction, { required: true, order: 30, type: AccountInfoRequest, read: AccountInfoRequestTransaction.prototype.getMessage, write: AccountInfoRequestTransaction.prototype.setMessage });
