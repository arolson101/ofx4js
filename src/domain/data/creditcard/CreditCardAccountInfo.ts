import { AccountInfo } from "../common/AccountInfo";
import { CreditCardAccountDetails } from "./CreditCardAccountDetails";
import { AccountStatus } from "../common/AccountStatus";
import { AccountDetails } from "../common/AccountDetails";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";
import { Element_add } from "../../../meta/Element_add";


export class CreditCardAccountInfo implements AccountInfo {

  private creditCardAccount: CreditCardAccountDetails;
  private supportsTransactionDetailOperations: boolean;
  private supportsTransferToOtherAccountOperations: boolean;
  private supportsTransferFromOtherAccountOperations: boolean;
  private status: AccountStatus;

  /**
   * The credit card account this information is referencing.
   *
   * @return The credit card account this information is referencing.
   */
  public getCreditCardAccount(): CreditCardAccountDetails {
    return this.creditCardAccount;
  }

  /**
   * The credit card account this information is referencing.
   *
   * @param creditCardAccount The credit card account this information is referencing.
   */
  public setCreditCardAccount(creditCardAccount: CreditCardAccountDetails): void {
    this.creditCardAccount = creditCardAccount;
  }

  // Inherited.
  public getAccountDetails(): AccountDetails {
    return this.getCreditCardAccount();
  }

  /**
   * Whether this account supports download of transaction details.
   *
   * @return Whether this account supports download of transaction details.
   */
  public getSupportsTransactionDetailOperations(): boolean {
    return this.supportsTransactionDetailOperations;
  }

  /**
   * Whether this account supports download of transaction details.
   *
   * @param supportsTransactionDetailOperations Whether this account supports download of transaction details.
   */
  public setSupportsTransactionDetailOperations(supportsTransactionDetailOperations: boolean): void {
    this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
  }

  /**
   * Whether this account supports transfer operations to other accounts.
   *
   * @return Whether this account supports transfer operations to other accounts.
   */
  public getSupportsTransferToOtherAccountOperations(): boolean {
    return this.supportsTransferToOtherAccountOperations;
  }

  /**
   * Whether this account supports transfer operations to other accounts.
   *
   * @param supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
   */
  public setSupportsTransferToOtherAccountOperations(supportsTransferToOtherAccountOperations: boolean): void {
    this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
  }

  /**
   * Whether this account supports transfer operations from other accounts.
   *
   * @return Whether this account supports transfer operations from other accounts.
   */
  public getSupportsTransferFromOtherAccountOperations(): boolean {
    return this.supportsTransferFromOtherAccountOperations;
  }

  /**
   * Whether this account supports transfer operations from other accounts.
   *
   * @param supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
   */
  public setSupportsTransferFromOtherAccountOperations(supportsTransferFromOtherAccountOperations: boolean): void {
    this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
  }

  /**
   * The account status.
   *
   * @return The account status.
   */
  public getStatus(): AccountStatus {
    return this.status;
  }

  /**
   * The account status.
   *
   * @param status The account status.
   */
  public setStatus(status: AccountStatus): void {
    this.status = status;
  }
}

Aggregate_add( CreditCardAccountInfo, "CCACCTINFO" );
ChildAggregate_add(CreditCardAccountInfo, { name: "CCACCTFROM", required: true, order: 0, type: CreditCardAccountDetails, read: CreditCardAccountInfo.prototype.getCreditCardAccount, write: CreditCardAccountInfo.prototype.setCreditCardAccount });
Element_add(CreditCardAccountInfo, { name: "SUPTXDL", required: true, order: 10, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransactionDetailOperations, write: CreditCardAccountInfo.prototype.setSupportsTransactionDetailOperations });
Element_add(CreditCardAccountInfo, { name: "XFERSRC", required: true, order: 20, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransferToOtherAccountOperations, write: CreditCardAccountInfo.prototype.setSupportsTransferToOtherAccountOperations });
Element_add(CreditCardAccountInfo, { name: "XFERDEST", required: true, order: 30, type: Boolean, read: CreditCardAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations, write: CreditCardAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations });
Element_add(CreditCardAccountInfo, { name: "SVCSTATUS", required: true, order: 40, type: AccountStatus, read: CreditCardAccountInfo.prototype.getStatus, write: CreditCardAccountInfo.prototype.setStatus });
