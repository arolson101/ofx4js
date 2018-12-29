import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { CreditCardV1MessageSetInfo } from "./CreditCardV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


export class CreditCardMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: CreditCardV1MessageSetInfo;

  public getVersion1Info(): CreditCardV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: CreditCardV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( CreditCardMessageSetInfo, "CREDITCARDMSGSET" );
ChildAggregate_add(CreditCardMessageSetInfo, { order: 0, type: CreditCardV1MessageSetInfo, read: CreditCardMessageSetInfo.prototype.getVersion1Info, write: CreditCardMessageSetInfo.prototype.setVersion1Info });
