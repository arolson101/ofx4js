
/**
 * Handler for events during OFX parsing.
 */
export interface OFXHandler {

  /**
   * Handler an OFX header.
   *
   * @param name The name of the header.
   * @param value The value of the header.
   */
  onHeader(name: string, value: string): void;

  /**
   * Handle a new OFX element.
   *
   * @param name The name of the element.
   * @param value The value of the element.
   */
  onElement(name: string, value: string): void;

  /**
   * Handle the start of a new OFX aggregate.
   *
   * @param aggregateName The name of the aggregate.
   */
  startAggregate(aggregateName: string): void;

  /**
   * Handle the end of an OFX aggregate.
   *
   * @param aggregateName The aggregate name.
   */
  endAggregate(aggregateName: string): void;

}
