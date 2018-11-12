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
import { TransactionWrappedResponseMessage } from "../TransactionWrappedResponseMessage";
import { PasswordChangeResponse } from "./PasswordChangeResponse";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Ryan Heaton
 */
export class PasswordChangeResponseTransaction extends TransactionWrappedResponseMessage<PasswordChangeResponse> {

  private message: PasswordChangeResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): PasswordChangeResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: PasswordChangeResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): PasswordChangeResponse {
    return this.getMessage();
  }
}

Aggregate_add(PasswordChangeResponseTransaction, "PINCHTRNRS");
ChildAggregate_add(PasswordChangeResponseTransaction, { required: true, order: 30, type: PasswordChangeResponse, read: PasswordChangeResponseTransaction.prototype.getMessage, write: PasswordChangeResponseTransaction.prototype.setMessage });
