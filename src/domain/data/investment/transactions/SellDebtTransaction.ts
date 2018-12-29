import { InvestmentTransactionType } from "./TransactionType";
import { BaseSellInvestmentTransaction } from "./BaseSellInvestmentTransaction";
import { SellDebtReason, SellDebtReason_fromOfx } from "./SellDebtReason";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for selling debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SellDebtTransaction extends BaseSellInvestmentTransaction {

  private sellReason: string;
  private accruedInterest: number;

  constructor() {
    super(InvestmentTransactionType.SELL_DEBT);
  }

  /**
   * Gets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
   * "MATURITY" (the debt reached maturity).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return The reason for the sale
   */
  public getSellReason(): string {
    return this.sellReason;
  }

  /**
   * Sets the reason for the sale. One of "CALL" (the debt was called), "SELL" (the debt was sold),
   * "MATURITY" (the debt reached maturity).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sellReason The reason for the sale
   */
  public setSellReason(sellReason: string): void {
    this.sellReason = sellReason;
  }

  /**
   * Gets the sell reason as one of the well-known types.
   *
   * @return the sell reason or null if it's not well known
   */
  public getSellReasonEnum(): SellDebtReason {
    return SellDebtReason_fromOfx(this.getSellReason());
  }

  /**
   * Gets the amount of accrued interest on the debt. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the amount of accrued interest
   */
  public getAccruedInterest(): number {
    return this.accruedInterest;
  }

  /**
   * Sets the amount of accrued interest on the debt. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param accruedInterest the amount of accrued interest
   */
  public setAccruedInterest(accruedInterest: number): void {
    this.accruedInterest = accruedInterest;
  }
}

Aggregate_add( SellDebtTransaction, "SELLDEBT" );
Element_add(SellDebtTransaction, { name: "SELLREASON", order: 30, type: String, read: SellDebtTransaction.prototype.getSellReason, write: SellDebtTransaction.prototype.setSellReason });
Element_add(SellDebtTransaction, { name: "ACCRDINT", order: 40, type: Number, read: SellDebtTransaction.prototype.getAccruedInterest, write: SellDebtTransaction.prototype.setAccruedInterest });
