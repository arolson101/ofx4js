/*
 * Copyright 2012 TheStash
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
import {Aggregate_add} from "../../../../../meta/Aggregate_Add";
import {Element_add} from "../../../../../meta/Element_add";

/**
 * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
 * @author Scott Priddy
 * @see "Section 8.8 OFX Spec"
 */
export class OtherEnrollment {

  private message: string;

  /**
   * Message to consumer about what to do next (for example, a phone number),
   * @return String
   */
  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }
}

Aggregate_add( OtherEnrollment, "OTHERENROLL" );
Element_add(OtherEnrollment, { name: "MESSAGE", required: true, order: 0, type: String, read: OtherEnrollment.prototype.getMessage, write: OtherEnrollment.prototype.setMessage });


