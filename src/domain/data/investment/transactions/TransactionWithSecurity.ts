import { SecurityId } from "../../seclist/SecurityId";


/**
 * Interface for transactions that have a security associated with them.
 */
export interface TransactionWithSecurity {

  /**
   * Gets the security for the transaction.
   *
   * @return the security id for the transaction
   */
  getSecurityId(): SecurityId;
}
