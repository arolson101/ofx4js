import { InvestmentTransactionType } from "./TransactionType";
import { BaseOtherInvestmentTransaction } from "./BaseOtherInvestmentTransaction";
import { TransactionWithSecurity } from "./TransactionWithSecurity";
import { SecurityId } from "../../seclist/SecurityId";
import { OriginalCurrency } from "./OriginalCurrency";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Inv401KSource, Inv401KSource_fromOfx } from "../positions/Inv401KSource";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for return of capital transactions.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class ReturnOfCapitalTransaction extends BaseOtherInvestmentTransaction
    implements TransactionWithSecurity {

  private securityId: SecurityId;
  private total: number;
  private subAccountSecurity: string;
  private subAccountFund: string;
  private currencyCode: string;
  private originalCurrencyInfo: OriginalCurrency;
  private inv401kSource: string;

  constructor() {
    super(InvestmentTransactionType.RETURN_OF_CAPITAL);
  }

  /**
   * Gets the id of the security that capital was returned from. This is a required field according
   * to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security that capital was returned from
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the id of the security that capital was returned from. This is a required field according
   * to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param securityId the security id of the security that capital was returned from
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
  }

  /**
   * Gets the total amount of capital returned. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the total
   */
  public getTotal(): number {
    return this.total;
  }

  /**
   * Sets the total amount of capital returned. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param total the total
   */
  public setTotal(total: number): void {
    this.total = total;
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
   * Gets the sub account type that the transaction affects.
   * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the sub account fund
   */
  public getSubAccountFund(): string {
    return this.subAccountFund;
  }

  /**
   * Sets the sub account type that the transaction affects.
   * (e.g. CASH, MARGIN, SHORT, OTHER). This is a required field according to the OFX spec.
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
   * Gets the currency code for the transaction. Only one of currency code or original currency
   * info should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the currency code for the transaction
   */
  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * Sets the currency code for the transaction. Only one of currency code or original currency
   * info should be set according to the OFX spec. If neither are set, means the default currency.
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
   * @return the currency code for the transaction.
   */
  public getOriginalCurrencyInfo(): OriginalCurrency {
    return this.originalCurrencyInfo;
  }

  /**
   * Sets the original currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param originalCurrencyInfo the currency code for the transaction.
   */
  public setOriginalCurrencyInfo(originalCurrencyInfo: OriginalCurrency): void {
    this.originalCurrencyInfo = originalCurrencyInfo;
    this.currencyCode = null;
  }

  /**
   * Gets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
   * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the state withholding
   */
  public get401kSource(): string {
    return this.inv401kSource;
  }

  /**
   * Sets the 401K source for the reinvestment. Should be one of "PRETAX", "AFTERTAX", "MATCH",
   * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param inv401kSource the state withholding
   */
  public set401kSource(inv401kSource: string): void {
    this.inv401kSource = inv401kSource;
  }

  /**
   * Gets the 401(k) source as one of the well-known types.
   *
   * @return the type of close or null if it's not well known.
   */
  public get401kSourceEnum(): Inv401KSource {
    return Inv401KSource_fromOfx(this.get401kSource());
  }
}

Aggregate_add( ReturnOfCapitalTransaction, "RETOFCAP" );
ChildAggregate_add(ReturnOfCapitalTransaction, { required: true, order: 20, type: SecurityId, read: ReturnOfCapitalTransaction.prototype.getSecurityId, write: ReturnOfCapitalTransaction.prototype.setSecurityId });
Element_add(ReturnOfCapitalTransaction, { name: "TOTAL", required: true, order: 40, type: Number, read: ReturnOfCapitalTransaction.prototype.getTotal, write: ReturnOfCapitalTransaction.prototype.setTotal });
Element_add(ReturnOfCapitalTransaction, { name: "SUBACCTSEC", order: 50, type: String, read: ReturnOfCapitalTransaction.prototype.getSubAccountSecurity, write: ReturnOfCapitalTransaction.prototype.setSubAccountSecurity });
Element_add(ReturnOfCapitalTransaction, { name: "SUBACCTFUND", order: 140, type: String, read: ReturnOfCapitalTransaction.prototype.getSubAccountFund, write: ReturnOfCapitalTransaction.prototype.setSubAccountFund });
Element_add(ReturnOfCapitalTransaction, { name: "CURRENCY", order: 110, type: String, read: ReturnOfCapitalTransaction.prototype.getCurrencyCode, write: ReturnOfCapitalTransaction.prototype.setCurrencyCode });
Element_add(ReturnOfCapitalTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: ReturnOfCapitalTransaction.prototype.getOriginalCurrencyInfo, write: ReturnOfCapitalTransaction.prototype.setOriginalCurrencyInfo });
Element_add(ReturnOfCapitalTransaction, { name: "INV401KSOURCE", order: 180, type: String, read: ReturnOfCapitalTransaction.prototype.get401kSource, write: ReturnOfCapitalTransaction.prototype.set401kSource });
