import { FinancialInstitutionData } from "./FinancialInstitutionData";
import { FinancialInstitutionProfile } from "./FinancialInstitutionProfile";
import { AccountProfile } from "../domain/data/signup/AccountProfile";
import { BankAccountDetails } from "../domain/data/banking/BankAccountDetails";
import { BankAccount } from "./BankAccount";
import { CreditCardAccountDetails } from "../domain/data/creditcard/CreditCardAccountDetails";
import { CreditCardAccount } from "./CreditCardAccount";
import { InvestmentAccountDetails } from "../domain/data/investment/accounts/InvestmentAccountDetails";
import { InvestmentAccount } from "./InvestmentAccount";


export interface FinancialInstitution {

  /**
   * The financial institution data defining this FI.
   *
   * @return The financial institution data.
   */
  getData(): FinancialInstitutionData;

  /**
   * Read the specified financial institution profile. Implies a network call.
   *
   * @return The profile.
   * @throws OFXException if something goes awry.
   */
  readProfile() /*throws OFXException*/ : Promise<FinancialInstitutionProfile>;

  /**
   * Read the account profiles of the specified user.
   *
   * @param username The username.
   * @param password The password.
   * @return The profiles.
   */
  readAccountProfiles(username: string, password: string) /*throws OFXException*/: Promise<Array<AccountProfile>>;

  /**
   * Load a bank account.
   *
   * @param details The bank account details.
   * @param username The username.
   * @param password The password.
   * @return The bank account.
   */
  loadBankAccount(details: BankAccountDetails, username: string, password: string): BankAccount;

  /**
   * Load a credit card account.
   *
   * @param details The credit card account details.
   * @param username The username.
   * @param password The password.
   * @return The credit card account.
   */
  loadCreditCardAccount(details: CreditCardAccountDetails, username: string, password: string): CreditCardAccount;


  /**
   * Load an investment account.
   *
   * @param details The investment account details.
   * @param username The username.
   * @param password The password.
   * @return The investment account.
   */
  loadInvestmentAccount(details: InvestmentAccountDetails, username: string, password: string): InvestmentAccount;
}
