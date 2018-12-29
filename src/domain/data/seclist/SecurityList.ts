import { BaseSecurityInfo } from "./BaseSecurityInfo";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * Aggregate for a list of securities.
 * @see "Section 13.8.4, OFX Spec"
 */
export class SecurityList {
  private securityInfos: Array<BaseSecurityInfo>;

  public getSecurityInfos(): Array<BaseSecurityInfo> {
    return this.securityInfos;
  }

  public setSecurityInfos(securityInfos: Array<BaseSecurityInfo>): void {
    this.securityInfos = securityInfos;
  }
}

Aggregate_add( SecurityList, "SECLIST" );
ChildAggregate_add(SecurityList, { order: 10, type: Array, collectionEntryType: BaseSecurityInfo, read: SecurityList.prototype.getSecurityInfos, write: SecurityList.prototype.setSecurityInfos });
