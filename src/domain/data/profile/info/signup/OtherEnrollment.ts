import { Aggregate_add } from "../../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../../meta/Element_add";


/**
 * Other Enrollment option containing a text message directing users to some other method (such as a phone call)
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
