import { BaseSellInvestmentTransaction } from "./BaseSellInvestmentTransaction";
import { InvestmentTransactionType } from "./TransactionType";
import { SellType, SellType_fromOfx } from "./SellType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for selling stock.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SellStockTransaction extends BaseSellInvestmentTransaction {

  private sellType: string;

  constructor() {
    super(InvestmentTransactionType.SELL_STOCK);
  }

  /**
   * Gets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sell type
   */
  public getSellType(): string {
    return this.sellType;
  }

  /**
   * Sets the type of stock sale (i.e. "SELL" or "SELLSHORT"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sellType the sell type
   */
  public setSellType(sellType: string): void {
    this.sellType = sellType;
  }

  /**
   * Gets the sell type as one of the well-known types.
   *
   * @return the type of sale or null if it's not known
   */
  public getSellTypeEnum(): SellType {
    return SellType_fromOfx(this.sellType);
  }
}

Aggregate_add( SellStockTransaction, "SELLSTOCK" );
Element_add(SellStockTransaction, { name: "SELLTYPE", required: true, order: 20, type: String, read: SellStockTransaction.prototype.getSellType, write: SellStockTransaction.prototype.setSellType });
