import { ProcessorDayOff } from "../../../common/ProcessorDayOff";
import { Aggregate_add } from "../../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../../meta/Element_add";


/**
 * Funds Transfer Profile
 * @see "Section 11.13.2.2 OFX Spec"
 */
export class TransferProfile {

  private processorDaysOff: Array<ProcessorDayOff>;
  private processEndTime: string;
  private supportsScheduledTransfers: boolean;
  private supportsRecurringTransfers: boolean;
  private supportsLoanTransfers: boolean;
  private supportsScheduledLoanTransfers: boolean;
  private supportsRecurringLoanTransfers: boolean;
  private supportsTransferModification: boolean;
  private supportsModelModification: boolean;
  private modelWindow: number;
  private withdrawnDays: number;
  private defaultDaysToPay: number;


  /**
   * Days of week that no processing occurs: MONDAY, TUESDAY, WEDNESDAY, THURSDAY,
   * FRIDAY, SATURDAY, or SUNDAY. 0 or more <PROCDAYSOFF> can be sent.
   * @return List of days during the week that no processing occurs.
   */
  public getProcessorDaysOff(): Array<ProcessorDayOff> {
    return this.processorDaysOff;
  }

  public setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void  {
    this.processorDaysOff = processorDaysOff;
  }

  /**
   * Gets time of day that day's processing ends.
   *
   * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
   * the milliseconds and time zone are still optional, and default to GMT.
   * @see "Section 3.2.8.3 OFX Spec"
   * @return Time String formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
   */
  public getProcessEndTime(): string  {
    return this.processEndTime;
  }

  /**
   * Sets the time of day that day's processing ends.
   *
   * Time formatted as "HHMMSS.XXX[gmt offset[:tz name]]",
   * the milliseconds and time zone are still optional, and default to GMT.

   * @see "Section 3.2.8.3 OFX Spec"
   * @param processEndTime formatted as "HHMMSS.XXX[gmt offset[:tz name]]"
   */
  public setProcessEndTime(processEndTime: string): void  {
    this.processEndTime = processEndTime;
  }

  public getSupportsScheduledTransfers(): boolean  {
    return this.supportsScheduledTransfers;
  }

  public setSupportsScheduledTransfers(supportsScheduledTransfers: boolean): void  {
    this.supportsScheduledTransfers = supportsScheduledTransfers;
  }

  /**
   * Requires <CANSCHED>
   * @return Boolean whether supports recurring transfers
   */
  public getSupportsRecurringTransfers(): boolean  {
    return this.supportsRecurringTransfers;
  }

  public setSupportsRecurringTransfers(supportsRecurringTransfers: boolean): void  {
    this.supportsRecurringTransfers = supportsRecurringTransfers;
  }

  /**
   * <CANLOAN>Y must be present for transfers to involve loans
   * @return Boolean whether supports loan transfers
   */
  public getSupportsLoanTransfers(): boolean  {
    return this.supportsLoanTransfers;
  }

  public setSupportsLoanTransfers(supportsLoanTransfers: boolean): void  {
    this.supportsLoanTransfers = supportsLoanTransfers;
  }

  public getSupportsScheduledLoanTransfers(): boolean  {
    return this.supportsScheduledLoanTransfers;
  }

  public setSupportsScheduledLoanTransfers(supportsScheduledLoanTransfers: boolean): void  {
    this.supportsScheduledLoanTransfers = supportsScheduledLoanTransfers;
  }

  public getSupportsRecurringLoanTransfers(): boolean  {
    return this.supportsRecurringLoanTransfers;
  }

  public setSupportsRecurringLoanTransfers(supportsRecurringLoanTransfers: boolean): void  {
    this.supportsRecurringLoanTransfers = supportsRecurringLoanTransfers;
  }

  public getSupportsTransferModification(): boolean  {
    return this.supportsTransferModification;
  }

  public setSupportsTransferModification(supportsTransferModification: boolean): void  {
    this.supportsTransferModification = supportsTransferModification;
  }

  public getSupportsModelModification(): boolean  {
    return this.supportsModelModification;
  }

  public setSupportsModelModification(supportsModelModification: boolean): void  {
    this.supportsModelModification = supportsModelModification;
  }

  /**
   * Model window
   * the number of days before a recurring transaction is scheduled to be processed that it is
   * instantiated on the system
   * @return Number number of days before a recurring transaction is scheduled to be processed that it is instantiated on the system
   */
  public getModelWindow(): number  {
    return this.modelWindow;
  }

  public setModelWindow(modelWindow: number): void  {
    this.modelWindow = modelWindow;
  }

  /**
   * Number of days before processing date that funds are withdrawn
   * @return Number number of days before processing date that funds are withdrawn
   */
  public getWithdrawnDays(): number  {
    return this.withdrawnDays;
  }

  public setWithdrawnDays(withdrawnDays: number): void  {
    this.withdrawnDays = withdrawnDays;
  }

  /**
   * Default number of days to pay
   * @return Number Default number of days to pay
   */
  public getDefaultDaysToPay(): number  {
    return this.defaultDaysToPay;
  }

  public setDefaultDaysToPay(defaultDaysToPay: number): void  {
    this.defaultDaysToPay = defaultDaysToPay;
  }
}

Aggregate_add( TransferProfile, "XFERPROF" );
Element_add(TransferProfile, { name: "PROCDAYSOFF", order: 0, type: Array, collectionEntryType: ProcessorDayOff, read: TransferProfile.prototype.getProcessorDaysOff, write: TransferProfile.prototype.setProcessorDaysOff });
Element_add(TransferProfile, { name: "PROCENDTM", required: true, order: 10, type: String, read: TransferProfile.prototype.getProcessEndTime, write: TransferProfile.prototype.setProcessEndTime });
Element_add(TransferProfile, { name: "CANSCHED", required: true, order: 20, type: Boolean, read: TransferProfile.prototype.getSupportsScheduledTransfers, write: TransferProfile.prototype.setSupportsScheduledTransfers });
Element_add(TransferProfile, { name: "CANRECUR", required: true, order: 30, type: Boolean, read: TransferProfile.prototype.getSupportsRecurringTransfers, write: TransferProfile.prototype.setSupportsRecurringTransfers });
Element_add(TransferProfile, { name: "CANLOAN", order: 40, type: Boolean, read: TransferProfile.prototype.getSupportsLoanTransfers, write: TransferProfile.prototype.setSupportsLoanTransfers });
Element_add(TransferProfile, { name: "CANSCHEDLOAN", order: 50, type: Boolean, read: TransferProfile.prototype.getSupportsScheduledLoanTransfers, write: TransferProfile.prototype.setSupportsScheduledLoanTransfers });
Element_add(TransferProfile, { name: "CANRECURLOAN", order: 60, type: Boolean, read: TransferProfile.prototype.getSupportsRecurringLoanTransfers, write: TransferProfile.prototype.setSupportsRecurringLoanTransfers });
Element_add(TransferProfile, { name: "CANMODXFERS", required: true, order: 70, type: Boolean, read: TransferProfile.prototype.getSupportsTransferModification, write: TransferProfile.prototype.setSupportsTransferModification });
Element_add(TransferProfile, { name: "CANMODMDLS", required: true, order: 80, type: Boolean, read: TransferProfile.prototype.getSupportsModelModification, write: TransferProfile.prototype.setSupportsModelModification });
Element_add(TransferProfile, { name: "MODELWND", required: true, order: 90, type: Number, read: TransferProfile.prototype.getModelWindow, write: TransferProfile.prototype.setModelWindow });
Element_add(TransferProfile, { name: "DAYSWITH", required: true, order: 100, type: Number, read: TransferProfile.prototype.getWithdrawnDays, write: TransferProfile.prototype.setWithdrawnDays });
Element_add(TransferProfile, { name: "DFLTDAYSTOPAY", required: true, order: 110, type: Number, read: TransferProfile.prototype.getDefaultDaysToPay, write: TransferProfile.prototype.setDefaultDaysToPay });
