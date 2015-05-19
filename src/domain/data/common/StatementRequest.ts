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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../RequestMessage'/>
///<reference path='StatementRange'/>

module ofx4js.domain.data.common {

import RequestMessage = ofx4js.domain.data.RequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author Ryan Heaton
 */
export class StatementRequest extends RequestMessage {

  private statementRange: StatementRange;

  /**
   * The statement range.
   *
   * @return The statement range.
   */
  public getStatementRange(): StatementRange {
    return this.statementRange;
  }

  /**
   * The statement range.
   *
   * @param statementRange The statement range.
   */
  public setStatementRange(statementRange: StatementRange): void {
    this.statementRange = statementRange;
  }
}

Aggregate_add( StatementRequest, "STMTRQ" );
ChildAggregate_add(StatementRequest, { name: "INCTRAN", required: false, order: 10, type: StatementRange, read: StatementRequest.prototype.getStatementRange, write: StatementRequest.prototype.setStatementRange });

}
