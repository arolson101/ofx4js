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
import {BaseOtherInvestmentTransaction} from "BaseOtherInvestmentTransaction";
import {TransactionType} from "TransactionType";
import {TransferAction, TransferAction_fromOfx} from "TransferAction";
import {SubAccountType, SubAccountType_fromOfx} from "../accounts/SubAccountType";
import {Inv401KSource, Inv401KSource_fromOfx} from "../positions/Inv401KSource";
import {PositionType, PositionType_fromOfx} from "../positions/PositionType";
import {SecurityId} from "../../seclist/SecurityId";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Transaction for transfers.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class TransferInvestmentTransaction extends BaseOtherInvestmentTransaction {

  private securityId: SecurityId;
  private subAccountSecurity: string;
  private units: number;
  private transferAction: string;
  private positionType: string;
  private averageCostBasis: number;
  private unitPrice: number;
  private purchaseDate: Date;
  private inv401kSource: string;

  // TODO (jonp) -- INVACCTFROM

  constructor() {
    super(TransactionType.TRANSFER);
  }

  /**
   * Gets the id of the security that was transferred. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the security id of the security that was transferred
   */
  public getSecurityId(): SecurityId {
    return this.securityId;
  }

  /**
   * Sets the id of the security that was transferred. This is a required field according to the OFX
   * spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param securityId the security id of the security that was transferred
   */
  public setSecurityId(securityId: SecurityId): void {
    this.securityId = securityId;
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
   * Gets the number of units of the security that was transferred. For security-based actions other
   * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the number of units transferred
   */
  public getUnits(): number {
    return this.units;
  }

  /**
   * Sets the number of units of the security that was transferred. For security-based actions other
   * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
   * is the number of shares. For bonds, this is the face value. For options, this is the number of
   * contacts. This is a required field according to the OFX spec.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param units the number of units transferred
   */
  public setUnits(units: number): void {
    this.units = units;
  }

  /**
   * Gets the type of transfer. One of "IN" or "OUT". This is a required field according to the
   * OFX spec.
   *
   * @return the type of transfer
   */
  public getTransferAction(): string {
    return this.transferAction;
  }

  /**
   * Sets the type of transfer. One of "IN" or "OUT". This is a required field according to the
   * OFX spec.
   *
   * @param transferAction the type of transfer
   */
  public setTransferAction(transferAction: string): void {
    this.transferAction = transferAction;
  }

  /**
   * Gets the transfer action as one of the well-known types.
   *
   * @return the type of transfer or null if it's not well known
   */
  public getTransferActionEnum(): TransferAction {
    return TransferAction_fromOfx(this.getTransferAction());
  }

  /**
   * Gets the type of position. One of "LONG" or "SHORT". This is a required field according to the
   * OFX spec.
   *
   * @return the position type
   */
  public getPositionType(): string {
    return this.positionType;
  }

  /**
   * Sets the type of position. One of "LONG" or "SHORT". This is a required field according to the
   * OFX spec.
   *
   * @param positionType the position type
   */
  public setPositionType(positionType: string): void {
    this.positionType = positionType;
  }

  /**
   * Gets the position type as one of the well-known types.
   *
   * @return the position type or null if it's not well known
   */
  public getPositionTypeEnum(): PositionType {
    return PositionType_fromOfx(this.getPositionType());
  }

  /**
   * Gets the average cost basis for the securities being transfered. This is an optional field
   * according to the ofx spec.
   *
   * @return the average cost basis
   */
  public getAverageCostBasis(): number {
    return this.averageCostBasis;
  }

  /**
   * Sets the average cost basis for the securities being transfered. This is an optional field
   * according to the ofx spec.
   *
   * @param averageCostBasis the average cost basis
   */
  public setAverageCostBasis(averageCostBasis: number): void {
    this.averageCostBasis = averageCostBasis;
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
   * Gets the original date of purchase for the securities. This is an optional field according to
   * the ofx spec.
   *
   * @return the original date of purchase
   */
  public getPurchaseDate(): Date {
    return this.purchaseDate;
  }

  /**
   * Sets the original date of purchase for the securities. This is an optional field according to
   * the ofx spec.
   *
   * @param purchaseDate the original date of purchase
   */
  public setPurchaseDate(purchaseDate: Date): void {
    this.purchaseDate = purchaseDate;
  }

  /**
   * Gets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
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
   * Sets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
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

Aggregate_add(TransferInvestmentTransaction, "TRANSFER");
ChildAggregate_add(TransferInvestmentTransaction, { required: true, order: 20, type: SecurityId, read: TransferInvestmentTransaction.prototype.getSecurityId, write: TransferInvestmentTransaction.prototype.setSecurityId });
Element_add(TransferInvestmentTransaction, { name: "SUBACCTSEC", order: 30, type: String, read: TransferInvestmentTransaction.prototype.getSubAccountSecurity, write: TransferInvestmentTransaction.prototype.setSubAccountSecurity });
Element_add(TransferInvestmentTransaction, { name: "UNITS", required: true, order: 40, type: Number, read: TransferInvestmentTransaction.prototype.getUnits, write: TransferInvestmentTransaction.prototype.setUnits });
Element_add(TransferInvestmentTransaction, { name: "TFERACTION", required: true, order: 50, type: String, read: TransferInvestmentTransaction.prototype.getTransferAction, write: TransferInvestmentTransaction.prototype.setTransferAction });
Element_add(TransferInvestmentTransaction, { name: "POSTYPE", required: true, order: 60, type: String, read: TransferInvestmentTransaction.prototype.getPositionType, write: TransferInvestmentTransaction.prototype.setPositionType });
Element_add(TransferInvestmentTransaction, { name: "AVGCOSTBASIS", order: 70, type: Number, read: TransferInvestmentTransaction.prototype.getAverageCostBasis, write: TransferInvestmentTransaction.prototype.setAverageCostBasis });
Element_add(TransferInvestmentTransaction, { name: "UNITPRICE", required: true, order: 80, type: Number, read: TransferInvestmentTransaction.prototype.getUnitPrice, write: TransferInvestmentTransaction.prototype.setUnitPrice });
Element_add(TransferInvestmentTransaction, { name: "DTPURCHASE", order: 90, type: Date, read: TransferInvestmentTransaction.prototype.getPurchaseDate, write: TransferInvestmentTransaction.prototype.setPurchaseDate });
Element_add(TransferInvestmentTransaction, { name: "INV401KSOURCE", order: 100, type: String, read: TransferInvestmentTransaction.prototype.get401kSource, write: TransferInvestmentTransaction.prototype.set401kSource });


