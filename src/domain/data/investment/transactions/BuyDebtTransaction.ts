import { InvestmentTransactionType } from "./TransactionType";
import { BaseBuyInvestmentTransaction } from "./BaseBuyInvestmentTransaction";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for buying debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class BuyDebtTransaction extends BaseBuyInvestmentTransaction {

  private accruedInterest: number;

  constructor() {
    super(InvestmentTransactionType.BUY_DEBT);
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

Aggregate_add( BuyDebtTransaction, "BUYDEBT" );
Element_add(BuyDebtTransaction, { name: "ACCRDINT", order: 20, type: Number, read: BuyDebtTransaction.prototype.getAccruedInterest, write: BuyDebtTransaction.prototype.setAccruedInterest });
