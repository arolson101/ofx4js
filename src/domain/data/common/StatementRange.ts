import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


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
