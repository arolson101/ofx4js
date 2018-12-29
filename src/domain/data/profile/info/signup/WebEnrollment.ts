import { Aggregate_add } from "../../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../../meta/Element_add";


/**
 * Web Enrollment option containing URL to direct user for web based enrollment, if supported.
 * @see "Section 8.8 OFX Spec"
 */
export class WebEnrollment {

  private url: string;

  /**
   * URL to start enrollment process
   * @return String
   */
  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

}

Aggregate_add( WebEnrollment, "WEBENROLL" );
Element_add(WebEnrollment, { name: "URL", required: true, order: 0, type: String, read: WebEnrollment.prototype.getUrl, write: WebEnrollment.prototype.setUrl });
