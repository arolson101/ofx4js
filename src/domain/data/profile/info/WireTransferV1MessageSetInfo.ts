import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { VersionSpecificMessageSetInfo } from "../VersionSpecificMessageSetInfo";
import { ProcessorDayOff } from "../../common/ProcessorDayOff";
import { MessageSetType } from "../../MessageSetType";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Wire Transfer Message Set Profile
 * @see "Section 11.13.5 OFX Spec"
 */
export class WireTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private processorDaysOff: Array<ProcessorDayOff>;
  private processEndTime: string;
  private supportsScheduledTransfers: boolean;
  private domesticWireTransferFee: number;
  private internationalWireTransferFee: number;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.wire_transfer;
  }

  public getProcessorDaysOff(): Array<ProcessorDayOff> {
    return this.processorDaysOff;
  }

  public setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void {
    this.processorDaysOff = processorDaysOff;
  }

  public getProcessEndTime(): string {
    return this.processEndTime;
  }

  public setProcessEndTime(processEndTime: string): void {
    this.processEndTime = processEndTime;
  }

  public getSupportsScheduledTransfers(): boolean {
    return this.supportsScheduledTransfers;
  }

  public setSupportsScheduledTransfers(supportsScheduledTransfers: boolean): void {
    this.supportsScheduledTransfers = supportsScheduledTransfers;
  }

  public getDomesticWireTransferFee(): number {
    return this.domesticWireTransferFee;
  }

  public setDomesticWireTransferFee(domesticWireTransferFee: number): void {
    this.domesticWireTransferFee = domesticWireTransferFee;
  }

  public getInternationalWireTransferFee(): number {
    return this.internationalWireTransferFee;
  }

  public setInternationalWireTransferFee(internationalWireTransferFee: number): void {
    this.internationalWireTransferFee = internationalWireTransferFee;
  }
}

Aggregate_add( WireTransferV1MessageSetInfo, "WIREXFERMSGSETV1" );
Element_add(WireTransferV1MessageSetInfo, { name: "PROCDAYSOFF", order: 10, type: Array, collectionEntryType: ProcessorDayOff, read: WireTransferV1MessageSetInfo.prototype.getProcessorDaysOff, write: WireTransferV1MessageSetInfo.prototype.setProcessorDaysOff });
Element_add(WireTransferV1MessageSetInfo, { name: "PROCENDTM", required: true, order: 20, type: String, read: WireTransferV1MessageSetInfo.prototype.getProcessEndTime, write: WireTransferV1MessageSetInfo.prototype.setProcessEndTime });
Element_add(WireTransferV1MessageSetInfo, { name: "CANSCHED", required: true, order: 30, type: Boolean, read: WireTransferV1MessageSetInfo.prototype.getSupportsScheduledTransfers, write: WireTransferV1MessageSetInfo.prototype.setSupportsScheduledTransfers });
Element_add(WireTransferV1MessageSetInfo, { name: "DOMXFERFEE", required: true, order: 40, type: Number, read: WireTransferV1MessageSetInfo.prototype.getDomesticWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setDomesticWireTransferFee });
Element_add(WireTransferV1MessageSetInfo, { name: "INTLXFERFEE", required: true, order: 50, type: Number, read: WireTransferV1MessageSetInfo.prototype.getInternationalWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setInternationalWireTransferFee });
