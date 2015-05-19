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
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../investment/accounts/SubAccountType'/>
///<reference path='BaseOtherInvestmentTransaction'/>

module ofx4js.domain.data.investment.transactions {

import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
import SubAccountType_fromOfx = ofx4js.domain.data.investment.accounts.SubAccountType_fromOfx;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Transaction for journal fund transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class JournalFundTransaction extends BaseOtherInvestmentTransaction {

  private subAccountFrom: string;
  private subAccountTo: string;
  private total: number;

  constructor() {
    super(TransactionType.JOURNAL_FUND);
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
   * Sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
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

Aggregate_add( JournalFundTransaction, "JRNLFUND" );
Element_add(JournalFundTransaction, { name: "SUBACCTFROM", order: 20, type: String, read: JournalFundTransaction.prototype.getFromSubAccountFund, write: JournalFundTransaction.prototype.setFromSubAccountFund });
Element_add(JournalFundTransaction, { name: "SUBACCTTO", order: 30, type: String, read: JournalFundTransaction.prototype.getToSubAccountFund, write: JournalFundTransaction.prototype.setToSubAccountFund });
Element_add(JournalFundTransaction, { name: "TOTAL", order: 40, type: Number, read: JournalFundTransaction.prototype.getTotal, write: JournalFundTransaction.prototype.setTotal });

}
