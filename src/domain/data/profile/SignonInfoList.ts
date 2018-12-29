import { SignonInfo } from "./SignonInfo";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * List of signon information.
 *
 * @see "Section 7.2.2, OFX Spec"
 */
export class SignonInfoList {

  private infoList: Array<SignonInfo>;

  /**
   * List of sign-on information.
   *
   * @return List of sign-on information.
   */
  public getInfoList(): Array<SignonInfo> {
    return this.infoList;
  }

  /**
   * List of sign-on information.
   *
   * @param infoList List of sign-on information.
   */
  public setInfoList(infoList: Array<SignonInfo>): void {
    this.infoList = infoList;
  }
}

Aggregate_add( SignonInfoList, "SIGNONINFOLIST" );
ChildAggregate_add(SignonInfoList, { order: 0, type: Array, collectionEntryType: SignonInfo, read: SignonInfoList.prototype.getInfoList, write: SignonInfoList.prototype.setInfoList });
