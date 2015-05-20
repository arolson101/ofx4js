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
import {PasswordChangeRequest} from "PasswordChangeRequest";
import {TransactionWrappedRequestMessage} from "../TransactionWrappedRequestMessage";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";
import {Aggregate_add} from "../../../meta/Aggregate_Add";

/**
 * @author Ryan Heaton
 */
export class PasswordChangeRequestTransaction extends TransactionWrappedRequestMessage<PasswordChangeRequest> {

  private message: PasswordChangeRequest;

  /**
   * The wrapped message.
   *
   * @return The wrapped message.
   */
  public getMessage(): PasswordChangeRequest {
    return this.message;
  }

  /**
   * The wrapped message.
   *
   * @param message The wrapped message.
   */
  public setMessage(message: PasswordChangeRequest) {
    this.message = message;
  }

  // Inherited.
  public setWrappedMessage(message: PasswordChangeRequest): void {
    this.setMessage(message);
  }
}

Aggregate_add(PasswordChangeRequestTransaction, "PINCHTRNRQ");
ChildAggregate_add(PasswordChangeRequestTransaction, { required: true, order: 30, type: PasswordChangeRequest, read: PasswordChangeRequestTransaction.prototype.getMessage, write: PasswordChangeRequestTransaction.prototype.setMessage });


