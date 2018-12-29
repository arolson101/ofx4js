import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { SecurityListV1MessageSetInfo } from "./SecurityListV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


export class SecurityListMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: SecurityListV1MessageSetInfo;

  public getVersion1Info(): SecurityListV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: SecurityListV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( SecurityListMessageSetInfo, "SECLISTMSGSET" );
ChildAggregate_add(SecurityListMessageSetInfo, { order: 0, type: SecurityListV1MessageSetInfo, read: SecurityListMessageSetInfo.prototype.getVersion1Info, write: SecurityListMessageSetInfo.prototype.setVersion1Info });
