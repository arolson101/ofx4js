import { ResponseMessageSet } from "../ResponseMessageSet";
import { BankStatementResponseTransaction } from "./BankStatementResponseTransaction";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class BankingResponseMessageSet extends ResponseMessageSet {

  private statementResponses: Array<BankStatementResponseTransaction>;

  public getType(): MessageSetType {
    return MessageSetType.banking;
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
  public getStatementResponses(): Array<BankStatementResponseTransaction> {
    return this.statementResponses;
  }

  /**
   * The statement response.
   *
   * @param statementResponses The statement responses.
   */
  public setStatementResponses(statementResponses: Array<BankStatementResponseTransaction>): void {
    this.statementResponses = statementResponses;
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    return this.statementResponses;
  }

  /**
   * The first statement response.
   *
   * @return the first bank statement response.
   * @deprecated Use getStatementResponses() because sometimes there are multiple responses
   */
  public getStatementResponse(): BankStatementResponseTransaction {
    return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
  }

  public setStatementResponse(statementResponse: BankStatementResponseTransaction): void {
    this.statementResponses = [statementResponse];
  }

}

Aggregate_add( BankingResponseMessageSet, "BANKMSGSRSV1" );
ChildAggregate_add(BankingResponseMessageSet, { order: 0, type: Array, collectionEntryType: BankStatementResponseTransaction, read: BankingResponseMessageSet.prototype.getStatementResponses, write: BankingResponseMessageSet.prototype.setStatementResponses });
