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
///<reference path='../../profile/info/common/ImageProfile'/>
///<reference path='../../MessageSetType'/>

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import ImageProfile = ofx4js.domain.data.profile.info.common.ImageProfile;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Credit Card Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.3 OFX Spec"
 */
export class CreditCardV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private closingAvail: boolean;
  private imageProfile: ImageProfile;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.creditcard;
  }

  /**
   * Closing statement information available
   * @return Boolean
   */
  public getClosingAvail(): boolean {
    return this.closingAvail;
  }

  public setClosingAvail(closingAvail: boolean): void {
    this.closingAvail = closingAvail;
  }

  /**
   * Image profile (if supported)
   * @return ImageProfile
   */
  public getImageProfile(): ImageProfile {
    return this.imageProfile;
  }

  public setImageProfile(imageProfile: ImageProfile): void {
    this.imageProfile = imageProfile;
  }
}

Aggregate_add( CreditCardV1MessageSetInfo, "CREDITCARDMSGSETV1" );
Element_add(CreditCardV1MessageSetInfo, { name: "CLOSINGAVAIL", required: true, order: 20, type: Boolean, read: CreditCardV1MessageSetInfo.prototype.getClosingAvail, write: CreditCardV1MessageSetInfo.prototype.setClosingAvail });
ChildAggregate_add(CreditCardV1MessageSetInfo, { name: "IMAGEPROF", order: 10, type: ImageProfile, read: CreditCardV1MessageSetInfo.prototype.getImageProfile, write: CreditCardV1MessageSetInfo.prototype.setImageProfile });

}
