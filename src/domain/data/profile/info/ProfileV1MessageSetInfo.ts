import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";


export class ProfileV1MessageSetInfo extends VersionSpecificMessageSetInfo {
  public getMessageSetType(): MessageSetType {
    return MessageSetType.profile;
  }
}

Aggregate_add( ProfileV1MessageSetInfo, "PROFMSGSETV1" );
