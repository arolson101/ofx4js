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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='BaseBuyInvestmentTransaction'/>
///<reference path='OptionBuyType'/>

module ofx4js.domain.data.investment.transactions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Transaction for buying options.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class BuyOptionTransaction extends BaseBuyInvestmentTransaction {

  private optionBuyType: string;
  private sharesPerContact: number;

  constructor() {
    super(TransactionType.BUY_OPTION);
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

}
