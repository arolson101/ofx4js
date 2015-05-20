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
import {CreditCardStatementResponse} from "CreditCardStatementResponse";
import {TransactionWrappedResponseMessage} from "../TransactionWrappedResponseMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
 */
export class CreditCardStatementResponseTransaction extends TransactionWrappedResponseMessage<CreditCardStatementResponse> {

  private message: CreditCardStatementResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): CreditCardStatementResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: CreditCardStatementResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): CreditCardStatementResponse {
    return this.getMessage();
  }
}

Aggregate_add( CreditCardStatementResponseTransaction, "CCSTMTTRNRS" )
ChildAggregate_add(CreditCardStatementResponseTransaction, { required: true, order: 30, type: CreditCardStatementResponse, read: CreditCardStatementResponseTransaction.prototype.getMessage, write: CreditCardStatementResponseTransaction.prototype.setMessage });


