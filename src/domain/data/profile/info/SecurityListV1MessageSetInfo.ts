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

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @see "Section 13.7.2.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
export class SecurityListV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private supportsSecurityListDownload: boolean;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.investment_security;
  }

  public getSupportsSecurityListDownload(): boolean {
    return this.supportsSecurityListDownload;
  }

  public setSupportsSecurityListDownload(supportsSecurityListDownload: boolean): void {
    this.supportsSecurityListDownload = supportsSecurityListDownload;
  }
}

Aggregate_add( SecurityListV1MessageSetInfo, "SECLISTMSGSETV1" );
Element_add(SecurityListV1MessageSetInfo, { name: "SECLISTRQDNLD", required:true, order: 10, type: Boolean, read: SecurityListV1MessageSetInfo.prototype.getSupportsSecurityListDownload, write: SecurityListV1MessageSetInfo.prototype.setSupportsSecurityListDownload });

}
