/*
 * Copyright 2010 Web Cohesion
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
import {BalanceRecord} from "../../common/BalanceRecord";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";

/**
 * Aggregate for the investment balance list.
 * @see "Section 13.9.2.7, OFX Spec"
 *
 * @author Jon Perlow
 */
export class BalanceList {

  private balanceRecords: Array<BalanceRecord>;

  /**
   * Gets the list of balance records.
   *
   * @return the list of balance records.
   */
  public getBalanceRecords(): Array<BalanceRecord> {
    return this.balanceRecords;
  }

  /**
   * Sets the list of balance records.
   *
   * @param balanceRecords the list of balance records.
   */
  public setBalanceRecords(balanceRecords: Array<BalanceRecord>): void {
    this.balanceRecords = balanceRecords;
  }
}

Aggregate_add( BalanceList, "BALLIST" );
ChildAggregate_add(BalanceList, { order: 10, type: Array, collectionEntryType: BalanceRecord, read: BalanceList.prototype.getBalanceRecords, write: BalanceList.prototype.setBalanceRecords });


