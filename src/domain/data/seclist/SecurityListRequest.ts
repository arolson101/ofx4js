import { RequestMessage } from "../RequestMessage";
import { SecurityRequest } from "./SecurityRequest";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * Request aggregate for the security list.
 * @see "Section 13.8.2.2, OFX Spec"
 */
export class SecurityListRequest extends RequestMessage {

  private securityRequests: Array<SecurityRequest>;

  public getSecurityRequests(): Array<SecurityRequest> {
    return this.securityRequests;
  }

  public setSecurityRequests(securityRequests: Array<SecurityRequest>): void {
    this.securityRequests = securityRequests;
  }
}

Aggregate_add(SecurityListRequest, "SECLISTRQ");
ChildAggregate_add(SecurityListRequest, { required: true, order: 10, type: Array, collectionEntryType: SecurityRequest, read: SecurityListRequest.prototype.getSecurityRequests, write: SecurityListRequest.prototype.setSecurityRequests });
