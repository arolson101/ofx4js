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
///<reference path='../ResponseMessageSet'/>
///<reference path='Tax1099ResponseTransaction'/>

module ofx4js.domain.data.tax1099 {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class Tax1099ResponseMessageSet extends ResponseMessageSet {

  private taxResponseTransaction: Array<Tax1099ResponseTransaction>;

  public getType(): MessageSetType {
    return MessageSetType.tax1099;
  }

  /**
   * The taxResponseTransaction list.
   *
   * Most OFX files have a single statement response, except MT2OFX
   * which outputs OFX with multiple statement responses
   * in a single banking response message set.
   *
   * @return The taxResponseTransaction list.
   */
  public getTaxResponseTransaction(): Array<Tax1099ResponseTransaction> {
    return this.taxResponseTransaction;
  }

  /**
   * The taxResponseTransaction.
   *
   * @param taxResponseTransaction The statement responses.
   */
  public setTaxResponseTransaction(taxResponseTransaction: Tax1099ResponseTransaction | Array<Tax1099ResponseTransaction>): void {
    if(taxResponseTransaction instanceof Array) {
      this.taxResponseTransaction = <Array<Tax1099ResponseTransaction>>taxResponseTransaction;
    } else if(taxResponseTransaction instanceof Tax1099ResponseTransaction) {
      this.taxResponseTransaction = [<Tax1099ResponseTransaction>taxResponseTransaction];
    } else {
      throw new Error("invalid type");
    }
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    return this.taxResponseTransaction;
  }

  /**
   * The first statement response.
   *
   * @return the first bank statement response.
   * @deprecated Use getStatementResponses() because sometimes there are multiple responses
   */
  public getStatementResponse(): Tax1099ResponseTransaction {
    return this.taxResponseTransaction == null || this.taxResponseTransaction.length == 0 ? null : this.taxResponseTransaction[0];
  }
}
  
Aggregate_add( Tax1099ResponseMessageSet, "TAX1099MSGSRSV1" );
ChildAggregate_add(Tax1099ResponseMessageSet, { order: 0, type: Array, collectionEntryType: Tax1099ResponseTransaction, read: Tax1099ResponseMessageSet.prototype.getTaxResponseTransaction, write: Tax1099ResponseMessageSet.prototype.setTaxResponseTransaction });

}
