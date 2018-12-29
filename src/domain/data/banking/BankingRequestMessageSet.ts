import { RequestMessageSet } from "../RequestMessageSet";
import { BankStatementRequestTransaction } from "./BankStatementRequestTransaction";
import { MessageSetType } from "../MessageSetType";
import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class BankingRequestMessageSet extends RequestMessageSet {

  private statementRequest: BankStatementRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.banking;
  }

  /**
   * The statement request.
   *
   * @return The statement request.
   */
  public getStatementRequest(): BankStatementRequestTransaction {
    return this.statementRequest;
  }

  /**
   * The statement request.
   *
   * @param statementRequest The statement request.
   */
  public setStatementRequest(statementRequest: BankStatementRequestTransaction): void {
    this.statementRequest = statementRequest;
  }

  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = [];
    if (this.getStatementRequest() != null) {
      requestMessages.push(this.getStatementRequest());
    }
    return requestMessages;
  }
}

Aggregate_add( BankingRequestMessageSet, "BANKMSGSRQV1" );
ChildAggregate_add(BankingRequestMessageSet, { order: 0, type: BankStatementRequestTransaction, read: BankingRequestMessageSet.prototype.getStatementRequest, write: BankingRequestMessageSet.prototype.setStatementRequest });
