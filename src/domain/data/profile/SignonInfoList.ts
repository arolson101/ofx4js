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
import {SignonInfo} from "SignonInfo";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * List of signon information.
 *
 * @author Ryan Heaton
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


