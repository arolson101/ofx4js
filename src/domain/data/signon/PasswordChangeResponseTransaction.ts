import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { PasswordChangeResponse } from "./PasswordChangeResponse";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class PasswordChangeResponseTransaction extends TransactionWrappedResponseMessage<PasswordChangeResponse> {

  private message: PasswordChangeResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): PasswordChangeResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: PasswordChangeResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): PasswordChangeResponse {
    return this.getMessage();
  }
}

Aggregate_add(PasswordChangeResponseTransaction, "PINCHTRNRS");
ChildAggregate_add(PasswordChangeResponseTransaction, { required: true, order: 30, type: PasswordChangeResponse, read: PasswordChangeResponseTransaction.prototype.getMessage, write: PasswordChangeResponseTransaction.prototype.setMessage });
