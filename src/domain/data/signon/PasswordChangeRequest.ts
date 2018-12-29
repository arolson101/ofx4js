import { RequestMessage } from "../RequestMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * Request to change a user password.
 *
 * @see "Section 2.5.2.1, OFX Spec."
 */
export class PasswordChangeRequest extends RequestMessage {

  private userId: string;
  private newPassword: string;

  /**
   * The id of the user changing password.
   *
   * @return The id of the user changing password.
   */
  public getUserId(): string {
    return this.userId;
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
   * The new password.
   *
   * @return The new password.
   */
  public getNewPassword(): string {
    return this.newPassword;
  }

  /**
   * The new password.
   *
   * @param newPassword The new password.
   */
  public setNewPassword(newPassword: string): void {
    this.newPassword = newPassword;
  }
}

Aggregate_add( PasswordChangeRequest, "PINCHRQ" );
Element_add(PasswordChangeRequest, { name: "USERID", required: true, order: 0, type: String, read: PasswordChangeRequest.prototype.getUserId, write: PasswordChangeRequest.prototype.setUserId });
Element_add(PasswordChangeRequest, { name: "NEWUSERPASS", required: true, order: 10, type: String, read: PasswordChangeRequest.prototype.getNewPassword, write: PasswordChangeRequest.prototype.setNewPassword });
