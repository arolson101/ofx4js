import { TransactionList } from "../domain/data/common/TransactionList";
import { BalanceInfo } from "../domain/data/common/BalanceInfo";


export interface AccountStatement {

  /**
   * The currency code.
   *
   * @return The currency code.
   * @see java.util.Currency#getCurrencyCode()
   */
  getCurrencyCode(): string;

  /**
   * The transaction list.
   *
   * @return The transaction list.
   */
  getTransactionList(): TransactionList;

  /**
   * The ledger balance.
   *
   * @return The ledger balance.
   */
  getLedgerBalance(): BalanceInfo;

  /**
   * The available balance.
   *
   * @return The available balance.
   */
  getAvailableBalance(): BalanceInfo;

}
