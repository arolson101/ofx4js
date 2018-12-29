import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Email Message Set Profile Information
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
