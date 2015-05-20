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
import {PayerAddress} from "PayerAddress";
import {RecAddress} from "RecAddress";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

import {Element_add} from "../../../meta/Element_add";

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */


export class Tax1099MISC  {

  
	private srvrtId: string;
	private taxYear: string;
	
	private royalties: string;
	private otherIncome: string;
	private fedTaxWh: string;
	private subPmts: string;
			
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
	 * @return the royalties
	 */
	public getRoyalties(): string {
		return this.royalties;
	}


	/**
	 * @param royalties the royalties to set
	 */
	public setRoyalties(royalties: string): void {
		this.royalties = royalties;
	}


	/**
	 * @return the otherIncome
	 */
	public getOtherIncome(): string {
		return this.otherIncome;
	}


	/**
	 * @param otherIncome the otherIncome to set
	 */
	public setOtherIncome(otherIncome: string): void {
		this.otherIncome = otherIncome;
	}


	/**
	 * @return the fedTaxWh
	 */
	public getFedTaxWh(): string {
		return this.fedTaxWh;
	}


	/**
	 * @param fedTaxWh the fedTaxWh to set
	 */
	public setFedTaxWh(fedTaxWh: string): void {
		this.fedTaxWh = fedTaxWh;
	}


	/**
	 * @return the subPmts
	 */
	public getSubPmts(): string {
		return this.subPmts;
	}


	/**
	 * @param subPmts the subPmts to set
	 */
	public setSubPmts(subPmts: string): void {
		this.subPmts = subPmts;
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

Aggregate_add( Tax1099MISC, "TAX1099MISC_V100");
Element_add(Tax1099MISC, { name: "SRVRTID",required: true , order: 0, type: String, read: Tax1099MISC.prototype.getSrvrtId, write: Tax1099MISC.prototype.setSrvrtId });
Element_add(Tax1099MISC, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099MISC.prototype.getTaxYear, write: Tax1099MISC.prototype.setTaxYear });
Element_add(Tax1099MISC, { name: "ROYALTIES",required: false , order: 2, type: String, read: Tax1099MISC.prototype.getRoyalties, write: Tax1099MISC.prototype.setRoyalties });
Element_add(Tax1099MISC, { name: "OTHERINCOME",required: false , order: 3, type: String, read: Tax1099MISC.prototype.getOtherIncome, write: Tax1099MISC.prototype.setOtherIncome });
Element_add(Tax1099MISC, { name: "FEDTAXWH",required: false , order: 4, type: String, read: Tax1099MISC.prototype.getFedTaxWh, write: Tax1099MISC.prototype.setFedTaxWh });
Element_add(Tax1099MISC, { name: "SUBPMTS",required: false , order: 5, type: String, read: Tax1099MISC.prototype.getSubPmts, write: Tax1099MISC.prototype.setSubPmts });
ChildAggregate_add(Tax1099MISC, { required:true, order: 6, type: PayerAddress, read: Tax1099MISC.prototype.getPayerAddress, write: Tax1099MISC.prototype.setPayerAddress });
Element_add(Tax1099MISC, { name: "PAYERID", required: true, order: 7, type: String, read: Tax1099MISC.prototype.getPayerId, write: Tax1099MISC.prototype.setPayerId });
ChildAggregate_add(Tax1099MISC, { required:true, order: 8, type: RecAddress, read: Tax1099MISC.prototype.getRecAddress, write: Tax1099MISC.prototype.setRecAddress });
Element_add(Tax1099MISC, { name: "RECID", required: true, order: 9, type: String, read: Tax1099MISC.prototype.getRecId, write: Tax1099MISC.prototype.setRecId });
Element_add(Tax1099MISC, { name: "RECACCT", required: true, order: 10, type: String, read: Tax1099MISC.prototype.getRecAcct, write: Tax1099MISC.prototype.setRecAcct });


