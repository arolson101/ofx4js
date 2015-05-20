/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {AbstractMessageSetInfo} from "AbstractMessageSetInfo";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
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


