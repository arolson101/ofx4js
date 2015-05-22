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
///<reference path='../RequestMessageSet'/>
///<reference path='CreditCardStatementRequestTransaction'/>

module ofx4js.domain.data.creditcard {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

//import java.util.List;
//import java.util.ArrayList;

/**
 * @author Ryan Heaton
 */
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

}
