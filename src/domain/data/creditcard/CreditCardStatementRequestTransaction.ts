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
import { CreditCardStatementRequest } from "./CreditCardStatementRequest";
import { TransactionWrappedRequestMessage } from "../TransactionWrappedRequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Ryan Heaton
 */
export class CreditCardStatementRequestTransaction extends TransactionWrappedRequestMessage<CreditCardStatementRequest> {

  private message: CreditCardStatementRequest;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): CreditCardStatementRequest {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   *
   */
  public setMessage(message: CreditCardStatementRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: CreditCardStatementRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( CreditCardStatementRequestTransaction, "CCSTMTTRNRQ" );
ChildAggregate_add(CreditCardStatementRequestTransaction, { required: true, order: 30, type: CreditCardStatementRequest, read: CreditCardStatementRequestTransaction.prototype.getMessage, write: CreditCardStatementRequestTransaction.prototype.setMessage });
