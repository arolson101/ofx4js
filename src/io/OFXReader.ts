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
///<reference path='OFXHandler'/>
///<reference path='StringReader'/>

module ofx4js.io {

/**
 * Basic interface for reading an OFX document.
 *
 * @author Ryan Heaton
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

}
