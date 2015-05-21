/*
 * Copyright 2010 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='../../MessageSetType'/>
///<reference path='../../ResponseMessage'/>
///<reference path='../../ResponseMessageSet'/>
///<reference path='InvestmentStatementResponseTransaction'/>

module ofx4js.domain.data.investment.statements {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Investment statement response message set.
 * @see "Section 13.7.1.2.2, OFX Spec"
 *
 * @author Jon Perlow
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

}
