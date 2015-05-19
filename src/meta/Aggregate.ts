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

module ofx4js.meta {

/**
 * Annotation for a method that returns an OFX aggregate.
 *
 * @author Ryan Heaton
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

}
