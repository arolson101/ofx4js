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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../profile/VersionSpecificMessageSetInfo'/>
///<reference path='../../profile/info/signup/ClientEnrollment'/>
///<reference path='../../profile/info/signup/OtherEnrollment'/>
///<reference path='../../profile/info/signup/WebEnrollment'/>

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import ClientEnrollment = ofx4js.domain.data.profile.info.signup.ClientEnrollment;
import OtherEnrollment = ofx4js.domain.data.profile.info.signup.OtherEnrollment;
import WebEnrollment = ofx4js.domain.data.profile.info.signup.WebEnrollment;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Servers use the Signup Message Set Profile Information to define how enrollment should proceed.
 *
 * This aggregate should contain 1 Enrollment option among <CLIENTENROLL>, <WEBENROLL>, or <OTHERENROLL>.
 * todo: review how best to enforce this constraint
 *
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 8.8 OFX Spec"
 */
export class SignupV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private clientEnrollment: ClientEnrollment;
  private webEnrollment: WebEnrollment;
  private otherEnrollment: OtherEnrollment;
  private supportsClientUserInfoChanges: boolean;
  private supportsAvailableAccounts: boolean;
  private supportsClientServiceActivationRequests: boolean;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.signup;
  }

  public getClientEnrollment(): ClientEnrollment {
    return this.clientEnrollment;
  }

  public setClientEnrollment(clientEnrollment: ClientEnrollment): void {
    this.clientEnrollment = clientEnrollment;
  }

  public getWebEnrollment(): WebEnrollment {
    return this.webEnrollment;
  }

  public setWebEnrollment(webEnrollment: WebEnrollment): void {
    this.webEnrollment = webEnrollment;
  }

  public getOtherEnrollment(): OtherEnrollment {
    return this.otherEnrollment;
  }

  public setOtherEnrollment(otherEnrollment: OtherEnrollment): void {
    this.otherEnrollment = otherEnrollment;
  }

  /**
   * Y if server supports client-based user information changes,
   * @return Boolean
   */
  public getSupportsClientUserInfoChanges(): boolean {
    return this.supportsClientUserInfoChanges;
  }

  public setSupportsClientUserInfoChanges(supportsClientUserInfoChanges: boolean): void {
    this.supportsClientUserInfoChanges = supportsClientUserInfoChanges;
  }

  /**
   * Y if server can provide information on accounts with SVCSTATUS available,
   * N means client should expect to ask user for specific account information
   * @return Boolean
   */
  public getSupportsAvailableAccounts(): boolean {
    return this.supportsAvailableAccounts;
  }

  public setSupportsAvailableAccounts(supportsAvailableAccounts: boolean): void {
    this.supportsAvailableAccounts = supportsAvailableAccounts;
  }

  /**
   * Y if server allows clients to make service activation requests (<ACCTRQ>),
   * N if server will only advise clients via synchronization of service additions,
   * changes, or deletions.
   * @return Boolean
   */
  public getSupportsClientServiceActivationRequests(): boolean {
    return this.supportsClientServiceActivationRequests;
  }

  public setSupportsClientServiceActivationRequests(supportsClientServiceActivationRequests: boolean): void {
    this.supportsClientServiceActivationRequests = supportsClientServiceActivationRequests;
  }
}

Aggregate_add( SignupV1MessageSetInfo, "SIGNUPMSGSETV1" );
ChildAggregate_add(SignupV1MessageSetInfo, { name: "CLIENTENROLL", order: 10, type: ClientEnrollment, read: SignupV1MessageSetInfo.prototype.getClientEnrollment, write: SignupV1MessageSetInfo.prototype.setClientEnrollment });
ChildAggregate_add(SignupV1MessageSetInfo, { name: "WEBENROLL", order: 20, type: WebEnrollment, read: SignupV1MessageSetInfo.prototype.getWebEnrollment, write: SignupV1MessageSetInfo.prototype.setWebEnrollment });
ChildAggregate_add(SignupV1MessageSetInfo, { name: "OTHERENROLL", order: 30, type: OtherEnrollment, read: SignupV1MessageSetInfo.prototype.getOtherEnrollment, write: SignupV1MessageSetInfo.prototype.setOtherEnrollment });
Element_add(SignupV1MessageSetInfo, { name: "CHGUSERINFO", required: true, order: 40, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsClientUserInfoChanges, write: SignupV1MessageSetInfo.prototype.setSupportsClientUserInfoChanges });
Element_add(SignupV1MessageSetInfo, { name: "AVAILACCTS", required: true, order: 50, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsAvailableAccounts, write: SignupV1MessageSetInfo.prototype.setSupportsAvailableAccounts });
Element_add(SignupV1MessageSetInfo, { name: "CLIENTACTREQ", required: true, order: 60, type: Boolean, read: SignupV1MessageSetInfo.prototype.getSupportsClientServiceActivationRequests, write: SignupV1MessageSetInfo.prototype.setSupportsClientServiceActivationRequests });

}
