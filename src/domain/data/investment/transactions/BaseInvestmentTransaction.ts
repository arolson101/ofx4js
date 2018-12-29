import { InvestmentTransactionType } from "./TransactionType";
import { InvestmentTransaction } from "./InvestmentTransaction";


/**
 * Base class for all investment transactions.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 */
export abstract class BaseInvestmentTransaction {

  private transactionType: InvestmentTransactionType;

  constructor(transactionType: InvestmentTransactionType) {
    this.transactionType = transactionType;
  }

  /**
   * Gets the type of transaction.
   *
   * @return the type of transaction
   */
  public getTransactionType(): InvestmentTransactionType {
    return this.transactionType;
  }

  /**
   * Gets the {@link InvestmentTransaction} aggregate.
   *
   * @return the {@link InvestmentTransaction} aggregate
   */
  public abstract getInvestmentTransaction(): InvestmentTransaction;

  /**
   * Gets the unique financial institution assigned transaction id. This is a
   * required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the financial institution asssigned transaction id
   */
  public getTransactionId(): string {
    return this.getInvestmentTransaction().getTransactionId();
  }

  /**
   * Gets the server assigned transaction id. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the server assigned transaction id
   */
  public getServerId(): string {
    return this.getInvestmentTransaction().getServerId();
  }

  /**
   * Gets the trade date of the transaction. For stock splits, this is the
   * day of record. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the trade date
   */
  public getTradeDate(): Date {
    return this.getInvestmentTransaction().getTradeDate();
  }

  /**
   * Gets the settlement date of the transaction. For stock splits, this is the
   * day of of execution. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the trade date
   */
  public getSettlementDate(): Date {
    return this.getInvestmentTransaction().getSettlementDate();
  }

  /**
   * For a reveral transaction, gets the financial institution assigned
   * transaction id for the transaction being revesed.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the transaction id of the transaction being reversed
   */
  public getReversalTransactionId(): string {
    return this.getInvestmentTransaction().getReversalTransactionId();
  }

  /**
   * Gets the memo associated with the transaction. This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.1, OFX Spec"
   *
   * @return the memo
   */
  public getMemo(): string {
    return this.getInvestmentTransaction().getMemo();
  }
}
