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

module ofx4js {


export declare class Error {
    public name: string;
    public message: string;
    public stack: string;
    constructor(message?: string);
}


/**
 * Base exception class.
 *
 * @author Ryan Heaton
 */
export class OFXException extends Error {
  private innerError: Error; 

  constructor(message: string = null, e: Error = null) {
    super(message);
    this.innerError = e;
  }
}

}
