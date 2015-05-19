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
///<reference path='../TransactionWrappedRequestMessage'/>
///<reference path='BankStatementRequest'/>

module ofx4js.domain.data.banking {

import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Ryan Heaton
 */
export class BankStatementRequestTransaction extends TransactionWrappedRequestMessage<BankStatementRequest> {

  private message: BankStatementRequest;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): BankStatementRequest {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   *
   */
  public setMessage(message: BankStatementRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: BankStatementRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( BankStatementRequestTransaction, "STMTTRNRQ" );
ChildAggregate_add(BankStatementRequestTransaction, { required: true, order: 30, type: BankStatementRequest, read: BankStatementRequestTransaction.prototype.getMessage, write: BankStatementRequestTransaction.prototype.setMessage });

}
