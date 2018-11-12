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
import { TransactionWrappedRequestMessage } from "../TransactionWrappedRequestMessage";
import { SecurityListRequest } from "./SecurityListRequest";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * Security list transaction request.
 * @see "Section 13.8.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityListRequestTransaction
    extends TransactionWrappedRequestMessage<SecurityListRequest> {

  private message: SecurityListRequest;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): SecurityListRequest {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   *
   */
  public setMessage(message: SecurityListRequest) {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: SecurityListRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add( SecurityListRequestTransaction, "SECLISTTRNRQ" );
ChildAggregate_add(SecurityListRequestTransaction, { required: true, order: 30, type: SecurityListRequest, read: SecurityListRequestTransaction.prototype.getMessage, write: SecurityListRequestTransaction.prototype.setMessage });
