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
import {ProfileRequestTransaction} from "ProfileRequestTransaction";
import {MessageSetType} from "../MessageSetType";
import {RequestMessageSet} from "../RequestMessageSet";
import {RequestMessage} from "../RequestMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
 * @see "Section 7 OFX Spec"
 */
export class ProfileRequestMessageSet extends RequestMessageSet {

  private profileRequest: ProfileRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.profile;
  }

  /**
   * The profile request.
   *
   * @return The profile request.
   */
  public getProfileRequest(): ProfileRequestTransaction {
    return this.profileRequest;
  }

  /**
   * The profile request.
   *
   * @param profileRequest The profile request.
   */
  public setProfileRequest(profileRequest: ProfileRequestTransaction): void {
    this.profileRequest = profileRequest;
  }


  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getProfileRequest() != null) {
      requestMessages.push(this.getProfileRequest());
    }
    return requestMessages;
  }
}

Aggregate_add( ProfileRequestMessageSet, "PROFMSGSRQV1" );
ChildAggregate_add(ProfileRequestMessageSet, { required: true, order: 0, type: ProfileRequestTransaction, read: ProfileRequestMessageSet.prototype.getProfileRequest, write: ProfileRequestMessageSet.prototype.setProfileRequest });


