import { RequestMessageSet } from "../RequestMessageSet";
import { CreditCardStatementRequestTransaction } from "./CreditCardStatementRequestTransaction";
import { MessageSetType } from "../MessageSetType";
import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


//import java.util.List;
//import java.util.ArrayList;

export class CreditCardRequestMessageSet extends RequestMessageSet {

  private statementRequest: CreditCardStatementRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.creditcard;
  }

  /**
   * The request.
   *
   * @return The request.
   */
  public getStatementRequest(): CreditCardStatementRequestTransaction {
    return this.statementRequest;
  }

  /**
   * The request.
   *
   * @param statementRequest The request.
   */
  public setStatementRequest(statementRequest: CreditCardStatementRequestTransaction): void {
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

Aggregate_add( CreditCardRequestMessageSet, "CREDITCARDMSGSRQV1" );
ChildAggregate_add(CreditCardRequestMessageSet, { order: 0, type: CreditCardStatementRequestTransaction, read: CreditCardRequestMessageSet.prototype.getStatementRequest, write: CreditCardRequestMessageSet.prototype.setStatementRequest });
