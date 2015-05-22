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
///<reference path='../TransactionWrappedResponseMessage'/>
///<reference path='AccountInfoResponse'/>

module ofx4js.domain.data.signup {

import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Ryan Heaton
 */
export class AccountInfoResponseTransaction extends TransactionWrappedResponseMessage<AccountInfoResponse> {

  private message: AccountInfoResponse;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): AccountInfoResponse {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: AccountInfoResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): AccountInfoResponse {
    return this.getMessage();
  }
}

Aggregate_add( AccountInfoResponseTransaction, "ACCTINFOTRNRS" );
ChildAggregate_add(AccountInfoResponseTransaction, { required: true, order: 30, type: AccountInfoResponse, read: AccountInfoResponseTransaction.prototype.getMessage, write: AccountInfoResponseTransaction.prototype.setMessage });

}
