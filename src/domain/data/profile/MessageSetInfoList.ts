import { AbstractMessageSetInfo } from "./AbstractMessageSetInfo";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @see "Section 7.2, OFX Spec"
 */
export class MessageSetInfoList {

  private informationList: Array<AbstractMessageSetInfo>;

  /**
   * The list of information for each message set.
   *
   * @return The list of information for each message set.
   */
  public getInformationList(): Array<AbstractMessageSetInfo> {
    return this.informationList;
  }

  /**
   * The list of information for each message set.
   *
   * @param informationList The list of information for each message set.
   */
  public setInformationList(informationList: Array<AbstractMessageSetInfo>): void {
    this.informationList = informationList;
  }
}

Aggregate_add( MessageSetInfoList, "MSGSETLIST" );
ChildAggregate_add(MessageSetInfoList, { order: 0, type: Array, collectionEntryType: AbstractMessageSetInfo, read: MessageSetInfoList.prototype.getInformationList, write: MessageSetInfoList.prototype.setInformationList });
