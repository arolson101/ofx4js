import { BaseSellInvestmentTransaction } from "./BaseSellInvestmentTransaction";
import { InvestmentTransactionType } from "./TransactionType";
import { OptionSellType, OptionSellType_fromOfx } from "./OptionSellType";
import { RelatedOptionType, RelatedOptionType_fromOfx } from "./RelatedOptionType";
import { ShortOptionSecurity, ShortOptionSecurity_fromOfx } from "../positions/ShortOptionSecurity";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for selling options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class SellOptionTransaction extends BaseSellInvestmentTransaction {

  private optionSellType: string;
  private sharesPerContact: number;
  private relatedTransactionId: string;
  private relatedType: string;
  private secured: string;

  constructor() {
    super(InvestmentTransactionType.SELL_OPTION);
  }

  /**
   * Gets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the option sell type
   */
  public getOptionSellType(): string {
    return this.optionSellType;
  }

  /**
   * Sets the type of option sale (i.e. "SELLTOCLOSE" or "SELLTOOPEN"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param optionSellType the option sell type
   */
  public setOptionSellType(optionSellType: string): void {
    this.optionSellType = optionSellType;
  }

  /**
   * Gets the option sell type as one of the well-known types.
   *
   * @return the type of sale or null if it's not known.
   */
  public getOptionSellTypeEnum(): OptionSellType {
    return OptionSellType_fromOfx(this.optionSellType);
  }

  /**
   * Gets the number of shares per contact. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the number of shares per contact
   */
  public getSharesPerContact(): number {
    return this.sharesPerContact;
  }

  /**
   * Sets the number of shares per contact. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sharesPerContact the number of shares per contact
   */
  public setSharesPerContact(sharesPerContact: number): void {
    this.sharesPerContact = sharesPerContact;
  }

  /**
   * Gets a related transaction for the option sale for complex option transactions. This
   * is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return The related transaction id
   */
  public getRelatedTransactionId(): string {
    return this.relatedTransactionId;
  }

  /**
   * Sets a related transaction for the option sale for complex option transactions. This
   * is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param relatedTransactionId The related transaction id
   */
  public setRelatedTransactionId(relatedTransactionId: string): void {
    this.relatedTransactionId = relatedTransactionId;
  }

  /**
   * Gets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
   * is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return The related tansaction type
   */
  public getRelatedType(): string {
    return this.relatedType;
  }

  /**
   * Sets the type for the related transaction. One of "SPREAD", "STRADDLE", "NONE", "OTHER". This
   * is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param relatedType The related tansaction type
   */
  public setRelatedType(relatedType: string): void {
    this.relatedType = relatedType;
  }

  /**
   * Gets the related transaction as one of the well-known types.
   *
   * @return the related tansaction type or null if it's not well known
   */
  public getRelatedTypeEnum(): RelatedOptionType {
    return RelatedOptionType_fromOfx(this.getRelatedType());
  }

  /**
   * Gets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return how the option sale is secured
   */
  public getSecured(): string {
    return this.secured;
  }

  /**
   * Sets how the option sale is secured. One of "NAKED" or "COVERED". This is an optional field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param secured how the option sale is secured
   */
  public setSecured(secured: string): void {
    this.secured = secured;
  }

  /**
   * Gets how the option sale is secured as one of the well-known types.
   *
   * @return the type indicating how the option is secured or null if it's not well known.
   */
  public getSecuredEnum(): ShortOptionSecurity {
    return ShortOptionSecurity_fromOfx(this.getSecured());
  }
}

Aggregate_add( SellOptionTransaction, "SELLOPT" );
Element_add(SellOptionTransaction, { name: "OPTSELLTYPE", required: true, order: 20, type: String, read: SellOptionTransaction.prototype.getOptionSellType, write: SellOptionTransaction.prototype.setOptionSellType });
Element_add(SellOptionTransaction, { name: "SHPERCTRCT", required: true, order: 30, type: Number, read: SellOptionTransaction.prototype.getSharesPerContact, write: SellOptionTransaction.prototype.setSharesPerContact });
Element_add(SellOptionTransaction, { name: "RELFITID", order: 40, type: String, read: SellOptionTransaction.prototype.getRelatedTransactionId, write: SellOptionTransaction.prototype.setRelatedTransactionId });
Element_add(SellOptionTransaction, { name: "RELTYPE", order: 50, type: String, read: SellOptionTransaction.prototype.getRelatedType, write: SellOptionTransaction.prototype.setRelatedType });
Element_add(SellOptionTransaction, { name: "SECURED", order: 60, type: String, read: SellOptionTransaction.prototype.getSecured, write: SellOptionTransaction.prototype.setSecured });
