import { Aggregate_add } from "../../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../../meta/Element_add";


/**
 * Image Profile
 * @see "Section 3.1.6.2 OFX Spec"
 */
export class ImageProfile {

  private closingImageAvailable: boolean;
  private transactionImageAvailable: boolean;

  public getClosingImageAvailable(): boolean {
    return this.closingImageAvailable;
  }

  public setClosingImageAvailable(closingImageAvailable: boolean): void {
    this.closingImageAvailable = closingImageAvailable;
  }

  public getTransactionImageAvailable(): boolean {
    return this.transactionImageAvailable;
  }

  public setTransactionImageAvailable(transactionImageAvailable: boolean): void {
    this.transactionImageAvailable = transactionImageAvailable;
  }
}

Aggregate_add( ImageProfile, "IMAGEPROF" );
Element_add(ImageProfile, { name: "CLOSINGIMGAVAIL", required: true, order: 10, type: Boolean, read: ImageProfile.prototype.getClosingImageAvailable, write: ImageProfile.prototype.setClosingImageAvailable });
Element_add(ImageProfile, { name: "TRANIMGAVAIL", required: true, order: 20, type: Boolean, read: ImageProfile.prototype.getTransactionImageAvailable, write: ImageProfile.prototype.setTransactionImageAvailable });
