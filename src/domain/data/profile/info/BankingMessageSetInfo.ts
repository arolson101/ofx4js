import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { BankingV1MessageSetInfo } from "./BankingV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


export class BankingMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: BankingV1MessageSetInfo;

  public getVersion1Info(): BankingV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: BankingV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( BankingMessageSetInfo, "BANKMSGSET" );
ChildAggregate_add(BankingMessageSetInfo, { order: 0, type: BankingV1MessageSetInfo, read: BankingMessageSetInfo.prototype.getVersion1Info, write: BankingMessageSetInfo.prototype.setVersion1Info });
