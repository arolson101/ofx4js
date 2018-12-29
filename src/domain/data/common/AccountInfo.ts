import { AccountDetails } from "./AccountDetails";


/**
 * Marker interface for account information.
 */
export interface AccountInfo {

  /**
   * The account details.
   *
   * @return The account details.
   */
  getAccountDetails(): AccountDetails;

}
