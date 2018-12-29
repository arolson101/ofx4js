import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { SecurityListResponse } from "./SecurityListResponse";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * Security list transaction response.
 * @see "Section 13.8.3.1, OFX Spec"
 */
export class SecurityListResponseTransaction
    extends TransactionWrappedResponseMessage<SecurityListResponse> {

  private message: SecurityListResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): SecurityListResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: SecurityListResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): SecurityListResponse {
    return this.getMessage();
  }
}

Aggregate_add( SecurityListResponseTransaction, "SECLISTTRNRS");
ChildAggregate_add(SecurityListResponseTransaction, { required: true, order: 30, type: SecurityListResponse, read: SecurityListResponseTransaction.prototype.getMessage, write: SecurityListResponseTransaction.prototype.setMessage });
