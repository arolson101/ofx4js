import { InvestmentTransactionType } from "./TransactionType";
import { BaseSellInvestmentTransaction } from "./BaseSellInvestmentTransaction";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";


/**
 * Transaction for buying other types of securities.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SellOtherTransaction extends BaseSellInvestmentTransaction {

  constructor() {
    super(InvestmentTransactionType.SELL_OTHER);
  }
}

Aggregate_add( SellOtherTransaction, "SELLOTHER" );
