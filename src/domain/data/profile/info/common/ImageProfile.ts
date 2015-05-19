/*
 * Copyright 2012 TheStash
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
///<reference path='../../../../../meta/Aggregate_add'/>
///<reference path='../../../../../meta/Element_add'/>

module ofx4js.domain.data.profile.info.common {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Image Profile
 * @author Scott Priddy
 * @see "Section 3.1.6.2 OFX Spec"
 */
export class ImageProfile {

  private closingImageAvailable: boolean;
  private transactionImageAvailable: boolean;

  public getClosingImageAvailable(): boolean {
    return this.closingImageAvailable;
  }

  public setClosingImageAvailable(closingImageAvailable: boolean): void {
    this.closingImageAvailable = closingImageAvailable;
  }

  public getTransactionImageAvailable(): boolean {
    return this.transactionImageAvailable;
  }

  public setTransactionImageAvailable(transactionImageAvailable: boolean): void {
    this.transactionImageAvailable = transactionImageAvailable;
  }
}

Aggregate_add( ImageProfile, "IMAGEPROF" );
Element_add(ImageProfile, { name: "CLOSINGIMGAVAIL", required: true, order: 10, type: Boolean, read: ImageProfile.prototype.getClosingImageAvailable, write: ImageProfile.prototype.setClosingImageAvailable });
Element_add(ImageProfile, { name: "TRANIMGAVAIL", required: true, order: 20, type: Boolean, read: ImageProfile.prototype.getTransactionImageAvailable, write: ImageProfile.prototype.setTransactionImageAvailable });

}
