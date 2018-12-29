import { TransactionWrappedRequestMessage } from "../TransactionWrappedRequestMessage";
import { BankStatementRequest } from "./BankStatementRequest";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class BankStatementRequestTransaction extends TransactionWrappedRequestMessage<BankStatementRequest> {

  private message: BankStatementRequest;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): BankStatementRequest {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   *
   */
  public setMessage(message: BankStatementRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: BankStatementRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( BankStatementRequestTransaction, "STMTTRNRQ" );
ChildAggregate_add(BankStatementRequestTransaction, { required: true, order: 30, type: BankStatementRequest, read: BankStatementRequestTransaction.prototype.getMessage, write: BankStatementRequestTransaction.prototype.setMessage });
