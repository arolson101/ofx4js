import { ResponseMessageSet } from "../ResponseMessageSet";
import { CreditCardStatementResponseTransaction } from "./CreditCardStatementResponseTransaction";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class CreditCardResponseMessageSet extends ResponseMessageSet {

  private statementResponses: Array<CreditCardStatementResponseTransaction>;

  public getType(): MessageSetType {
    return MessageSetType.creditcard;
  }

  /**
   * The statement response list.
   *
   * Most OFX files have a single statement response, except MT2OFX
   * which outputs OFX with multiple statement responses
   * in a single banking response message set.
   *
   * @return The statement response list.
   */
  public getStatementResponses(): Array<CreditCardStatementResponseTransaction> {
    return this.statementResponses;
  }


  /**
   * The statement reponse list.
   *
   * @param statementResponses The statement response list.
   */
  public setStatementResponses(statementResponses: Array<CreditCardStatementResponseTransaction>): void {
    this.statementResponses = statementResponses;
  }


  /**
   * The first statement response.
   *
   * @return the first bank statement response.
   * @deprecated Use getStatementResponses() because sometimes there are multiple responses
   */
  public getStatementResponse(): CreditCardStatementResponseTransaction {
    return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
  }

  /**
   * The statement response.
   *
   * @param statementResponse The statement response.
   */
  public setStatementResponse(statementResponse: CreditCardStatementResponseTransaction): void {
    this.statementResponses = [statementResponse];
  }


  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    return this.statementResponses;
  }
}

Aggregate_add( CreditCardResponseMessageSet, "CREDITCARDMSGSRSV1" );
ChildAggregate_add(CreditCardResponseMessageSet, { order: 0, type: Array, collectionEntryType: CreditCardStatementResponseTransaction, read: CreditCardResponseMessageSet.prototype.getStatementResponses, write: CreditCardResponseMessageSet.prototype.setStatementResponses });
