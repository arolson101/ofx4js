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
import { InvestmentStatementResponse } from "./InvestmentStatementResponse";
import { TransactionWrappedResponseMessage } from "../../TransactionWrappedResponseMessage";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Investment statement transaction response.
 * @see "Section 13.9.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentStatementResponseTransaction
    extends TransactionWrappedResponseMessage<InvestmentStatementResponse> {

  private message: InvestmentStatementResponse;

  /**
   * Gets the the statement response message.
   *
   * @return the statement response message.
   */
  public getMessage(): InvestmentStatementResponse {
    return this.message;
  }

  /**
   * Sets the the statement response message.
   *
   * @param message the statement response message.
   */
  public setMessage(message: InvestmentStatementResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): InvestmentStatementResponse {
    return this.getMessage();
  }
}

Aggregate_add( InvestmentStatementResponseTransaction, "INVSTMTTRNRS" );
ChildAggregate_add(InvestmentStatementResponseTransaction, { required: true, order: 30, type: InvestmentStatementResponse, read: InvestmentStatementResponseTransaction.prototype.getMessage, write: InvestmentStatementResponseTransaction.prototype.setMessage });
