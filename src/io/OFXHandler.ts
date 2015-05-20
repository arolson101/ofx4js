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

/**
 * Handler for events during OFX parsing.
 *
 * @author Ryan Heaton
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


