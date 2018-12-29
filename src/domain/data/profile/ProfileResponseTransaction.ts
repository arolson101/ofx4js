import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { ProfileResponse } from "./ProfileResponse";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class ProfileResponseTransaction extends TransactionWrappedResponseMessage<ProfileResponse> {

  private message: ProfileResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): ProfileResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: ProfileResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): ProfileResponse {
    return this.getMessage();
  }
}

Aggregate_add(ProfileResponseTransaction, "PROFTRNRS");
ChildAggregate_add(ProfileResponseTransaction, { required: true, order: 30, type: ProfileResponse, read: ProfileResponseTransaction.prototype.getMessage, write: ProfileResponseTransaction.prototype.setMessage });
