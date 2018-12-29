import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { ImageProfile } from "./common/ImageProfile";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Credit Card Message Set Profile
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
