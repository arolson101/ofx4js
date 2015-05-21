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
///<reference path='../../../project.d.ts'/>
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/Element_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../banking/BankAccountDetails'/>
///<reference path='../creditcard/CreditCardAccountDetails'/>
///<reference path='CorrectionAction'/>
///<reference path='Currency'/>
///<reference path='Payee'/>
///<reference path='TransactionType'/>

module ofx4js.domain.data.common {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;

/**
 * @author Ryan Heaton
 */
export class Transaction {

  private transactionType: TransactionType;
  private datePosted: Date;
  private dateInitiated: Date;
  private dateAvailable: Date;
  private amount: number;
  private id: string;
  private correctionId: string;
  private correctionAction: CorrectionAction;
  private tempId: string;
  private checkNumber: string;
  private referenceNumber: string;
  private standardIndustrialCode: string;
  private payeeId: string;
  private name: string;
  private payee: Payee;
  private bankAccountTo: BankAccountDetails;
  private creditCardAccountTo: CreditCardAccountDetails;
  private memo: string;
  private currency: Currency;
  private originalCurrency: Currency;

  /**
   * The transaction type.
   *
   * @return The transaction type.
   */
  public getTransactionType(): TransactionType {
    return this.transactionType;
  }

  /**
   * The transaction type.
   *
   * @param transactionType The transaction type.
   */
  public setTransactionType(transactionType: TransactionType): void {
    this.transactionType = transactionType;
  }

  /**
   * The date the transaction was posted.
   *
   * @return The date the transaction was posted.
   */
  public getDatePosted(): Date {
    return this.datePosted;
  }

  /**
   * The date the transaction was posted.
   *
   * @param datePosted The date the transaction was posted.
   */
  public setDatePosted(datePosted: Date): void {
    this.datePosted = datePosted;
  }

  /**
   * The date the transaction was initiated.
   *
   * @return The date the transaction was initiated.
   */
  public getDateInitiated(): Date {
    return this.dateInitiated;
  }

  /**
   * The date the transaction was initiated.
   *
   * @param dateInitiated The date the transaction was initiated.
   */
  public setDateInitiated(dateInitiated: Date): void {
    this.dateInitiated = dateInitiated;
  }

  /**
   * The date the funds are available.
   *
   * @return The date the funds are available.
   */
  public getDateAvailable(): Date {
    return this.dateAvailable;
  }

  /**
   * The date the funds are available.
   *
   * @param dateAvailable The date the funds are available.
   */
  public setDateAvailable(dateAvailable: Date): void {
    this.dateAvailable = dateAvailable;
  }

  /**
   * The transaction amount.
   *
   * @return The transaction amount.
   */
  public getAmount(): number {
    return this.amount;
  }

  /**
   * The transaction amount.
   *
   * @param amount The transaction amount.
   */
  public setAmount(amount: number): void {
    this.amount = amount;
  }

  /**
   * The transaction amount.
   *
   * @return The transaction amount.
   */
  public getBigDecimalAmount(): number {
    return this.amount;
  }

  /**
   * The transaction amount.
   *
   * @param amount The transaction amount.
   */
  public setBigDecimalAmount(amount: number): void {
    this.amount = amount;
  }

  /**
   * The transaction id (server-assigned).
   *
   * @return The transaction id (server-assigned).
   */
  public getId(): string {
    return this.id;
  }

  /**
   * The transaction id (server-assigned).
   *
   * @param id The transaction id (server-assigned).
   */
  public setId(id: string): void {
    this.id = id;
  }

  /**
   * The id of the transaction that this is correcting.
   *
   * @return The id of the transaction that this is correcting.
   */
  public getCorrectionId(): string {
    return this.correctionId;
  }

  /**
   * The id of the transaction that this is correcting.
   *
   * @param correctionId The id of the transaction that this is correcting.
   */
  public setCorrectionId(correctionId: string): void {
    this.correctionId = correctionId;
  }

  /**
   * The action to take on the {@link #getCorrectionId() corrected transaction}.
   *
   * @return The action to take on the {@link #getCorrectionId() corrected transaction}.
   */
  public getCorrectionAction(): CorrectionAction {
    return this.correctionAction;
  }

  /**
   * The action to take on the {@link #getCorrectionId() corrected transaction}.
   *
   * @param correctionAction The action to take on the {@link #getCorrectionId() corrected transaction}.
   */
  public setCorrectionAction(correctionAction: CorrectionAction): void {
    this.correctionAction = correctionAction;
  }

  /**
   * The server-assigned temporary id for client-initiated transactions.
   *
   * @return The server-assigned temporary id for client-initiated transactions.
   */
  public getTempId(): string {
    return this.tempId;
  }

  /**
   * The server-assigned temporary id for client-initiated transactions.
   *
   * @param tempId The server-assigned temporary id for client-initiated transactions.
   */
  public setTempId(tempId: string): void {
    this.tempId = tempId;
  }

  /**
   * The check number.
   *
   * @return The check number.
   */
  public getCheckNumber(): string {
    return this.checkNumber;
  }

  /**
   * The check number.
   *
   * @param checkNumber The check number.
   */
  public setCheckNumber(checkNumber: string): void {
    this.checkNumber = checkNumber;
  }

  /**
   * The reference number.
   *
   * @return The reference number.
   */
  public getReferenceNumber(): string {
    return this.referenceNumber;
  }

  /**
   * The reference number.
   *
   * @param referenceNumber The reference number.
   */
  public setReferenceNumber(referenceNumber: string): void {
    this.referenceNumber = referenceNumber;
  }

  /**
   * The standard industrial code.
   *
   * @return The standard industrial code.
   */
  public getStandardIndustrialCode(): string {
    return this.standardIndustrialCode;
  }

  /**
   * The standard industrial code.
   *
   * @param standardIndustrialCode The standard industrial code.
   */
  public setStandardIndustrialCode(standardIndustrialCode: string): void {
    this.standardIndustrialCode = standardIndustrialCode;
  }

  /**
   * The payee id.
   *
   * @return The payee id.
   */
  public getPayeeId(): string {
    return this.payeeId;
  }

  /**
   * The payee id.
   *
   * @param payeeId The payee id.
   */
  public setPayeeId(payeeId: string): void {
    this.payeeId = payeeId;
  }

  /**
   * The name (description) or the transaction.
   *
   * @return The name (description) or the transaction.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * The name (description) or the transaction.
   *
   * @param name The name (description) or the transaction.
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * The payee.
   *
   * @return The payee.
   */
  public getPayee(): Payee {
    return this.payee;
  }

  /**
   * The payee.
   *
   * @param payee The payee.
   */
  public setPayee(payee: Payee): void {
    this.payee = payee;
  }

  /**
   * The bank account the transfer was to.
   *
   * @return The bank account the transfer was to.
   */
  public getBankAccountTo(): BankAccountDetails {
    return this.bankAccountTo;
  }

  /**
   * The bank account the transfer was to.
   *
   * @param bankAccountTo The bank account the transfer was to.
   */
  public setBankAccountTo(bankAccountTo: BankAccountDetails): void {
    this.bankAccountTo = bankAccountTo;
  }

  /**
   * The credit-card account the transfer was to.
   *
   * @return The credit-card account the transfer was to.
   */
  public getCreditCardAccountTo(): CreditCardAccountDetails {
    return this.creditCardAccountTo;
  }

  /**
   * The credit-card account the transfer was to.
   *
   * @param creditCardAccountTo The credit-card account the transfer was to.
   */
  public setCreditCardAccountTo(creditCardAccountTo: CreditCardAccountDetails): void {
    this.creditCardAccountTo = creditCardAccountTo;
  }

  /**
   * Notes.
   *
   * @return Notes.
   */
  public getMemo(): string {
    return this.memo;
  }

  /**
   * Notes.
   *
   * @param memo Notes.
   */
  public setMemo(memo: string): void {
    this.memo = memo;
  }

  /**
   * The currency.
   *
   * @return The currency.
   */
  public getCurrency(): Currency {
    return this.currency;
  }

  /**
   * The currency.
   *
   * @param currency The currency.
   */
  public setCurrency(currency: Currency): void {
    this.currency = currency;
  }

  /**
   * The original currency.
   *
   * @return The original currency.
   */
  public getOriginalCurrency(): Currency {
    return this.originalCurrency;
  }

  /**
   * The original currency.
   *
   * @param originalCurrency The original currency.
   */
  public setOriginalCurrency(originalCurrency: Currency): void {
    this.originalCurrency = originalCurrency;
  }
}

Aggregate_add( Transaction, "STMTTRN" );
Element_add(Transaction, { name: "TRNTYPE", required: true, order: 0, type: TransactionType, read: Transaction.prototype.getTransactionType, write: Transaction.prototype.setTransactionType });
Element_add(Transaction, { name: "DTPOSTED", required: true, order: 10, type: Date, read: Transaction.prototype.getDatePosted, write: Transaction.prototype.setDatePosted });
Element_add(Transaction, { name: "DTUSER", order: 20, type: Date, read: Transaction.prototype.getDateInitiated, write: Transaction.prototype.setDateInitiated });
Element_add(Transaction, { name: "DTAVAIL", order: 30, type: Date, read: Transaction.prototype.getDateAvailable, write: Transaction.prototype.setDateAvailable });
Element_add(Transaction, { name: "TRNAMT", required: true, order: 40, type: Number, read: Transaction.prototype.getBigDecimalAmount, write: Transaction.prototype.setBigDecimalAmount });
Element_add(Transaction, { name: "FITID", required: true, order: 50, type: String, read: Transaction.prototype.getId, write: Transaction.prototype.setId });
Element_add(Transaction, { name: "CORRECTFITID", order: 60, type: String, read: Transaction.prototype.getCorrectionId, write: Transaction.prototype.setCorrectionId });
Element_add(Transaction, { name: "CORRECTACTION", order: 70, type: CorrectionAction, read: Transaction.prototype.getCorrectionAction, write: Transaction.prototype.setCorrectionAction });
Element_add(Transaction, { name: "SRVRTID", order: 80, type: String, read: Transaction.prototype.getTempId, write: Transaction.prototype.setTempId });
Element_add(Transaction, { name: "CHECKNUM", order: 90, type: String, read: Transaction.prototype.getCheckNumber, write: Transaction.prototype.setCheckNumber });
Element_add(Transaction, { name: "REFNUM", order: 100, type: String, read: Transaction.prototype.getReferenceNumber, write: Transaction.prototype.setReferenceNumber });
Element_add(Transaction, { name: "SIC", order: 110, type: String, read: Transaction.prototype.getStandardIndustrialCode, write: Transaction.prototype.setStandardIndustrialCode });
Element_add(Transaction, { name: "PAYEEID", order: 120, type: String, read: Transaction.prototype.getPayeeId, write: Transaction.prototype.setPayeeId });
Element_add(Transaction, { name: "NAME", order: 130, type: String, read: Transaction.prototype.getName, write: Transaction.prototype.setName });
ChildAggregate_add(Transaction, { order: 140, type: Payee, read: Transaction.prototype.getPayee, write: Transaction.prototype.setPayee });
ChildAggregate_add(Transaction, { name: "BANKACCTTO", order: 150, type: BankAccountDetails, read: Transaction.prototype.getBankAccountTo, write: Transaction.prototype.setBankAccountTo });
ChildAggregate_add(Transaction, { name: "CCACCTTO", order: 160, type: CreditCardAccountDetails, read: Transaction.prototype.getCreditCardAccountTo, write: Transaction.prototype.setCreditCardAccountTo });
Element_add(Transaction, { name: "MEMO", order: 170, type: String, read: Transaction.prototype.getMemo, write: Transaction.prototype.setMemo });
ChildAggregate_add(Transaction, { order: 180, type: Currency, read: Transaction.prototype.getCurrency, write: Transaction.prototype.setCurrency });
ChildAggregate_add(Transaction, { name: "ORIGCURRENCY", order: 190, type: Currency, read: Transaction.prototype.getOriginalCurrency, write: Transaction.prototype.setOriginalCurrency });

}
