import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { Tax1099Response } from "./Tax1099Response";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class Tax1099ResponseTransaction extends TransactionWrappedResponseMessage<Tax1099Response> {

  private tax1099Response: Tax1099Response;

  /**
   * The tax1099Response.
   *
   * @return The tax1099Response.
   */
  public getTax1099Response(): Tax1099Response {
    return this.tax1099Response;
  }

  /**
   * The tax1099Response.
   *
   * @param tax1099Response The message.
   */
  public setTax1099Response(tax1099Response: Tax1099Response): void {
    this.tax1099Response = tax1099Response;
  }

  // Inherited.
  public getWrappedMessage(): Tax1099Response {
    return this.getTax1099Response();
  }
}

Aggregate_add(Tax1099ResponseTransaction, "TAX1099TRNRS");
ChildAggregate_add(Tax1099ResponseTransaction, { required: false, order: 2, type: Tax1099Response, read: Tax1099ResponseTransaction.prototype.getTax1099Response, write: Tax1099ResponseTransaction.prototype.setTax1099Response });
