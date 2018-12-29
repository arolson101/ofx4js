import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ResponseMessageSet } from "../ResponseMessageSet";
import { ProfileResponseTransaction } from "./ProfileResponseTransaction";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
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
