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
///<reference path='StatusCode'/>
///<reference path='Status'/>

module ofx4js.domain.data.common {

/**
 * Holder for an unknown status code.
 *
 * @author Ryan Heaton
 */
export class UnknownStatusCode extends StatusCode {

  private code: number;
  private message: string;
  private defaultSeverity: /*Status.*/Severity;

  constructor(code: number, message: string, defaultSeverity: /*Status.*/Severity) {
    super();
    this.code = code;
    this.message = message;
    this.defaultSeverity = defaultSeverity;
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public getDefaultSeverity(): /*Status.*/Severity {
    return this.defaultSeverity;
  }

  //@Override
  public toString(): string {
    return this.code.toString();
  }
}

}
