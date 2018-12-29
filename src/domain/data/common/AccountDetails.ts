
/**
 * Common details about an account.
 */
export interface AccountDetails {

  /**
   * The account number.
   *
   * @return The account number.
   */
  getAccountNumber(): string;

  /**
   * The account key.
   *
   * @return The account key.
   */
  getAccountKey(): string;

}
