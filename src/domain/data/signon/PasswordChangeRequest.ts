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
///<reference path='../RequestMessage'/>

module ofx4js.domain.data.signon {

import RequestMessage = ofx4js.domain.data.RequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Request to change a user password.
 *
 * @author Ryan Heaton
 * @see "Section 2.5.2.1, OFX Spec."
 */
export class PasswordChangeRequest extends RequestMessage {

  private userId: string;
  private newPassword: string;

  /**
   * The id of the user changing password.
   *
   * @return The id of the user changing password.
   */
  public getUserId(): string {
    return this.userId;
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
   * The new password.
   *
   * @return The new password.
   */
  public getNewPassword(): string {
    return this.newPassword;
  }

  /**
   * The new password.
   *
   * @param newPassword The new password.
   */
  public setNewPassword(newPassword: string): void {
    this.newPassword = newPassword;
  }
}

Aggregate_add( PasswordChangeRequest, "PINCHRQ" );
Element_add(PasswordChangeRequest, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeRequest.prototype.getUserId, write: PasswordChangeRequest.prototype.setUserId });
Element_add(PasswordChangeRequest, { name: "NEWUSERPASS", required: true, order: 10, type: String, read: PasswordChangeRequest.prototype.getNewPassword, write: PasswordChangeRequest.prototype.setNewPassword });

}
