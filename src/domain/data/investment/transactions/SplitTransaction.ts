import { BaseOtherInvestmentTransaction } from "./BaseOtherInvestmentTransaction";
import { SecurityId } from "../../seclist/SecurityId";
import { OriginalCurrency } from "./OriginalCurrency";
import { InvestmentTransactionType } from "./TransactionType";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Inv401KSource, Inv401KSource_fromOfx } from "../positions/Inv401KSource";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for a stock split.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SplitTransaction extends BaseOtherInvestmentTransaction {
  private securityId: SecurityId;
  private subAccountSecurity: string;
  private oldUnits: number;
  private newUnits: number;
  private numerator: number;
  private denominator: number;
  private currencyCode: string;
  private originalCurrencyInfo: OriginalCurrency;
  private cashForFractionalUnits: number;
  private subAccountFund: string;
  private inv401kSource: string;

  constructor() {
    super(InvestmentTransactionType.SPLIT);
  }

  /**
   * Gets the id of the security for the split. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security for the expsense
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the id of the security for the split. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param securityId the security id of the security for the expsense
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
  }

  /**
   * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
   * required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account type
   */
  public getSubAccountSecurity(): string {
    return this.subAccountSecurity;
  }

  /**
   * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER). This is a
   * required field according to the OFX spec.
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
   * Gets the old number of units for the split. This is a required field according to the OFX
   * spec.
   *
   * @return the old number of units.
   */
  public getOldUnits(): number {
    return this.oldUnits;
  }

  /**
   * Sets the old number of units for the split. This is a  equired field according to the OFX
   * spec.
   *
   * @param oldUnits the old number of units.
   */
  public setOldUnits(oldUnits: number): void {
    this.oldUnits = oldUnits;
  }

  /**
   * Gets the new number of units for the split. This is a required field according to the OFX
   * spec.
   *
   * @return the new number of units.
   */
  public getNewUnits(): number {
    return this.newUnits;
  }

  /**
   * Sets the new number of units for the split. This is a required field according to the OFX
   * spec.
   *
   * @param newUnits the new number of units.
   */
  public setNewUnits(newUnits: number): void {
    this.newUnits = newUnits;
  }

  /**
   * Gets the numerator for the split ratio. This is a required field according to the OFX spec.
   *
   * @return the numerator for the split ratio
   */
  public getNumerator(): number {
    return this.numerator;
  }

  /**
   * Sets the numerator for the split ratio. This is a required field according to the OFX spec.
   *
   * @param numerator the numerator for the split ratio
   */
  public setNumerator(numerator: number): void {
    this.numerator = numerator;
  }

  /**
   * Gets the denominator for the split ratio. This is a required field according to the OFX spec.
   *
   * @return the numerator for the split ratio
   */
  public getDenominator(): number {
    return this.denominator;
  }

  /**
   * Sets the denominator for the split ratio. This is a required field according to the OFX spec.
   *
   * @param denominator the numerator for the split ratio
   */
  public setDenominator(denominator: number): void {
    this.denominator = denominator;
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
   * @return the currency code for the transaction
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
   * @return the original currency info for the transaction
   */
  public setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void {
    this.originalCurrencyInfo = originalCurrencyInfo;
    this.currencyCode = null;
  }

  /**
   * Gets the cash for fractional units.
   *
   * @return the cash for fractional units
   */
  public getCashForFractionalUnits(): number {
    return this.cashForFractionalUnits;
  }

  /**
   * Sets the cash for fractional units.
   *
   * @param cashForFractionalUnits the cash for fractional units
   */
  public setCashForFractionalUnits(cashForFractionalUnits: number): void {
    this.cashForFractionalUnits = cashForFractionalUnits;
  }

  /**
   * Gets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account fund
   */
  public getSubAccountFund(): string {
    return this.subAccountFund;
  }

  /**
   * Sets the sub account type for the fund. (e.g. CASH, MARGIN, SHORT, OTHER).
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
   * Gets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
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
   * Sets the 401K source for the transaction. Should be one of "PRETAX", "AFTERTAX", "MATCH",
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

Aggregate_add( SplitTransaction, "SPLIT" );
ChildAggregate_add(SplitTransaction, { required: true, order: 20, type: SecurityId, read: SplitTransaction.prototype.getSecurityId, write: SplitTransaction.prototype.setSecurityId });
Element_add(SplitTransaction, { name: "SUBACCTSEC", order: 30, type: String, read: SplitTransaction.prototype.getSubAccountSecurity, write: SplitTransaction.prototype.setSubAccountSecurity });
Element_add(SplitTransaction, { name: "OLDUNITS", order: 40, type: Number, read: SplitTransaction.prototype.getOldUnits, write: SplitTransaction.prototype.setOldUnits });
Element_add(SplitTransaction, { name: "NEWUNITS", order: 50, type: Number, read: SplitTransaction.prototype.getNewUnits, write: SplitTransaction.prototype.setNewUnits });
Element_add(SplitTransaction, { name: "NUMERATOR", order: 60, type: Number, read: SplitTransaction.prototype.getNumerator, write: SplitTransaction.prototype.setNumerator });
Element_add(SplitTransaction, { name: "DENOMINATOR", order: 70, type: Number, read: SplitTransaction.prototype.getDenominator, write: SplitTransaction.prototype.setDenominator });
Element_add(SplitTransaction, { name: "CURRENCY", order: 80, type: String, read: SplitTransaction.prototype.getCurrencyCode, write: SplitTransaction.prototype.setCurrencyCode });
Element_add(SplitTransaction, { name: "ORIGCURRENCY", order: 90, type: OriginalCurrency, read: SplitTransaction.prototype.getOriginalCurrencyInfo, write: SplitTransaction.prototype.setOriginalCurrencyInfo });
Element_add(SplitTransaction, { name: "FRACCASH", order: 100, type: Number, read: SplitTransaction.prototype.getCashForFractionalUnits, write: SplitTransaction.prototype.setCashForFractionalUnits });
Element_add(SplitTransaction, { name: "SUBACCTFUND", order: 110, type: String, read: SplitTransaction.prototype.getSubAccountFund, write: SplitTransaction.prototype.setSubAccountFund });
Element_add(SplitTransaction, { name: "INV401KSOURCE", order: 120, type: String, read: SplitTransaction.prototype.get401kSource, write: SplitTransaction.prototype.set401kSource });
