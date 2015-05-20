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
import {Status} from "domain/data/common/Status";
import {OFXException} from "./OFXException";

/**
 * Exception based on a StatusCode response
 *
 * @author Michael Mosseri
 */
export class OFXStatusException extends OFXException {
	private status: Status;

  constructor(status: Status, message: string) {
    super(message);
    this.status = status;
  }

  public getStatus(): Status {
  	return this.status;
  }
}

