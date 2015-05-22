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
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../profile/VersionSpecificMessageSetInfo'/>
///<reference path='EmailV1MessageSetInfo'/>

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Email Message Set Profile Information
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 9.4.2 OFX Spec"
 */
export class EmailV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private supportsMail: boolean;
  private supportsMimeType: boolean;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.email;
  }

  /**
   * Y if server supports <MAILRQ> request.
   * N if server supports only the <MAILSYNCRQ> request.
   * @return Boolean
   */
  public getSupportsMail(): boolean {
    return this.supportsMail;
  }

  public setSupportsMail(supportsMail: boolean): void {
    this.supportsMail = supportsMail;
  }

  /**
   * Y if server supports get MIME message
   * @return Boolean
   */
  public getSupportsMimeType(): boolean {
    return this.supportsMimeType;
  }

  public setSupportsMimeType(supportsMimeType: boolean): void {
    this.supportsMimeType = supportsMimeType;
  }

}

Aggregate_add( EmailV1MessageSetInfo, "EMAILMSGSETV1" );
Element_add(EmailV1MessageSetInfo, { name: "MAILSUP", required: true, order: 10, type: Boolean, read: EmailV1MessageSetInfo.prototype.getSupportsMail, write: EmailV1MessageSetInfo.prototype.setSupportsMail });
Element_add(EmailV1MessageSetInfo, { name: "GETMIMESUP", required: true, order: 20, type: Boolean, read: EmailV1MessageSetInfo.prototype.getSupportsMimeType, write: EmailV1MessageSetInfo.prototype.setSupportsMimeType });

}
