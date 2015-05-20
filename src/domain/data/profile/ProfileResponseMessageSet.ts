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
import {ProfileResponseTransaction} from "ProfileResponseTransaction";
import {MessageSetType} from "../MessageSetType";
import {ResponseMessageSet} from "../ResponseMessageSet";
import {ResponseMessage} from "../ResponseMessage";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";
import {Aggregate_add} from "../../../meta/Aggregate_Add";

/**
 * @author Ryan Heaton
 * @see "Section 7 OFX Spec"
 */
export class ProfileResponseMessageSet extends ResponseMessageSet {

  private profileResponse: ProfileResponseTransaction;

  public getType(): MessageSetType {
    return MessageSetType.profile;
  }

  /**
   * The profile response.
   *
   * @return The profile response.
   */
  public getProfileResponse(): ProfileResponseTransaction {
    return this.profileResponse;
  }

  /**
   * The profile response.
   *
   * @param profileResponse The profile response.
   */
  public setProfileResponse(profileResponse: ProfileResponseTransaction): void {
    this.profileResponse = profileResponse;
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    var messages: Array<ResponseMessage> = new Array<ResponseMessage>();

    if (this.getProfileResponse() != null) {
      messages.push(this.getProfileResponse());
    }

    return messages;
  }
}

Aggregate_add(ProfileResponseMessageSet, "PROFMSGSRSV1");
ChildAggregate_add(ProfileResponseMessageSet, { required: true, order: 0, type: ProfileResponseTransaction, read: ProfileResponseMessageSet.prototype.getProfileResponse, write: ProfileResponseMessageSet.prototype.setProfileResponse });


