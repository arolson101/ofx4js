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
///<reference path='AccountInfoRequest'/>

module ofx4js.domain.data.signup {

import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Aggregate_add = ofx4js.meta.Aggregate_add;

/**
 * @author Ryan Heaton
 */
export class AccountInfoRequestTransaction extends TransactionWrappedRequestMessage<AccountInfoRequest> {

  private message: AccountInfoRequest;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): AccountInfoRequest {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: AccountInfoRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: AccountInfoRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( AccountInfoRequestTransaction, "ACCTINFOTRNRQ" );
ChildAggregate_add(AccountInfoRequestTransaction, { required: true, order: 30, type: AccountInfoRequest, read: AccountInfoRequestTransaction.prototype.getMessage, write: AccountInfoRequestTransaction.prototype.setMessage });

}
