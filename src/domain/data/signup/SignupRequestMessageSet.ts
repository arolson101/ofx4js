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
import { RequestMessageSet } from "../RequestMessageSet";
import { AccountInfoRequestTransaction } from "./AccountInfoRequestTransaction";
import { MessageSetType } from "../MessageSetType";
import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Ryan Heaton
 */
export class SignupRequestMessageSet extends RequestMessageSet {

  private accountInfoRequest: AccountInfoRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.signup;
  }

  /**
   * The account info request.
   *
   * @return The account info request.
   */
  public getAccountInfoRequest(): AccountInfoRequestTransaction {
    return this.accountInfoRequest;
  }

  /**
   * The account info request.
   *
   * @param accountInfoRequest The account info request.
   */
  public setAccountInfoRequest(accountInfoRequest: AccountInfoRequestTransaction): void {
    this.accountInfoRequest = accountInfoRequest;
  }

  /**
   * The request messages.
   *
   * @return The request messages.
   */
  public getRequestMessages(): Array<RequestMessage> {
    var messages: Array<RequestMessage> = new Array<RequestMessage>();

    if (this.getAccountInfoRequest() != null) {
      messages.push(this.getAccountInfoRequest());
    }

    return messages;
  }
}

Aggregate_add(SignupRequestMessageSet, "SIGNUPMSGSRQV1");
ChildAggregate_add(SignupRequestMessageSet, { order: 0, type: AccountInfoRequestTransaction, read: SignupRequestMessageSet.prototype.getAccountInfoRequest, write: SignupRequestMessageSet.prototype.setAccountInfoRequest });
