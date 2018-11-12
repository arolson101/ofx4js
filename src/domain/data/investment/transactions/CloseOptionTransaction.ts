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
import { BaseOtherInvestmentTransaction } from "./BaseOtherInvestmentTransaction";
import { TransactionWithSecurity } from "./TransactionWithSecurity";
import { SecurityId } from "../../seclist/SecurityId";
import { CloseOptionAction, CloseOptionAction_fromOfx } from "./CloseOptionAction";
import { SubAccountType, SubAccountType_fromOfx } from "../accounts/SubAccountType";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Transaction for closing an option position due to expiration, exercise, or assignment.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class CloseOptionTransaction extends BaseOtherInvestmentTransaction
    implements TransactionWithSecurity {

  private securityId: SecurityId;
  private optionAction: string;
  private units: number;
  private sharesPerContact: number;
  private subAccountSecurity: string;
  private relatedTransactionId: string;
  private gain: number;

  constructor() {
    super(TransactionType.CLOSE_OPTION);
  }

  /**
   * Gets the security id of the option.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the security id of the option
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the security id of the option.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param securityId the security id of the option
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
  }

  /**
   * Gets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the option action
   */
  public getOptionAction(): string {
    return this.optionAction;
  }

  /**
   * Sets the action being performed (i.e. "EXERCISE", "ASSIGN", "EXPIRE" This is a required field
   * according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param optionAction the option action
   */
  public setOptionAction(optionAction: string): void {
    this.optionAction = optionAction;
  }

  /**
   * Gets the action as one of the well-known types.
   *
   * @return the type of close or null if it's not a well-known type
   */
  public getOptionActionEnum(): CloseOptionAction {
    return  CloseOptionAction_fromOfx(this.getOptionAction());
  }

  /**
   * Gets the number of units of the option that were closed. This is a required field according
   * to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the number of units closed
   */
  public getUnits(): number {
    return this.units;
  }

  /**
   * Sets the number of units of the option that were closed. This is a required field according
   * to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param units the number of units closed
   */
  public setUnits(units: number): void {
    this.units = units;
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
   * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sub account type
   */
  public getSubAccountSecurity(): string {
    return this.subAccountSecurity;
  }

  /**
   * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param subAccountSecurity the sub account type
   */
  public setSubAccountSecurity(subAccountSecurity: string): void {
    this.subAccountSecurity = subAccountSecurity;
  }

  /**
   * Gets the result of getSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types
   */
  public getSubAccountSecurityEnum(): SubAccountType {
    return SubAccountType_fromOfx(this.getSubAccountSecurity());
  }

  /**
   * Gets the related transaction id for the related buy or sell corresponding to the
   * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
   * action or EXERCISE or ASSIGN.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the related transaction id
   */
  public getRelatedTransactionId(): string {
    return this.relatedTransactionId;
  }

  /**
   * Sets the related transaction id for the related buy or sell corresponding to the
   * EXERCISE or ASSIGN action. This is a required field according to the OFX spec if the
   * action or EXERCISE or ASSIGN.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param relatedTransactionId the related transaction id
   */
  public setRelatedTransactionId(relatedTransactionId: string): void {
    this.relatedTransactionId = relatedTransactionId;
  }

  /**
   * Gets the gain related to the transaction. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the gain related to the transaction
   */
  public getGain(): number {
    return this.gain;
  }

  /**
   * Sets the gain related to the transaction. This is an optional field according to the OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param gain the gain related to the transaction
   */
  public setGain(gain: number): void {
    this.gain = gain;
  }
}

Aggregate_add( CloseOptionTransaction, "CLOSUREOPT" );
ChildAggregate_add(CloseOptionTransaction, { order: 20, type: SecurityId, read: CloseOptionTransaction.prototype.getSecurityId, write: CloseOptionTransaction.prototype.setSecurityId });
Element_add(CloseOptionTransaction, { name: "OPTACTION", required: true, order: 30, type: String, read: CloseOptionTransaction.prototype.getOptionAction, write: CloseOptionTransaction.prototype.setOptionAction });
Element_add(CloseOptionTransaction, { name: "UNITS", required: true, order: 40, type: Number, read: CloseOptionTransaction.prototype.getUnits, write: CloseOptionTransaction.prototype.setUnits });
Element_add(CloseOptionTransaction, { name: "SHPERCTRCT", required: true, order: 50, type: Number, read: CloseOptionTransaction.prototype.getSharesPerContact, write: CloseOptionTransaction.prototype.setSharesPerContact });
Element_add(CloseOptionTransaction, { name: "SUBACCTSEC", required: true, order: 60, type: String, read: CloseOptionTransaction.prototype.getSubAccountSecurity, write: CloseOptionTransaction.prototype.setSubAccountSecurity });
Element_add(CloseOptionTransaction, { name: "RELFITID", order: 70, type: String, read: CloseOptionTransaction.prototype.getRelatedTransactionId, write: CloseOptionTransaction.prototype.setRelatedTransactionId });
Element_add(CloseOptionTransaction, { name: "GAIN", order: 80, type: Number, read: CloseOptionTransaction.prototype.getGain, write: CloseOptionTransaction.prototype.setGain });
