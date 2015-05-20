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
import {ProfileResponse} from "ProfileResponse";
import {TransactionWrappedResponseMessage} from "../TransactionWrappedResponseMessage";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";
import {Aggregate_add} from "../../../meta/Aggregate_Add";

/**
 * @author Ryan Heaton
 */
export class ProfileResponseTransaction extends TransactionWrappedResponseMessage<ProfileResponse> {

  private message: ProfileResponse;

  /**
   * The message.
   *
   * @return The message.
   */
  public getMessage(): ProfileResponse {
    return this.message;
  }

  /**
   * The message.
   *
   * @param message The message.
   */
  public setMessage(message: ProfileResponse): void {
    this.message = message;
  }

  // Inherited.
  public getWrappedMessage(): ProfileResponse {
    return this.getMessage();
  }
}

Aggregate_add(ProfileResponseTransaction, "PROFTRNRS");
ChildAggregate_add(ProfileResponseTransaction, { required: true, order: 30, type: ProfileResponse, read: ProfileResponseTransaction.prototype.getMessage, write: ProfileResponseTransaction.prototype.setMessage });


