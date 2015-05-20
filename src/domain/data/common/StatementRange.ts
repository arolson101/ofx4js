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
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {Element_add} from "../../../meta/Element_add";

/**
 * @author Ryan Heaton
 */
export class StatementRange {

  private start: Date;
  private end: Date;
  private includeTransactions: boolean;

  constructor() {
    this.includeTransactions = true;
  }

  /**
   * The start of the statement range.
   *
   * @return The start of the statement range.
   */
  public getStart(): Date {
    return this.start;
  }

  /**
   * The start of the statement range.
   *
   * @param start The start of the statement range.
   */
  public setStart(start: Date): void {
    this.start = start;
  }

  /**
   * The end of the statement range.
   *
   * @return The end of the statement range.
   */
  public getEnd(): Date {
    return this.end;
  }

  /**
   * The end of the statement range.
   *
   * @param end The end of the statement range.
   */
  public setEnd(end: Date): void {
    this.end = end;
  }

  /**
   * Whether to include transactions.
   *
   * @return Whether to include transactions.
   */
  public getIncludeTransactions(): boolean {
    return this.includeTransactions;
  }

  /**
   * Whether to include transactions.
   *
   * @param includeTransactions Whether to include transactions.
   */
  public setIncludeTransactions(includeTransactions: boolean): void {
    this.includeTransactions = includeTransactions;
  }
}

Aggregate_add( StatementRange, "INCTRAN" );
Element_add(StatementRange, { name: "DTSTART", order: 0, type: Date, read: StatementRange.prototype.getStart, write: StatementRange.prototype.setStart });
Element_add(StatementRange, { name: "DTEND", order: 10, type: Date, read: StatementRange.prototype.getEnd, write: StatementRange.prototype.setEnd });
Element_add(StatementRange, { name: "INCLUDE", required: true, order: 20, type: Boolean, read: StatementRange.prototype.getIncludeTransactions, write: StatementRange.prototype.setIncludeTransactions });


