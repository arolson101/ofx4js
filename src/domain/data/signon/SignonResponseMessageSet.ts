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
import { ResponseMessageSet } from "../ResponseMessageSet";
import { SignonResponse } from "./SignonResponse";
import { PasswordChangeResponseTransaction } from "./PasswordChangeResponseTransaction";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";

/**
 * The sign-on response message set.
 *
 * @author Ryan Heaton
 * @see "Section 2.5, OFX Spec."
 */
export class SignonResponseMessageSet extends ResponseMessageSet {

  private signonResponse: SignonResponse;
  private passwordChangeResponse: PasswordChangeResponseTransaction;

  public getType(): MessageSetType {
    return MessageSetType.signon;
  }

  /**
   * The message for this message set.
   *
   * @return The message for this message set.
   */
  public getSignonResponse(): SignonResponse {
    return this.signonResponse;
  }

  /**
   * The message for this message set.
   *
   * @param signonResponse The message for this message set.
   */
  public setSignonResponse(signonResponse: SignonResponse): void {
    this.signonResponse = signonResponse;
  }

  /**
   * The password change response.
   *
   * @return The password change response.
   */
  public getPasswordChangeResponse(): PasswordChangeResponseTransaction {
    return this.passwordChangeResponse;
  }

  /**
   * The password change response.
   *
   * @param passwordChangeResponse The password change response.
   */
  public setPasswordChangeResponse(passwordChangeResponse: PasswordChangeResponseTransaction): void {
    this.passwordChangeResponse = passwordChangeResponse;
  }

  //todo: challenge request/response

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    var messages: Array<ResponseMessage> = new Array<ResponseMessage>();

    if (this.getSignonResponse() != null) {
      messages.push(this.getSignonResponse());
    }

    return messages;
  }
}

Aggregate_add(SignonResponseMessageSet, "SIGNONMSGSRSV1");
ChildAggregate_add(SignonResponseMessageSet, { order: 0, type: SignonResponse, read: SignonResponseMessageSet.prototype.getSignonResponse, write: SignonResponseMessageSet.prototype.setSignonResponse });
ChildAggregate_add(SignonResponseMessageSet, { order: 10, type: PasswordChangeResponseTransaction, read: SignonResponseMessageSet.prototype.getPasswordChangeResponse, write: SignonResponseMessageSet.prototype.setPasswordChangeResponse });
