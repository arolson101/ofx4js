import { CreditCardStatementResponse } from "./CreditCardStatementResponse";
import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class CreditCardStatementResponseTransaction extends TransactionWrappedResponseMessage<CreditCardStatementResponse> {

  private message: CreditCardStatementResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): CreditCardStatementResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: CreditCardStatementResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): CreditCardStatementResponse {
    return this.getMessage();
  }
}

Aggregate_add( CreditCardStatementResponseTransaction, "CCSTMTTRNRS" )
ChildAggregate_add(CreditCardStatementResponseTransaction, { required: true, order: 30, type: CreditCardStatementResponse, read: CreditCardStatementResponseTransaction.prototype.getMessage, write: CreditCardStatementResponseTransaction.prototype.setMessage });
