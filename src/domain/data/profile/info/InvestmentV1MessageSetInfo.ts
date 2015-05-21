/*
 * Copyright 2008 Web Cohesion
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
///<reference path='../../profile/VersionSpecificMessageSetInfo'/>

module ofx4js.domain.data.profile.info {

import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @see "Section 13.7.1.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
export class InvestmentV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private supportsStatementsDownload: boolean;
  private supportsOpenOrdersDownload: boolean;
  private supportsPositionsDownload: boolean;
  private supportsBalanceDownload: boolean;
  private supportsEmail: boolean;
  private supports401kInformation: boolean;
  private supportsClosingStatements: boolean;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.investment;
  }

  public getSupportsStatementsDownload(): boolean {
    return this.supportsStatementsDownload;
  }

  public setSupportsStatementsDownload(supportsStatementsDownload: boolean): void {
    this.supportsStatementsDownload = supportsStatementsDownload;
  }

  public getSupportsOpenOrdersDownload(): boolean {
    return this.supportsOpenOrdersDownload;
  }

  public setSupportsOpenOrdersDownload(supportsOpenOrdersDownload: boolean): void {
    this.supportsOpenOrdersDownload = supportsOpenOrdersDownload;
  }

  public getSupportsPositionsDownload(): boolean {
    return this.supportsPositionsDownload;
  }

  public setSupportsPositionsDownload(supportsPositionsDownload: boolean): void {
    this.supportsPositionsDownload = supportsPositionsDownload;
  }

  public getSupportsBalanceDownload(): boolean {
    return this.supportsBalanceDownload;
  }

  public setSupportsBalanceDownload(supportsBalanceDownload: boolean): void {
    this.supportsBalanceDownload = supportsBalanceDownload;
  }

  public getSupportsEmail(): boolean {
    return this.supportsEmail;
  }

  public setSupportsEmail(supportsEmail: boolean): void {
    this.supportsEmail = supportsEmail;
  }

  public getSupports401kInformation(): boolean {
    return this.supports401kInformation;
  }

  public setSupports401kInformation(supports401kInformation: boolean): void {
    this.supports401kInformation = supports401kInformation;
  }

  public getSupportsClosingStatements(): boolean {
    return this.supportsClosingStatements;
  }

  public setSupportsClosingStatements(supportsClosingStatements: boolean): void {
    this.supportsClosingStatements = supportsClosingStatements;
  }
}

Aggregate_add( InvestmentV1MessageSetInfo, "INVSTMTMSGSETV1" );
Element_add(InvestmentV1MessageSetInfo, { name: "TRANDNLD", required:true, order: 10, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsStatementsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsStatementsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "OODNLD", required:true, order: 20, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsOpenOrdersDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsOpenOrdersDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "POSDNLD", required:true, order: 30, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsPositionsDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsPositionsDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "BALDNLD", required:true, order: 40, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsBalanceDownload, write: InvestmentV1MessageSetInfo.prototype.setSupportsBalanceDownload });
Element_add(InvestmentV1MessageSetInfo, { name: "CANEMAIL", required:true, order: 50, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsEmail, write: InvestmentV1MessageSetInfo.prototype.setSupportsEmail });
Element_add(InvestmentV1MessageSetInfo, { name: "INV401KDNLD", order: 60, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupports401kInformation, write: InvestmentV1MessageSetInfo.prototype.setSupports401kInformation });
Element_add(InvestmentV1MessageSetInfo, { name: "CLOSINGAVAIL", order: 70, type: Boolean, read: InvestmentV1MessageSetInfo.prototype.getSupportsClosingStatements, write: InvestmentV1MessageSetInfo.prototype.setSupportsClosingStatements });

}
