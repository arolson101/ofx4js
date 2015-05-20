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
 * Email Profile
 * @author Scott Priddy
 * @see "Section 11.13.2.3 OFX Spec"
 */
export class EmailProfile {

  private canEmail: boolean;
  private canNotify: boolean;

  public getCanEmail(): boolean {
    return this.canEmail;
  }

  public setCanEmail(canEmail: boolean): void {
    this.canEmail = canEmail;
  }

  public getCanNotify(): boolean {
    return this.canNotify;
  }

  public setCanNotify(canNotify: boolean): void {
    this.canNotify = canNotify;
  }
}

Aggregate_add( EmailProfile, "EMAILPROF");
Element_add(EmailProfile, { name: "CANEMAIL", required: true, order: 10, type: Boolean, read: EmailProfile.prototype.getCanEmail, write: EmailProfile.prototype.setCanEmail });
Element_add(EmailProfile, { name: "CANNOTIFY", required: true, order: 20, type: Boolean, read: EmailProfile.prototype.getCanNotify, write: EmailProfile.prototype.setCanNotify });


