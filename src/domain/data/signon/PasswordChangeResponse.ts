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
///<reference path='../../../meta/Element_add'/>
///<reference path='../ResponseMessage'/>

module ofx4js.domain.data.signon {

import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Response to a change a user password request.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.2.2, OFX Spec."
 */
export class PasswordChangeResponse extends ResponseMessage {

  private userId: string;
  private changeTimestamp: Date;

  /**
   * The id of the user changing password.
   *
   * @return The id of the user changing password.
   */
  public getUserId(): string {
    return this.userId;
  }

  // Inherited.
  public getResponseMessageName(): string {
    return "password change";
  }

  /**
   * The id of the user changing password.
   *
   * @param userId The id of the user changing password.
   */
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  /**
   * The timestamp of the password change.
   *
   * @return The timestamp of the password change.
   */
  public getChangeTimestamp(): Date {
    return this.changeTimestamp;
  }

  /**
   * The timestamp of the password change.
   *
   * @param changeTimestamp The timestamp of the password change.
   */
  public setChangeTimestamp(changeTimestamp: Date): void {
    this.changeTimestamp = changeTimestamp;
  }
}
  
Aggregate_add( PasswordChangeResponse, "PINCHRQ" );
Element_add(PasswordChangeResponse, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeResponse.prototype.getUserId, write: PasswordChangeResponse.prototype.setUserId });
Element_add(PasswordChangeResponse, { name: "DTCHANGED", order: 10, type: Date, read: PasswordChangeResponse.prototype.getChangeTimestamp, write: PasswordChangeResponse.prototype.setChangeTimestamp });

}
