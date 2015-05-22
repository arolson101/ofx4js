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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../TransactionWrappedResponseMessage'/>
///<reference path='SecurityListResponse'/>

module ofx4js.domain.data.seclist {

import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Security list transaction response.
 * @see "Section 13.8.3.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityListResponseTransaction
    extends TransactionWrappedResponseMessage<SecurityListResponse> {

  private message: SecurityListResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): SecurityListResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: SecurityListResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): SecurityListResponse {
    return this.getMessage();
  }
}

Aggregate_add( SecurityListResponseTransaction, "SECLISTTRNRS");
ChildAggregate_add(SecurityListResponseTransaction, { required: true, order: 30, type: SecurityListResponse, read: SecurityListResponseTransaction.prototype.getMessage, write: SecurityListResponseTransaction.prototype.setMessage });

}
