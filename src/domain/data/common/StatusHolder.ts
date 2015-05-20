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
import {Status} from "Status";
/**
 * A status holder (usually applied to a response).
 *
 * @author Ryan Heaton
 */
export interface StatusHolder {

  /**
   * The name of this status holder (for error reporting).
   *
   * @return The name of this status holder (for error reporting).
   */
  getStatusHolderName(): string;

  /**
   * Get the status.
   *
   * @return The status.
   */
  getStatus(): Status;
}


export function instanceof_StatusHolder(obj: any) : boolean {
   return (obj instanceof Object
       && (typeof obj.getStatusHolderName === 'function') 
       && (typeof obj.getStatus === 'function'));
}

