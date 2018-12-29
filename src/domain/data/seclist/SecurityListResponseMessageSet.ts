import { ResponseMessageSet } from "../ResponseMessageSet";
import { SecurityListResponseTransaction } from "./SecurityListResponseTransaction";
import { SecurityList } from "./SecurityList";
import { MessageSetType } from "../MessageSetType";
import { ResponseMessage } from "../ResponseMessage";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


export class SecurityListResponseMessageSet extends ResponseMessageSet {

  private securityListResponse: SecurityListResponseTransaction;
  private securityList: SecurityList;

  public getType(): MessageSetType {
    return MessageSetType.investment_security;
  }

  /**
   * The security list response list transaction.
   *
   * Most OFX files have a single security response.
   *
   * @return The security list response list.
   */
  public getSecurityListResponse(): SecurityListResponseTransaction {
    return this.securityListResponse;
  }

  /**
   * The security list response.
   *
   * @param securityListResponse The security list response.
   */
  public setSecurityListResponse(securityListResponse: SecurityListResponseTransaction) {
    this.securityListResponse = securityListResponse;
  }

  public getSecurityList(): SecurityList {
    return this.securityList;
  }

  public setSecurityList(securityList: SecurityList): void {
    this.securityList = securityList;
  }

  // Inherited.
  public getResponseMessages(): Array<ResponseMessage> {
    var ret: Array<ResponseMessage> = new Array<ResponseMessage>();
    ret.push(this.securityListResponse);
    return ret;
  }
}

Aggregate_add( SecurityListResponseMessageSet, "SECLISTMSGSRSV1" );
ChildAggregate_add(SecurityListResponseMessageSet, { order: 0, type: SecurityListResponseTransaction, read: SecurityListResponseMessageSet.prototype.getSecurityListResponse, write: SecurityListResponseMessageSet.prototype.setSecurityListResponse });
ChildAggregate_add(SecurityListResponseMessageSet, { order: 10, type: SecurityList, read: SecurityListResponseMessageSet.prototype.getSecurityList, write: SecurityListResponseMessageSet.prototype.setSecurityList });
