import { TransferStatusEvent } from "./TransferStatusEvent";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


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
