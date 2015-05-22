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

module ofx4js.io {


/**
 * @author Ryan Heaton
 */
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

}
