
/**
 * Annotation for a method that returns an OFX aggregate.
 */
export class Aggregate {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  /**
   * The name of the aggregate.
   *
   * @return The name of the aggregate.
   */
  public value(): string {
    return this._value;
  }
}
