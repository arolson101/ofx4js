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
///<reference path='ProfileRequest'/>

module ofx4js.domain.data.profile {

import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Aggregate_add = ofx4js.meta.Aggregate_add;

/**
 * @author Ryan Heaton
 */
export class ProfileRequestTransaction extends TransactionWrappedRequestMessage<ProfileRequest> {

  private message: ProfileRequest;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): ProfileRequest {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: ProfileRequest): void {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: ProfileRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( ProfileRequestTransaction, "PROFTRNRQ" );
ChildAggregate_add(ProfileRequestTransaction, { required: true, order: 30, type: ProfileRequest, read: ProfileRequestTransaction.prototype.getMessage, write: ProfileRequestTransaction.prototype.setMessage });

}
