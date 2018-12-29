import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";


export class SignOnV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  public getMessageSetType(): MessageSetType {
    return MessageSetType.signon;
  }
}

Aggregate_add( SignOnV1MessageSetInfo, "SIGNONMSGSETV1" );
