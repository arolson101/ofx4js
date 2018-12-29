import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Aggreate to indicate whether position information is requested as part of the statement
 * @see "Section 13.9.1.2, OFX Spec"
 */
export class IncludePosition {

  private sentDownDate: Date;
  private includePositions: boolean;

  constructor() {
    this.includePositions = true;
  }

  /**
   * Gets the date that the position should be sent down for. This is an optional field according
   * to the OFX spec.
   *
   * @return the date for the position
   */
  public getDateSentDown(): Date {
    return this.sentDownDate;
  }

  /**
   * Sets the date that the position should be sent down for. This is an optional field according
   * to the OFX spec.
   *
   * @param sentDownDate the date for the position
   */
  public setDateSentDown(sentDownDate: Date): void {
    this.sentDownDate = sentDownDate;
  }

  /**
   * Gets whether to include positions in the statement download.
   *
   * @return whether to include positions in the statement download
   */
  public getIncludePositions(): boolean {
    return this.includePositions;
  }

  /**
   * Sets whether to include positions in the statement download.
   *
   * @param includePositions whether to include positions in the statement download
   */
  public setIncludePositions(includePositions: boolean): void {
    this.includePositions = includePositions;
  }
}

Aggregate_add( IncludePosition, "INCPOS" );
Element_add(IncludePosition, { name: "DTASOF", order: 0, type: Date, read: IncludePosition.prototype.getDateSentDown, write: IncludePosition.prototype.setDateSentDown });
Element_add(IncludePosition, { name: "INCLUDE", order: 10, type: Boolean, read: IncludePosition.prototype.getIncludePositions, write: IncludePosition.prototype.setIncludePositions });
