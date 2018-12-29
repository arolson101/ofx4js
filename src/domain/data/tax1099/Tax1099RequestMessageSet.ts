import { RequestMessageSet } from "../RequestMessageSet";
import { Tax1099RequestTransaction } from "./Tax1099RequestTransaction";
import { MessageSetType } from "../MessageSetType";
import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";

export class Tax1099RequestMessageSet extends RequestMessageSet {

  private taxRequestTransaction: Tax1099RequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.tax1099;
  }

  /**
   * The statement request.
   *
   * @return The statement request.
   */
  public getTaxRequestTransaction(): Tax1099RequestTransaction {
    return this.taxRequestTransaction;
  }

  /**
   * The statement request.
   *
   * @param taxRequestTransaction The statement request.
   */
  public setTaxRequestTransaction(taxRequestTransaction: Tax1099RequestTransaction) {
    this.taxRequestTransaction = taxRequestTransaction;
  }

  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getTaxRequestTransaction() != null) {
      requestMessages.push(this.getTaxRequestTransaction());
    }
    return requestMessages;
  }
}

Aggregate_add(Tax1099RequestMessageSet, "TAX1099MSGSRQV1" );
ChildAggregate_add(Tax1099RequestMessageSet, { order: 0, type: Tax1099RequestTransaction, read: Tax1099RequestMessageSet.prototype.getTaxRequestTransaction, write: Tax1099RequestMessageSet.prototype.setTaxRequestTransaction });
