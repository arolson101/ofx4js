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
import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { AccountType } from "../../banking/AccountType";
import { TransferProfile } from "./common/TransferProfile";
import { StopCheckProfile } from "./banking/StopCheckProfile";
import { EmailProfile } from "./banking/EmailProfile";
import { ImageProfile } from "./common/ImageProfile";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Banking Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.2.1 OFX Spec"
 */
export class BankingV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private invalidAccountTypes: Array<AccountType>;
  private closingAvail: boolean;
  private transferProfile: TransferProfile;
  private stopCheckProfile: StopCheckProfile;
  private emailProfile: EmailProfile;
  private imageProfile: ImageProfile;


  public getMessageSetType(): MessageSetType {
    return MessageSetType.banking;
  }

  /**
   * The invalidAccountTypes list.
   *
   * @return The invalidAccountTypes list.
   */
  public getInvalidAccountTypes(): Array<AccountType> {
    return this.invalidAccountTypes;
  }

  /**
   * The invalidAccountTypes list.
   *
   * @param invalidAccountTypes The invalidAccountTypes list.
   */
  public setInvalidAccountTypes(invalidAccountTypes: Array<AccountType>): void {
    this.invalidAccountTypes = invalidAccountTypes;
  }

  /**
   * Gets whether closing statement information is available
   *
   * @return whether closing statement information is available
   */
  public getClosingAvail(): boolean {
    return this.closingAvail;
  }

  /**
   * Sets whether closing statement information is available
   *
   * @param closingAvail whether closing statement information is available
   */
  public setClosingAvail(closingAvail: boolean): void {
    this.closingAvail = closingAvail;
  }

  public getTransferProfile(): TransferProfile {
    return this.transferProfile;
  }

  public setTransferProfile(transferProfile: TransferProfile): void {
    this.transferProfile = transferProfile;
  }

  public getStopCheckProfile(): StopCheckProfile {
    return this.stopCheckProfile;
  }

  public setStopCheckProfile(stopCheckProfile: StopCheckProfile): void {
    this.stopCheckProfile = stopCheckProfile;
  }

  public getEmailProfile(): EmailProfile {
    return this.emailProfile;
  }

  public setEmailProfile(emailProfile: EmailProfile): void {
    this.emailProfile = emailProfile;
  }

  public getImageProfile(): ImageProfile {
    return this.imageProfile;
  }

  public setImageProfile(imageProfile: ImageProfile): void {
    this.imageProfile = imageProfile;
  }
}

Aggregate_add( BankingV1MessageSetInfo, "BANKMSGSETV1" );
ChildAggregate_add(BankingV1MessageSetInfo, { order: 10, type: Array, collectionEntryType: AccountType, read: BankingV1MessageSetInfo.prototype.getInvalidAccountTypes, write: BankingV1MessageSetInfo.prototype.setInvalidAccountTypes });
Element_add(BankingV1MessageSetInfo, { name: "CLOSINGAVAIL", required: true, order: 20, type: Boolean, read: BankingV1MessageSetInfo.prototype.getClosingAvail, write: BankingV1MessageSetInfo.prototype.setClosingAvail });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "XFERPROF", order: 30, type: TransferProfile, read: BankingV1MessageSetInfo.prototype.getTransferProfile, write: BankingV1MessageSetInfo.prototype.setTransferProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "STPCKPROF", order: 40, type: StopCheckProfile, read: BankingV1MessageSetInfo.prototype.getStopCheckProfile, write: BankingV1MessageSetInfo.prototype.setStopCheckProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "EMAILPROF", required: true, order: 50, type: EmailProfile, read: BankingV1MessageSetInfo.prototype.getEmailProfile, write: BankingV1MessageSetInfo.prototype.setEmailProfile });
ChildAggregate_add(BankingV1MessageSetInfo, { name: "IMAGEPROF", order: 60, type: ImageProfile, read: BankingV1MessageSetInfo.prototype.getImageProfile, write: BankingV1MessageSetInfo.prototype.setImageProfile });
