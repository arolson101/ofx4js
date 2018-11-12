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
import { TransferStatusEvent } from "./TransferStatusEvent";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @author Ryan Heaton
 */
export class TransferStatus {

  private event: TransferStatusEvent;
  private date: Date;

  /**
   * The event.
   *
   * @return The event.
   */
  public getEvent(): TransferStatusEvent {
    return this.event;
  }

  /**
   * The event.
   *
   * @param event The event.
   */
  public setEvent(event: TransferStatusEvent): void {
    this.event = event;
  }

  /**
   * The date of the event.
   *
   * @return The date of the event.
   */
  public getDate(): Date {
    return this.date;
  }

  /**
   * The date of the event.
   *
   * @param date The date of the event.
   */
  public setDate(date: Date): void {
    this.date = date;
  }
}

Aggregate_add( TransferStatus, "XFERPRCSTS" );
Element_add(TransferStatus, { name: "XFERPRCCODE", required: true, order: 0, type: TransferStatusEvent, read: TransferStatus.prototype.getEvent, write: TransferStatus.prototype.setEvent });
Element_add(TransferStatus, { name: "DTXFERPRC", required: true, order: 10, type: Date, read: TransferStatus.prototype.getDate, write: TransferStatus.prototype.setDate });
