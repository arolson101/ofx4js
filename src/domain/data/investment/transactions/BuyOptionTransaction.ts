import { InvestmentTransactionType } from "./TransactionType";
import { BaseBuyInvestmentTransaction } from "./BaseBuyInvestmentTransaction";
import { OptionBuyType, OptionBuyType_fromOfx } from "./OptionBuyType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for buying options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 */
export class BuyOptionTransaction extends BaseBuyInvestmentTransaction {

  private optionBuyType: string;
  private sharesPerContact: number;

  constructor() {
    super(InvestmentTransactionType.BUY_OPTION);
  }

  /**
   * Gets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the option buy type
   */
  public getOptionBuyType(): string {
    return this.optionBuyType;
  }

  /**
   * Sets the type of option purchase (i.e. "BUYTOOPEN" or "BUYTOCLOSE"). This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param optionBuyType the option buy type
   */
  public setOptionBuyType(optionBuyType: string): void {
    this.optionBuyType = optionBuyType;
  }

  /**
   * Gets the option buy type as one of the well-known types.
   *
   * @return the type of purchase or null if it's not known
   */
  public getOptionBuyTypeEnum(): OptionBuyType {
    return OptionBuyType_fromOfx(this.optionBuyType);
  }

  /**
   * Gets the number of shares per contact. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the number of shares per contact
   */
  public getSharesPerContract(): number {
    return this.sharesPerContact;
  }

  /**
   * Sets the number of shares per contact. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param sharesPerContact the number of shares per contact
   */
  public setSharesPerContract(sharesPerContact: number): void {
    this.sharesPerContact = sharesPerContact;
  }
}

Aggregate_add( BuyOptionTransaction, "BUYOPT" );
Element_add(BuyOptionTransaction, { name: "OPTBUYTYPE", required: true, order: 20, type: String, read: BuyOptionTransaction.prototype.getOptionBuyType, write: BuyOptionTransaction.prototype.setOptionBuyType });
Element_add(BuyOptionTransaction, { name: "SHPERCTRCT", required: true, order: 30, type: Number, read: BuyOptionTransaction.prototype.getSharesPerContract, write: BuyOptionTransaction.prototype.setSharesPerContract });
