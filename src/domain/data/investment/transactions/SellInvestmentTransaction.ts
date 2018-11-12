/*
 * Copyright 2010 Web Cohesion
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
import { InvestmentTransaction } from "./InvestmentTransaction";
import { SecurityId } from "../../seclist/SecurityId";
import { OriginalCurrency } from "./OriginalCurrency";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Inv401KSource, Inv401KSource_fromOfx } from "../positions/Inv401KSource";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Sell investment transaction aggregate ("INVSELL").
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SellInvestmentTransaction {
  private investmentTransaction: InvestmentTransaction;
  private securityId: SecurityId;
  private units: number;
  private unitPrice: number;
  private markdown: number;
  private commission: number;
  private taxes: number;
  private fees: number;
  private load: number;
  private withholding: number;
  private taxExempt: boolean;
  private total: number;
  private gain: number;
  private currencyCode: string;
  private originalCurrencyInfo: OriginalCurrency;
  private subAccountSecurity: string;
  private subAccountFund: string;
  private loanId: string;
  private stateWithholding: number;
  private penalty: number;
  private inv401kSource: string;

  /**
   * Gets the investment transaction child aggregate.
   *
   * @return the investment transaction child aggregate
   */
  public getInvestmentTransaction(): InvestmentTransaction {
    return this.investmentTransaction;
  }

  /**
   * Sets the investment transaction child aggregate.
   *
   * @param investmentTransaction the investment transaction child aggregate
   */
  public setInvestmentTransaction(investmentTransaction: InvestmentTransaction): void {
    this.investmentTransaction = investmentTransaction;
  }

  /**
   * Gets the id of the security that was sold. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security that was sold
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the id of the security that was sold. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param securityId the security id of the security that was sold
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
  }

  /**
   * Gets the number of units of the security that was sold. For security-based actions other
   * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the number of units sold
   */
  public getUnits(): number {
    return this.units;
  }

  /**
   * Sets the number of units of the security that was sold. For security-based actions other
   * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param units the number of units sold
   */
  public setUnits(units: number): void {
    this.units = units;
  }

  /**
   * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
   * share price. For bonds, this is the percentage of par. For options, this is the per share (not
   * per contact) price. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the per unit price
   */
  public getUnitPrice(): number {
    return this.unitPrice;
  }

  /**
   * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
   * share price. For bonds, this is the percentage of par. For options, this is the per share (not
   * per contact) price. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param unitPrice the per unit price
   */
  public setUnitPrice(unitPrice: number): void {
    this.unitPrice = unitPrice;
  }

  /**
   * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
   * optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the per unit markedown price
   */
  public getMarkdown(): number {
    return this.markdown;
  }

  /**
   * Sets the portion of the unit price that is attributed to the dealer markdown. This is an
   * optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param markdown the per unit markedown price
   */
  public setMarkdown(markdown: number): void {
    this.markdown = markdown;
  }

  /**
   * Gets the transaction commission for the sale. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction commision
   */
  public getCommission(): number {
    return this.commission;
  }

  /**
   * Sets the transaction commission for the sale. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param commission the transaction commision
   */
  public setCommission(commission: number): void {
    this.commission = commission;
  }

  /**
   * Gets the taxes for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction taxes
   */
  public getTaxes(): number {
    return this.taxes;
  }

  /**
   * Sets the taxes for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param taxes the transaction taxes
   */
  public setTaxes(taxes: number): void {
    this.taxes = taxes;
  }

  /**
   * Gets the fees for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction fees
   */
  public getFees(): number {
    return this.fees;
  }

  /**
   * Sets the fees for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param fees the transaction fees
   */
  public setFees(fees: number): void {
    this.fees = fees;
  }

  /**
   * Gets the load for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the load
   */
  public getLoad(): number {
    return this.load;
  }

  /**
   * Sets the load for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param load the load
   */
  public setLoad(load: number): void {
    this.load = load;
  }

  /**
   * Gets the withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the withholding
   */
  public getWithholding(): number {
    return this.withholding;
  }

  /**
   * Sets the withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param withholding the withholding
   */
  public setWithholding(withholding: number): void {
    this.withholding = withholding;
  }

  /**
   * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return whether the transaction was tax exempt
   */
  public getTaxExempt(): boolean {
    return this.taxExempt;
  }

  /**
   * Sets whether the sale was tax exempt. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param taxExempt whether the transaction was tax exempt
   */
  public setTaxExempt(taxExempt: boolean): void {
    this.taxExempt = taxExempt;
  }

  /**
   * Gets the total for the sale. Should be equal to
   * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
   * statewithholding) according to the OFX spec. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the total
   */
  public getTotal(): number {
    return this.total;
  }

  /**
   * Sets the total for the sale. Should be equal to
   * (units * (unitPrice + markdown)) + (commision + fees + load + taxes + penalty + withholding +
   * statewithholding) according to the OFX spec. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param total the total
   */
  public setTotal(total: number): void {
    this.total = total;
  }

  /**
   * Gets the gain sale. This is aan optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the gain for the sale
   */
  public getGain(): number {
    return this.gain;
  }

  /**
   * Sets the gain sale. This is aan optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param gain the gain for the sale
   */
  public setGain(gain: number): void {
    this.gain = gain;
  }

  /**
   * Gets the currency code for the transaction. Only one of currency code or original currency
   * code should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the currency code for the transaction
   */
  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * sets the currency code for the transaction. Only one of currency code or original currency
   * code should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param currencyCode the currency code for the transaction
   */
  public setCurrencyCode(currencyCode: string): void {
    this.currencyCode = currencyCode;
    this.originalCurrencyInfo = null;
  }

  /**
   * Gets the original currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the original currency info for the transaction
   */
  public getOriginalCurrencyInfo(): OriginalCurrency {
    return this.originalCurrencyInfo;
  }

  /**
   * Sets the original currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param originalCurrencyInfo the original currency info for the transaction
   */
  public setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void {
    this.originalCurrencyInfo = originalCurrencyInfo;
    this.currencyCode = null;
  }

  /**
   * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account type
   */
  public getSubAccountSecurity(): string {
    return this.subAccountSecurity;
  }

  /**
   * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param subAccountSecurity the sub account type
   */
  public setSubAccountSecurity(subAccountSecurity: string): void {
    this.subAccountSecurity = subAccountSecurity;
  }

  /**
   * Gets the result of getSubAccountSecurity as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types.
   */
  public getSubAccountSecurityEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getSubAccountSecurity());
  }

  /**
   * Gets the sub account type that the security is being transfered from
   * (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account fund
   */
  public getSubAccountFund(): string {
    return this.subAccountFund;
  }

  /**
   * Sets the sub account type that the security is being transfered from
   * (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param subAccountFund the sub account fund
   */
  public setSubAccountFund(subAccountFund: string): void {
    this.subAccountFund = subAccountFund;
  }

  /**
   * Gets the result of getSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types
   */
  public getSubAccountFundEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getSubAccountFund());
  }

  /**
   * Gets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
   * optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the loan id
   */
  public getLoanId(): string {
    return this.loanId;
  }

  /**
   * Sets the loan id if this transaction was due to a loan or loan repayment on a 401k. This is an
   * optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param loanId the loan id
   */
  public setLoanId(loanId: string): void {
    this.loanId = loanId;
  }

  /**
   * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the state withholding
   */
  public getStateWithholding(): number {
    return this.stateWithholding;
  }

  /**
   * Sets the state withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param stateWithholding the state withholding
   */
  public setStateWithholding(stateWithholding: number): void {
    this.stateWithholding = stateWithholding;
  }

  /**
   * Gets the penalty for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the state withholding
   */
  public getPenalty(): number {
    return this.penalty;
  }

  /**
   * Sets the penalty for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param penalty the state withholding
   */
  public setPenalty(penalty: number): void {
    this.penalty = penalty;
  }

  /**
   * Gets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
   * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the 401k source
   */
  public get401kSource(): string {
    return this.inv401kSource;
  }

  /**
   * Sets the 401K source for the sale. Should be one of "PRETAX", "AFTERTAX", "MATCH",
   * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param inv401kSource the 401k source
   */
  public set401kSource(inv401kSource: string): void {
    this.inv401kSource = inv401kSource;
  }

  /**
   * Gets the 401k source as one of the well-known types.
   *
   * @return the 401k source or null if its not one of the well-known types
   */
  public get401kSourceEnum(): Inv401KSource {
    return Inv401KSource_fromOfx(this.get401kSource());
  }
}

Aggregate_add( SellInvestmentTransaction, "INVSELL" );
ChildAggregate_add(SellInvestmentTransaction, { order: 10, type: InvestmentTransaction, read: SellInvestmentTransaction.prototype.getInvestmentTransaction, write: SellInvestmentTransaction.prototype.setInvestmentTransaction });
ChildAggregate_add(SellInvestmentTransaction, { required: true, order: 20, type: SecurityId, read: SellInvestmentTransaction.prototype.getSecurityId, write: SellInvestmentTransaction.prototype.setSecurityId });
Element_add(SellInvestmentTransaction, { name: "UNITS", required: true, order: 30, type: Number, read: SellInvestmentTransaction.prototype.getUnits, write: SellInvestmentTransaction.prototype.setUnits });
Element_add(SellInvestmentTransaction, { name: "UNITPRICE", required: true, order: 40, type: Number, read: SellInvestmentTransaction.prototype.getUnitPrice, write: SellInvestmentTransaction.prototype.setUnitPrice });
Element_add(SellInvestmentTransaction, { name: "MARKDOWN", order: 50, type: Number, read: SellInvestmentTransaction.prototype.getMarkdown, write: SellInvestmentTransaction.prototype.setMarkdown });
Element_add(SellInvestmentTransaction, { name: "COMMISSION", order: 60, type: Number, read: SellInvestmentTransaction.prototype.getCommission, write: SellInvestmentTransaction.prototype.setCommission });
Element_add(SellInvestmentTransaction, { name: "TAXES", order: 70, type: Number, read: SellInvestmentTransaction.prototype.getTaxes, write: SellInvestmentTransaction.prototype.setTaxes });
Element_add(SellInvestmentTransaction, { name: "FEES", order: 80, type: Number, read: SellInvestmentTransaction.prototype.getFees, write: SellInvestmentTransaction.prototype.setFees });
Element_add(SellInvestmentTransaction, { name: "LOAD", order: 90, type: Number, read: SellInvestmentTransaction.prototype.getLoad, write: SellInvestmentTransaction.prototype.setLoad });
Element_add(SellInvestmentTransaction, { name: "WITHHOLDING", order: 93, type: Number, read: SellInvestmentTransaction.prototype.getWithholding, write: SellInvestmentTransaction.prototype.setWithholding });
Element_add(SellInvestmentTransaction, { name: "TAXEXEMPT", order: 97, type: Boolean, read: SellInvestmentTransaction.prototype.getTaxExempt, write: SellInvestmentTransaction.prototype.setTaxExempt });
Element_add(SellInvestmentTransaction, { name: "TOTAL", required: true, order: 100, type: Number, read: SellInvestmentTransaction.prototype.getTotal, write: SellInvestmentTransaction.prototype.setTotal });
Element_add(SellInvestmentTransaction, { name: "GAIN", order: 105, type: Number, read: SellInvestmentTransaction.prototype.getGain, write: SellInvestmentTransaction.prototype.setGain });
Element_add(SellInvestmentTransaction, { name: "CURRENCY", order: 110, type: String, read: SellInvestmentTransaction.prototype.getCurrencyCode, write: SellInvestmentTransaction.prototype.setCurrencyCode });
Element_add(SellInvestmentTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: SellInvestmentTransaction.prototype.getOriginalCurrencyInfo, write: SellInvestmentTransaction.prototype.setOriginalCurrencyInfo });
Element_add(SellInvestmentTransaction, { name: "SUBACCTSEC", order: 130, type: String, read: SellInvestmentTransaction.prototype.getSubAccountSecurity, write: SellInvestmentTransaction.prototype.setSubAccountSecurity });
Element_add(SellInvestmentTransaction, { name: "SUBACCTFUND", order: 140, type: String, read: SellInvestmentTransaction.prototype.getSubAccountFund, write: SellInvestmentTransaction.prototype.setSubAccountFund });
Element_add(SellInvestmentTransaction, { name: "LOANID", order: 150, type: String, read: SellInvestmentTransaction.prototype.getLoanId, write: SellInvestmentTransaction.prototype.setLoanId });
Element_add(SellInvestmentTransaction, { name: "STATEWITHHOLDING", order: 160, type: Number, read: SellInvestmentTransaction.prototype.getStateWithholding, write: SellInvestmentTransaction.prototype.setStateWithholding });
Element_add(SellInvestmentTransaction, { name: "PENALTY", order: 170, type: Number, read: SellInvestmentTransaction.prototype.getPenalty, write: SellInvestmentTransaction.prototype.setPenalty });
Element_add(SellInvestmentTransaction, { name: "INV401KSOURCE", order: 180, type: String, read: SellInvestmentTransaction.prototype.get401kSource, write: SellInvestmentTransaction.prototype.set401kSource });
