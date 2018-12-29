import { FinancialInstitutionAccount } from "./FinancialInstitutionAccount";
import { BankAccountDetails } from "../domain/data/banking/BankAccountDetails";


export interface BankAccount extends FinancialInstitutionAccount {

  /**
   * The details of the account.
   *
   * @return The details of the account.
   */
  getDetails(): BankAccountDetails;
}
