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
import { OFXConnectionException } from "./OFXConnectionException";


/**
 * @author Ryan Heaton
 */
export class OFXServerException extends OFXConnectionException {

  private httpCode: number;

  constructor(message: string, httpCode: number) {
    super(message);
    this.httpCode = httpCode;
  }

  public getHttpCode(): number {
    return this.httpCode;
  }
}
