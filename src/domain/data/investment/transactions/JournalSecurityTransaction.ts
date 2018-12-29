import { InvestmentTransactionType } from "./TransactionType";
import { BaseOtherInvestmentTransaction } from "./BaseOtherInvestmentTransaction";
import { TransactionWithSecurity } from "./TransactionWithSecurity";
import { SecurityId } from "../../seclist/SecurityId";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class JournalSecurityTransaction extends BaseOtherInvestmentTransaction
    implements TransactionWithSecurity {

  private securityId: SecurityId;
  private subAccountFrom: string;
  private subAccountTo: string;
  private total: number;

  constructor() {
    super(InvestmentTransactionType.JOURNAL_SECURITY);
  }

  /**
   * Gets the id of the security that was transferred. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security that was bought
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the id of the security that was transferred. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param securityId the security id of the security that was bought
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
  }

  /**
   * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sub account type
   */
  public getFromSubAccountFund(): string {
    return this.subAccountFrom;
  }

  /**
   * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param subAccountFrom the sub account type
   */
  public setFromSubAccountFund(subAccountFrom: string): void {
    this.subAccountFrom = subAccountFrom;
  }

  /**
   * Gets the result of getFromSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types.
   */
  public getFromSubAccountFundEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getFromSubAccountFund());
  }

  /**
   * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sub account fund
   */
  public getToSubAccountFund(): string {
    return this.subAccountTo;
  }

  /**
   * sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param subAccountTo the sub account fund
   */
  public setToSubAccountFund(subAccountTo: string): void {
    this.subAccountTo = subAccountTo;
  }

  /**
   * Gets the result of getToSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types.
   */
  public getToSubAccountFundEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getToSubAccountFund());
  }

  /**
   * Gets the total for the transaction.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the total
   */
  public getTotal(): number {
    return this.total;
  }

  /**
   * Sets the total for the transaction.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param total the total
   */
  public setTotal(total: number): void {
    this.total = total;
  }
}

Aggregate_add( JournalSecurityTransaction, "JRNLSEC" );
ChildAggregate_add(JournalSecurityTransaction, { required: true, order: 20, type: SecurityId, read: JournalSecurityTransaction.prototype.getSecurityId, write: JournalSecurityTransaction.prototype.setSecurityId });
Element_add(JournalSecurityTransaction, { name: "SUBACCTFROM", order: 30, type: String, read: JournalSecurityTransaction.prototype.getFromSubAccountFund, write: JournalSecurityTransaction.prototype.setFromSubAccountFund });
Element_add(JournalSecurityTransaction, { name: "SUBACCTTO", order: 40, type: String, read: JournalSecurityTransaction.prototype.getToSubAccountFund, write: JournalSecurityTransaction.prototype.setToSubAccountFund });
Element_add(JournalSecurityTransaction, { name: "TOTAL", order: 50, type: Number, read: JournalSecurityTransaction.prototype.getTotal, write: JournalSecurityTransaction.prototype.setTotal });
