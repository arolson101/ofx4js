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
import {InvestmentStatementRequestTransaction} from "InvestmentStatementRequestTransaction";
import {MessageSetType} from "../../MessageSetType";
import {RequestMessage} from "../../RequestMessage";
import {RequestMessageSet} from "../../RequestMessageSet";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";

/**
 * Investment statement request message set.
 * @see "Section 13.7.1.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentStatementRequestMessageSet extends RequestMessageSet {

  private statementRequest: InvestmentStatementRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.investment;
  }

  /**
   * Gets the statement request.
   *
   * @return the request
   */
  public getStatementRequest(): InvestmentStatementRequestTransaction {
    return this.statementRequest;
  }

  /**
   * Sets the statement request.
   *
   * @param statementRequest the request
   */
  public setStatementRequest(statementRequest: InvestmentStatementRequestTransaction): void {
    this.statementRequest = statementRequest;
  }

  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getStatementRequest() != null) {
      requestMessages.push(this.getStatementRequest());
    }
    return requestMessages;
  }
}

Aggregate_add( InvestmentStatementRequestMessageSet, "INVSTMTMSGSRQV1" );
ChildAggregate_add(InvestmentStatementRequestMessageSet, { order: 0, type: InvestmentStatementRequestTransaction, read: InvestmentStatementRequestMessageSet.prototype.getStatementRequest, write: InvestmentStatementRequestMessageSet.prototype.setStatementRequest });


