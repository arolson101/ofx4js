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
///<reference path='../ResponseMessageSet'/>
///<reference path='../MessageSetType'/>
///<reference path='AccountInfoResponseTransaction'/>

module ofx4js.domain.data.signup {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Ryan Heaton
 */
export class SignupResponseMessageSet extends ResponseMessageSet {

  private accountInfoResponse: AccountInfoResponseTransaction;

  public getType(): MessageSetType {
    return MessageSetType.signup;
  }

  /**
   * The account info response.
   *
   * @return The account info response.
   */
  public getAccountInfoResponse(): AccountInfoResponseTransaction {
    return this.accountInfoResponse;
  }

  /**
   * The account info response.
   *
   * @param accountInfoResponse The account info response.
   */
  public setAccountInfoResponse(accountInfoResponse: AccountInfoResponseTransaction): void {
    this.accountInfoResponse = accountInfoResponse;
  }

  /**
   * The response messages.
   *
   * @return The response messages.
   */
  public getResponseMessages(): Array<ResponseMessage> {
    var messages: Array<ResponseMessage> = new Array<ResponseMessage>();

    if (this.getAccountInfoResponse() != null) {
      messages.push(this.getAccountInfoResponse());
    }

    return messages;
  }
}

Aggregate_add(SignupResponseMessageSet, "SIGNUPMSGSRSV1");
ChildAggregate_add(SignupResponseMessageSet, { order: 0, type: AccountInfoResponseTransaction, read: SignupResponseMessageSet.prototype.getAccountInfoResponse, write: SignupResponseMessageSet.prototype.setAccountInfoResponse });

}
