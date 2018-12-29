
/**
 * Interface for converting to/from OFX strings.
 */
export interface StringConversion {

  /**
   * Convert the specified object to a string.
   *
   * @param value The value to convert to a string.
   * @return The string.
   */
  toString(value: Object): string;

  /**
   * Convert the specified value to an object of the specified type.
   *
   * @param clazz The class.
   * @param value The value.
   * @return The converted value.
   * @throws OFXSyntaxException If there was something wrong with the syntax of the string.
   */
  fromString<E>(clazz: any, value: string) /*throws OFXSyntaxException*/: E;
}
