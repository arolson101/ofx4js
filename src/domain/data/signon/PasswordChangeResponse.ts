import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Response to a change a user password request.
 *
 * @see "Section 2.5.2.2, OFX Spec."
 */
export class PasswordChangeResponse extends ResponseMessage {

  private userId: string;
  private changeTimestamp: Date;

  /**
   * The id of the user changing password.
   *
   * @return The id of the user changing password.
   */
  public getUserId(): string {
    return this.userId;
  }

  // Inherited.
  public getResponseMessageName(): string {
    return "password change";
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
   * The timestamp of the password change.
   *
   * @return The timestamp of the password change.
   */
  public getChangeTimestamp(): Date {
    return this.changeTimestamp;
  }

  /**
   * The timestamp of the password change.
   *
   * @param changeTimestamp The timestamp of the password change.
   */
  public setChangeTimestamp(changeTimestamp: Date): void {
    this.changeTimestamp = changeTimestamp;
  }
}

Aggregate_add( PasswordChangeResponse, "PINCHRQ" );
Element_add(PasswordChangeResponse, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeResponse.prototype.getUserId, write: PasswordChangeResponse.prototype.setUserId });
Element_add(PasswordChangeResponse, { name: "DTCHANGED", order: 10, type: Date, read: PasswordChangeResponse.prototype.getChangeTimestamp, write: PasswordChangeResponse.prototype.setChangeTimestamp });
