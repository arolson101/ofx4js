
import { StringMap } from '../collections/collections'

export interface OFXWriter {

  /**
   * Write the specified headers.
   *
   * @param headers The headers to be written.
   */
  writeHeaders(headers: StringMap) /*throws IOException*/: void;

  /**
   * Write the start of a new aggregate.
   *
   * @param aggregateName The aggregate name.
   */
  writeStartAggregate(aggregateName: string) /*throws IOException*/: void;

  /**
   * Write an element to the current aggregate.
   *
   * @param name The name of the element.
   * @param value The value of the element.
   */
  writeElement(name: string, value: string) /*throws IOException*/: void;

  /**
   * Write the end of an aggregate.
   *
   * @param aggregateName The aggregate name.
   * @throws IllegalArgumentException If the specified aggregate hasn't been started.
   */
  writeEndAggregate(aggregateName: string) /*throws IOException*/: void;

  /**
   * Close this OFX writer.
   */
  close() /*throws IOException*/: void;
}
