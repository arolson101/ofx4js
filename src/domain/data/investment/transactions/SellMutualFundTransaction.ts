import { InvestmentTransactionType } from "./TransactionType";
import { BaseSellInvestmentTransaction } from "./BaseSellInvestmentTransaction";
import { SellType, SellType_fromOfx } from "./SellType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for selling mutual fund.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SellMutualFundTransaction extends BaseSellInvestmentTransaction {

  private sellType: string;
  private averageCostBasis: number;
  private relatedTransactionId: string;

  constructor() {
    super(InvestmentTransactionType.SELL_MUTUAL_FUND);
  }

  /**
   * Gets the type of sale. One of "SELL" or "SELLSHORT".
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return The type of sale
   */
  public getSellType(): string {
    return this.sellType;
  }

  /**
   * Sets the type of sale. One of "SELL" or "SELLSHORT".
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sellType The type of sale
   */
  public setSellType(sellType: string): void {
    this.sellType = sellType;
  }

  /**
   * Gets the sell type as one of the well-known types.
   *
   * @return the type of sale or null if it's not known.
   */
  public getSellTypeEnum(): SellType {
    return SellType_fromOfx(this.sellType);
  }

  /**
   * Gets the average cost basis of the sale.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return The average cost basis of the sale
   */
  public getAverageCostBasis(): number {
    return this.averageCostBasis;
  }

  /**
   * Sets the average cost basis of the sale.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param averageCostBasis The average cost basis of the sale
   */
  public setAverageCostBasis(averageCostBasis: number): void {
    this.averageCostBasis = averageCostBasis;
  }

  /**
   * Gets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
   * This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the related transaction id
   */
  public getRelatedTransactionId(): string {
    return this.relatedTransactionId;
  }

  /**
   * Sets any related transaction id for a mutual fund sale (e.g. for a mutual fund exchange).
   * This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param relatedTransactionId the related transaction id
   */
  public setRelatedTransactionId(relatedTransactionId: string): void {
    this.relatedTransactionId = relatedTransactionId;
  }
}

Aggregate_add( SellMutualFundTransaction, "SELLMF" );
Element_add(SellMutualFundTransaction, { name: "SELLTYPE", order: 20, type: String, read: SellMutualFundTransaction.prototype.getSellType, write: SellMutualFundTransaction.prototype.setSellType });
Element_add(SellMutualFundTransaction, { name: "AVGCOSTBASIS", order: 30, type: Number, read: SellMutualFundTransaction.prototype.getAverageCostBasis, write: SellMutualFundTransaction.prototype.setAverageCostBasis });
Element_add(SellMutualFundTransaction, { name: "RELFITID", order: 40, type: String, read: SellMutualFundTransaction.prototype.getRelatedTransactionId, write: SellMutualFundTransaction.prototype.setRelatedTransactionId });
