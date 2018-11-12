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
import { TransactionType } from "./TransactionType";
import { BaseInvestmentTransaction } from "./BaseInvestmentTransaction";
import { TransactionWithSecurity } from "./TransactionWithSecurity";
import { SellInvestmentTransaction } from "./SellInvestmentTransaction";
import { InvestmentTransaction } from "./InvestmentTransaction";
import { SecurityId } from "../../seclist/SecurityId";
import { OriginalCurrency } from "./OriginalCurrency";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Inv401KSource, Inv401KSource_fromOfx } from "../positions/Inv401KSource";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Base class for all investment transactions for selling securities.
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all sell investment transactions as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
export abstract class BaseSellInvestmentTransaction extends BaseInvestmentTransaction
    implements TransactionWithSecurity {

  private sellInvestment: SellInvestmentTransaction;

  constructor(transactionType: TransactionType) {
    super(transactionType);
  }

  /**
   * Gets the sell investment transaction child aggregate.
   *
   * @return the sell investment transaction child aggregate
   */
  // @Override
  public getSellInvestment(): SellInvestmentTransaction {
    return this.sellInvestment;
  }

  /**
   * Sets the sell investment transaction child aggregate.
   *
   * @param sellInvestment the sell investment transaction child aggregate
   */
  public setSellInvestment(sellInvestment: SellInvestmentTransaction): void {
    this.sellInvestment = sellInvestment;
  }

  /**
   * Gets the investment transaction aggregate.
   *
   * @return the investment transaction aggregate
   */
  // @Overridden
  public getInvestmentTransaction(): InvestmentTransaction {
    return this.getSellInvestment().getInvestmentTransaction();
  }

  /**
   * Gets the id of the security that was sold. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security that was bought
   */
  public getSecurityId(): SecurityId {
    return this.getSellInvestment().getSecurityId();
  }

  /**
   * Gets the number of units of the security that was sold. For security-based actions other
   * than stock splits, this is the quantity sold. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the number of units purchased.
   */
  public getUnits(): number {
    return this.getSellInvestment().getUnits();
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
    return this.getSellInvestment().getUnitPrice();
  }

  /**
   * Gets the portion of the unit price that is attributed to the dealer markdown. This is an
   * optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the per unit markedown price
   */
  public getMarkdown(): number {
    return this.getSellInvestment().getMarkdown();
  }

  /**
   * Gets the transaction commission for the sale. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction commision
   */
  public getCommission(): number {
    return this.getSellInvestment().getCommission();
  }

  /**
   * Gets the taxes for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction taxes
   */
  public getTaxes(): number {
    return this.getSellInvestment().getTaxes();
  }

  /**
   * Gets the fees for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the transaction fees
   */
  public getFees(): number {
    return this.getSellInvestment().getFees();
  }

  /**
   * Gets the load for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the load
   */
  public getLoad(): number {
    return this.getSellInvestment().getLoad();
  }

  /**
   * Gets the withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the withholding
   */
  public getWithholding(): number {
    return this.getSellInvestment().getWithholding();
  }

  /**
   * Gets whether the sale was tax exempt. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return whether the transaction was tax exempt
   */
  public getTaxExempt(): boolean {
    return this.getSellInvestment().getTaxExempt();
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
    return this.getSellInvestment().getTotal();
  }

  /**
   * Gets the gain sale. This is aan optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the gain for the sale
   */
  public getGain(): number {
    return this.getSellInvestment().getGain();
  }

  /**
   * Gets the currency code for the transaction. Only one of currency code or original currency
   * info should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the currency code for the transaction.
   */
  public getCurrencyCode(): string {
    return this.getSellInvestment().getCurrencyCode();
  }

  /**
   * Gets the origianl currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the currency info for the transaction.
   */
  public getOriginalCurrencyInfo(): OriginalCurrency {
    return this.getSellInvestment().getOriginalCurrencyInfo();
  }

  /**
   * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account type
   */
  public getSubAccountSecurity(): string {
    return this.getSellInvestment().getSubAccountSecurity();
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
   * Gets the sub account type that the money went to  (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account fund
   */
  public getSubAccountFund(): string {
    return this.getSellInvestment().getSubAccountFund();
  }

  /**
   * Gets the result of getSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types.
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
  public getLoadId(): string {
    return this.getSellInvestment().getLoanId();
  }

  /**
   * Gets the state withholding for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the state withholding
   */
  public getStateWithholding(): number {
    return this.getSellInvestment().getStateWithholding();
  }

  /**
   * Gets the penalty for the sale. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the state withholding
   */
  public getPenalty(): number {
    return this.getSellInvestment().getPenalty();
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
    return this.getSellInvestment().get401kSource();
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

ChildAggregate_add(BaseSellInvestmentTransaction, { order: 10, type: SellInvestmentTransaction, read: BaseSellInvestmentTransaction.prototype.getSellInvestment, write: BaseSellInvestmentTransaction.prototype.setSellInvestment });
