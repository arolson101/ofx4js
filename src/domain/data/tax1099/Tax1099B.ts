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
import { ExtDBInfo } from "./ExtDBInfo";
import { PayerAddress } from "./PayerAddress";
import { RecAddress } from "./RecAddress";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class Tax1099B  {
	private srvrtId: string;
	private taxYear: string;
	private extDBInfo: ExtDBInfo;
	private payerAddress: PayerAddress;
	private payerId: string;
	private recAddress: RecAddress;
	private recId: string;
	private recAcct: string;


	  public getSrvrtId(): string {
	    return this.srvrtId;
	  }


      public setSrvrtId(srvrtId: string): void {
	    this.srvrtId = srvrtId;
	  }


      public getTaxYear(): string {
	    return this.taxYear;
	  }


	  public setTaxYear(taxYear: string): void {
	    this.taxYear = taxYear;
	  }

	/**
	 * @return the extDBInfo
	 */
	public getExtDBInfo(): ExtDBInfo {
		return this.extDBInfo;
	}


	/**
	 * @param extDBInfo the extDBInfo to set
	 */
	public setExtDBInfo(extDBInfo: ExtDBInfo): void {
		this.extDBInfo = extDBInfo;
	}


	/**
	 * @return the payerAddress
	 */
	public getPayerAddress(): PayerAddress {
		return this.payerAddress;
	}


	/**
	 * @param payerAddress the payerAddress to set
	 */
	public setPayerAddress(payerAddress: PayerAddress): void {
		this.payerAddress = payerAddress;
	}

	/**
	 * @return the payerId
	 */
	public getPayerId(): string {
		return this.payerId;
	}


	/**
	 * @param payerId the payerId to set
	 */
	public setPayerId(payerId: string): void {
		this.payerId = payerId;
	}


	/**
	 * @return the recAddress
	 */
	public getRecAddress(): RecAddress {
		return this.recAddress;
	}


	/**
	 * @param recAddress the recAddress to set
	 */
	public setRecAddress(recAddress: RecAddress): void {
		this.recAddress = recAddress;
	}

	/**
	 * @return the recId
	 */
	public getRecId(): string {
		return this.recId;
	}


	/**
	 * @param recId the recId to set
	 */
	public setRecId(recId: string): void {
		this.recId = recId;
	}


	/**
	 * @return the recAcct
	 */
	public getRecAcct(): string {
		return this.recAcct;
	}


	/**
	 * @param recAcct the recAcct to set
	 */
	public setRecAcct(recAcct: string): void {
		this.recAcct = recAcct;
	}
}

Aggregate_add( Tax1099B, "TAX1099B_V100");
Element_add(Tax1099B, { name: "SRVRTID",required: true , order: 0, type: String, read: Tax1099B.prototype.getSrvrtId, write: Tax1099B.prototype.setSrvrtId });
Element_add(Tax1099B, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099B.prototype.getTaxYear, write: Tax1099B.prototype.setTaxYear });
ChildAggregate_add(Tax1099B, { required:true, order: 2, type: ExtDBInfo, read: Tax1099B.prototype.getExtDBInfo, write: Tax1099B.prototype.setExtDBInfo });
ChildAggregate_add(Tax1099B, { required:true, order: 3, type: PayerAddress, read: Tax1099B.prototype.getPayerAddress, write: Tax1099B.prototype.setPayerAddress });
Element_add(Tax1099B, { name: "PAYERID", required: true, order: 4, type: String, read: Tax1099B.prototype.getPayerId, write: Tax1099B.prototype.setPayerId });
ChildAggregate_add(Tax1099B, { required:true, order: 5, type: RecAddress, read: Tax1099B.prototype.getRecAddress, write: Tax1099B.prototype.setRecAddress });
Element_add(Tax1099B, { name: "RECID", required: true, order: 6, type: String, read: Tax1099B.prototype.getRecId, write: Tax1099B.prototype.setRecId });
Element_add(Tax1099B, { name: "RECACCT", required: true, order: 7, type: String, read: Tax1099B.prototype.getRecAcct, write: Tax1099B.prototype.setRecAcct });
