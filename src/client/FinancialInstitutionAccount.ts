import { AccountStatement } from "./AccountStatement";


/**
 * A specific account at a financial institution.
 */
export interface FinancialInstitutionAccount {

  /**
   * Read an account statement.
   *
   * @param start The start date of the statement.
   * @param end The end date of the statement.
   * @return The account statement.
   */
  readStatement(start: Date, end: Date) /*throws OFXException*/: Promise<AccountStatement>;
}
