import { StringReader } from "./StringReader";
import { OFXHandler } from "./OFXHandler";

/**
 * Basic interface for reading an OFX document.
 */
export interface OFXReader {

  /**
   * Set the handler for this OFX reader.
   *
   * @param handler The handler.
   */
  setContentHandler(handler: OFXHandler): void;

  /**
   * Parse a stream or reader.
   *
   * @param stream The stream or reader to parse.
   */
  parse(stream: StringReader): void;
}
