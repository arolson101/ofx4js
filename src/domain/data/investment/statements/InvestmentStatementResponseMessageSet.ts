import { MessageSetType } from "../../MessageSetType";
import { ResponseMessageSet } from "../../ResponseMessageSet";
import { InvestmentStatementResponseTransaction } from "./InvestmentStatementResponseTransaction";
import { ResponseMessage } from "../../ResponseMessage";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Investment statement response message set.
 * @see "Section 13.7.1.2.2, OFX Spec"
 */
export class InvestmentStatementResponseMessageSet extends ResponseMessageSet {

  private statementResponses: Array<InvestmentStatementResponseTransaction>;

  public getType(): MessageSetType {
    return MessageSetType.investment;
  }

  /**
   * Gets the statement response list. Most OFX files have a single statement response.
   *
   * @return the statement response list
   */
  public getStatementResponses(): Array<InvestmentStatementResponseTransaction> {
    return this.statementResponses;
  }


  /**
   * Sets the statement reponse list. Most OFX files have a single statement response.
   *
   * @param statementResponses the statement response list
   */
  public setStatementResponses(statementResponses: Array<InvestmentStatementResponseTransaction>): void {
    this.statementResponses = statementResponses;
  }


  /**
   * Gets the first statement response. Use getStatementResponses() if you are expecting multiple
   * responses.
   *
   * @return the first investment statement response.
   */
  public getStatementResponse(): InvestmentStatementResponseTransaction {
    return this.statementResponses == null || this.statementResponses.length == 0 ? null : this.statementResponses[0];
  }

  /**
   * Sets the statement response if there is a single response.
   *
   * @param statementResponse The statement response.
   */
  public setStatementResponse(statementResponse: InvestmentStatementResponseTransaction): void {
    this.statementResponses = [statementResponse];
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    return this.statementResponses;
  }
}

Aggregate_add( InvestmentStatementResponseMessageSet, "INVSTMTMSGSRSV1" );
ChildAggregate_add(InvestmentStatementResponseMessageSet, { order: 0, type: Array, collectionEntryType: InvestmentStatementResponseTransaction, read: InvestmentStatementResponseMessageSet.prototype.getStatementResponses, write: InvestmentStatementResponseMessageSet.prototype.setStatementResponses });
