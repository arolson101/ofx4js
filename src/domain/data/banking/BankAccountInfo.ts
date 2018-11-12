/*
 * Copyright 2008 Web Cohesion
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AccountInfo } from "../common/AccountInfo";
import { BankAccountDetails } from "./BankAccountDetails";
import { AccountStatus } from "../common/AccountStatus";
import { AccountDetails } from "../common/AccountDetails";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @author Ryan Heaton
 */
export class BankAccountInfo implements AccountInfo {

  private bankAccount: BankAccountDetails;
  private supportsTransactionDetailOperations: boolean;
  private supportsTransferToOtherAccountOperations: boolean;
  private supportsTransferFromOtherAccountOperations: boolean;
  private status: AccountStatus;

  /**
   * The bank account this information is referencing.
   *
   * @return The bank account this information is referencing.
   */
  public getBankAccount(): BankAccountDetails {
    return this.bankAccount;
  }

  /**
   * The bank account this information is referencing.
   *
   * @param bankAccount The bank account this information is referencing.
   */
  public setBankAccount(bankAccount: BankAccountDetails): void {
    this.bankAccount = bankAccount;
  }

  // Inherited.
  public getAccountDetails(): AccountDetails {
    return this.getBankAccount();
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

Aggregate_add( BankAccountInfo, "BANKACCTINFO" );
ChildAggregate_add(BankAccountInfo, { name: "BANKACCTFROM", required: true, order: 0, type: BankAccountDetails, read: BankAccountInfo.prototype.getBankAccount, write: BankAccountInfo.prototype.setBankAccount });
Element_add(BankAccountInfo, { name: "SUPTXDL", required: true, order: 10, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransactionDetailOperations, write: BankAccountInfo.prototype.setSupportsTransactionDetailOperations });
Element_add(BankAccountInfo, { name: "XFERSRC", required: true, order: 20, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransferToOtherAccountOperations, write: BankAccountInfo.prototype.setSupportsTransferToOtherAccountOperations });
Element_add(BankAccountInfo, { name: "XFERDEST", required: true, order: 30, type: Boolean, read: BankAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations, write: BankAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations });
Element_add(BankAccountInfo, { name: "SVCSTATUS", required: true, order: 40, type: AccountStatus, read: BankAccountInfo.prototype.getStatus, write: BankAccountInfo.prototype.setStatus });
