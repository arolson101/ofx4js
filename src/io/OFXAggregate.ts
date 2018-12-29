
/**
 * An OFX aggregate is just an aggregate of name-value pairs that identify the elements and element values of the aggregate.
 * The element values can strings or another (sub)aggregate.  The implementation of a
 */
export interface OFXAggregate {

  /**
   * The name of the OFX aggregate.
   *
   * @return The name of the aggregate.
   */
  getName(): string;

  /**
   * Whether this aggregate contains the specified element.
   *
   * @param elementName The name of the element.
   * @return Whether this aggregate contains the specified element.
   */
  containsElement(elementName: string): boolean;

  /**
   * The element names of this aggregate.
   *
   * @return The element names of this aggregate.
   */
  elementNames(): Array<string>;

  /**
   * The value of the element.  This will be either a string or another OFXAggregate.
   *
   * @param elementName The name of the element.
   * @return The value of the specified element.
   */
  getElementValue(elementName: string): Object;
}
