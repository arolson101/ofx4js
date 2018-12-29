import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { EmailV1MessageSetInfo } from "./EmailV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


export class EmailMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: EmailV1MessageSetInfo;

  public getVersion1Info(): EmailV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: EmailV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( EmailMessageSetInfo, "EMAILMSGSET" );
ChildAggregate_add(EmailMessageSetInfo, { order: 0, type: EmailV1MessageSetInfo, read: EmailMessageSetInfo.prototype.getVersion1Info, write: EmailMessageSetInfo.prototype.setVersion1Info });
