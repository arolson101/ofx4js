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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='BasePosition'/>

module ofx4js.domain.data.investment.positions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Aggregate for a list of invesment positions.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentPositionList {
  private positions: Array<BasePosition>;

  /**
   * Gets the list of positions
   *
   * @return the list of positions
   */
  public getPositions(): Array<BasePosition> {
    return this.positions;
  }

  /**
   * Sets the list of positions.
   *
   * @param positions the list of positions
   */
  public setPositions(positions: Array<BasePosition>): void {
    this.positions = positions;
  }
}

Aggregate_add( InvestmentPositionList, "INVPOSLIST" );
ChildAggregate_add(InvestmentPositionList, { order: 10, type: Array, collectionEntryType: BasePosition, read: InvestmentPositionList.prototype.getPositions, write: InvestmentPositionList.prototype.setPositions });

}
