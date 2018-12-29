import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { TransferProfile } from "./common/TransferProfile";
import { MessageSetType } from "../../MessageSetType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Interbank Funds Transfer Message Set Profile
 * @see "Section 11.13.4 OFX Spec"
 */
export class InterbankTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private transferProfile: TransferProfile;
  private supportsBillPay: boolean;
  private cancelWindow: number;
  private domesticInterbankTransferFee: number;
  private internationalInterbankTransferFee: number;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.interbank_transfer;
  }

  public getTransferProfile(): TransferProfile {
    return this.transferProfile;
  }

  public setTransferProfile(transferProfile: TransferProfile): void {
    this.transferProfile = transferProfile;
  }

  public getSupportsBillPay(): boolean {
    return this.supportsBillPay;
  }

  public setSupportsBillPay(supportsBillPay: boolean): void {
    this.supportsBillPay = supportsBillPay;
  }

  public getCancelWindow(): number {
    return this.cancelWindow;
  }

  public setCancelWindow(cancelWindow: number): void {
    this.cancelWindow = cancelWindow;
  }

  public getDomesticInterbankTransferFee(): number {
    return this.domesticInterbankTransferFee;
  }

  public setDomesticInterbankTransferFee(domesticInterbankTransferFee: number): void {
    this.domesticInterbankTransferFee = domesticInterbankTransferFee;
  }

  public getInternationalInterbankTransferFee(): number {
    return this.internationalInterbankTransferFee;
  }

  public setInternationalInterbankTransferFee(internationalInterbankTransferFee: number): void {
    this.internationalInterbankTransferFee = internationalInterbankTransferFee;
  }
}

Aggregate_add( InterbankTransferV1MessageSetInfo, "INTERXFERMSGSETV1" );
ChildAggregate_add(InterbankTransferV1MessageSetInfo, { name: "XFERPROF", required: true, order: 10, type: TransferProfile, read: InterbankTransferV1MessageSetInfo.prototype.getTransferProfile, write: InterbankTransferV1MessageSetInfo.prototype.setTransferProfile });
Element_add(InterbankTransferV1MessageSetInfo, { name: "CANBILLPAY", required: true, order: 20, type: Boolean, read: InterbankTransferV1MessageSetInfo.prototype.getSupportsBillPay, write: InterbankTransferV1MessageSetInfo.prototype.setSupportsBillPay });
Element_add(InterbankTransferV1MessageSetInfo, { name: "CANCELWND", required: true, order: 30, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getCancelWindow, write: InterbankTransferV1MessageSetInfo.prototype.setCancelWindow });
Element_add(InterbankTransferV1MessageSetInfo, { name: "DOMXFERFEE", required: true, order: 40, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getDomesticInterbankTransferFee, write: InterbankTransferV1MessageSetInfo.prototype.setDomesticInterbankTransferFee });
Element_add(InterbankTransferV1MessageSetInfo, { name: "INTLXFERFEE", required: true, order: 50, type: Number, read: InterbankTransferV1MessageSetInfo.prototype.getInternationalInterbankTransferFee, write: InterbankTransferV1MessageSetInfo.prototype.setInternationalInterbankTransferFee });
