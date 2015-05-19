/*
 * Copyright 2008 Web Cohesion
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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../MessageSetType'/>
///<reference path='../ResponseMessage'/>
///<reference path='../ResponseMessageSet'/>
///<reference path='CreditCardStatementResponseTransaction'/>

module ofx4js.domain.data.creditcard {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Ryan Heaton
 */
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

}
