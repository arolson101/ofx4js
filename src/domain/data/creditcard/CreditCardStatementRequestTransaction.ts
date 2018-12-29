import { CreditCardStatementRequest } from "./CreditCardStatementRequest";
import { TransactionWrappedRequestMessage } from "../TransactionWrappedRequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class CreditCardStatementRequestTransaction extends TransactionWrappedRequestMessage<CreditCardStatementRequest> {

  private message: CreditCardStatementRequest;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): CreditCardStatementRequest {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   *
   */
  public setMessage(message: CreditCardStatementRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: CreditCardStatementRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( CreditCardStatementRequestTransaction, "CCSTMTTRNRQ" );
ChildAggregate_add(CreditCardStatementRequestTransaction, { required: true, order: 30, type: CreditCardStatementRequest, read: CreditCardStatementRequestTransaction.prototype.getMessage, write: CreditCardStatementRequestTransaction.prototype.setMessage });
