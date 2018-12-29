import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { RequestMessageSet } from "../RequestMessageSet";
import { ProfileRequestTransaction } from "./ProfileRequestTransaction";
import { MessageSetType } from "../MessageSetType";
import { RequestMessage } from "../RequestMessage";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @see "Section 7 OFX Spec"
 */
export class ProfileRequestMessageSet extends RequestMessageSet {

  private profileRequest: ProfileRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.profile;
  }

  /**
   * The profile request.
   *
   * @return The profile request.
   */
  public getProfileRequest(): ProfileRequestTransaction {
    return this.profileRequest;
  }

  /**
   * The profile request.
   *
   * @param profileRequest The profile request.
   */
  public setProfileRequest(profileRequest: ProfileRequestTransaction): void {
    this.profileRequest = profileRequest;
  }


  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getProfileRequest() != null) {
      requestMessages.push(this.getProfileRequest());
    }
    return requestMessages;
  }
}

Aggregate_add( ProfileRequestMessageSet, "PROFMSGSRQV1" );
ChildAggregate_add(ProfileRequestMessageSet, { required: true, order: 0, type: ProfileRequestTransaction, read: ProfileRequestMessageSet.prototype.getProfileRequest, write: ProfileRequestMessageSet.prototype.setProfileRequest });
