import { AbstractMessageSetInfo } from "../AbstractMessageSetInfo";
import { SignupV1MessageSetInfo } from "./SignupV1MessageSetInfo";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


export class SignupMessageSetInfo extends AbstractMessageSetInfo {

  private version1Info: SignupV1MessageSetInfo;

  public getVersion1Info(): SignupV1MessageSetInfo {
    return this.version1Info;
  }

  public setVersion1Info(version1Info: SignupV1MessageSetInfo): void {
    this.version1Info = version1Info;
  }
}

Aggregate_add( SignupMessageSetInfo, "SIGNUPMSGSET" );
ChildAggregate_add(SignupMessageSetInfo, { order: 0, type: SignupV1MessageSetInfo, read: SignupMessageSetInfo.prototype.getVersion1Info, write: SignupMessageSetInfo.prototype.setVersion1Info });
