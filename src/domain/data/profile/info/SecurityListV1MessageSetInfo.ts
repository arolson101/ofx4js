import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * @see "Section 13.7.2.1, OFX Spec"
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
