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
///<reference path='../MessageSetType'/>
///<reference path='../RequestMessageSet'/>
///<reference path='../RequestMessage'/>
///<reference path='SignonRequest'/>
///<reference path='PasswordChangeRequestTransaction'/>

module ofx4js.domain.data.signon {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Aggregate_add = ofx4js.meta.Aggregate_add;

/**
 * The sign-on request message set.
 *
 * @author Ryan Heaton
 * @see "Section 2.5, OFX Spec."
 */
export class SignonRequestMessageSet extends RequestMessageSet {

  private signonRequest: SignonRequest;
  private passwordChangeRequest: PasswordChangeRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.signon;
  }

  /**
   * The message for this message set.
   *
   * @return The message for this message set.
   */
  public getSignonRequest(): SignonRequest {
    return this.signonRequest;
  }

  /**
   * The message for this message set.
   *
   * @param signonRequest The message for this message set.
   */
  public setSignonRequest(signonRequest: SignonRequest): void {
    this.signonRequest = signonRequest;
  }

  /**
   * The password change request.
   *
   * @return The password change request.
   */
  public getPasswordChangeRequest(): PasswordChangeRequestTransaction {
    return this.passwordChangeRequest;
  }

  /**
   * The password change request.
   *
   * @param passwordChangeRequest The password change request.
   */
  public setPasswordChangeRequest(passwordChangeRequest: PasswordChangeRequestTransaction): void {
    this.passwordChangeRequest = passwordChangeRequest;
  }

  //todo: challenge request/response


  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();

    if (this.getSignonRequest() != null) {
      requestMessages.push(this.getSignonRequest());
    }

    if (this.getPasswordChangeRequest() != null) {
      requestMessages.push(this.getPasswordChangeRequest());
    }

    return requestMessages;
  }
}

Aggregate_add(SignonRequestMessageSet, "SIGNONMSGSRQV1");
ChildAggregate_add(SignonRequestMessageSet, { required: true, order: 0, type: SignonRequest, read: SignonRequestMessageSet.prototype.getSignonRequest, write: SignonRequestMessageSet.prototype.setSignonRequest });
ChildAggregate_add(SignonRequestMessageSet, { order: 10, type: PasswordChangeRequestTransaction, read: SignonRequestMessageSet.prototype.getPasswordChangeRequest, write: SignonRequestMessageSet.prototype.setPasswordChangeRequest });

}
