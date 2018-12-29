import { FinancialInstitutionAccount } from "./FinancialInstitutionAccount";
import { CreditCardAccountDetails } from "../domain/data/creditcard/CreditCardAccountDetails";


export interface CreditCardAccount extends FinancialInstitutionAccount {

  /**
   * The details of the credit card account.
   *
   * @return The details of the credit card account.
   */
  getDetails(): CreditCardAccountDetails;
}
