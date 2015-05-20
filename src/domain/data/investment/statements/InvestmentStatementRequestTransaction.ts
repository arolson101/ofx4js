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
import {InvestmentStatementRequest} from "InvestmentStatementRequest";
import {TransactionWrappedRequestMessage} from "../../TransactionWrappedRequestMessage";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";

/**
 * Investment statement transaction request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentStatementRequestTransaction
    extends TransactionWrappedRequestMessage<InvestmentStatementRequest> {

  private message: InvestmentStatementRequest;

  /**
   * Gets the the statement request message.
   *
   * @return the statement request message.
   */
  public getMessage(): InvestmentStatementRequest {
    return this.message;
  }

  /**
   * Sets the the statement request message.
   *
   * @param message the statement request message.
   */
  public setMessage(message: InvestmentStatementRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: InvestmentStatementRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add(InvestmentStatementRequestTransaction, "INVSTMTTRNRQ");
ChildAggregate_add(InvestmentStatementRequestTransaction, { required: true, order: 30, type: InvestmentStatementRequest, read: InvestmentStatementRequestTransaction.prototype.getMessage, write: InvestmentStatementRequestTransaction.prototype.setMessage });


