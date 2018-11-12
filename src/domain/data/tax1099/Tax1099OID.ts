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
import { PayerAddress } from "./PayerAddress";
import { RecAddress } from "./RecAddress";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";


/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class Tax1099OID  {


	private srvrtId: string;
	private taxYear: string;

	private originalDisc: string;
	private otherPerInt: string;
	private erlWithPen: string;
	private fedTaxWh: string;
	private desc: string;
	private oidOnUstres: string;
	private investExp: string;

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
	 * @return the originalDisc
	 */
	public getOriginalDisc(): string {
		return this.originalDisc;
	}


	/**
	 * @param originalDisc the originalDisc to set
	 */
	public setOriginalDisc(originalDisc: string): void {
		this.originalDisc = originalDisc;
	}


	/**
	 * @return the otherPerInt
	 */
	public getOtherPerInt(): string {
		return this.otherPerInt;
	}


	/**
	 * @param otherPerInt the otherPerInt to set
	 */
	public setOtherPerInt(otherPerInt: string): void {
		this.otherPerInt = otherPerInt;
	}


	/**
	 * @return the erlWithPen
	 */
	public getErlWithPen(): string {
		return this.erlWithPen;
	}


	/**
	 * @param erlWithPen the erlWithPen to set
	 */
	public setErlWithPen(erlWithPen: string): void {
		this.erlWithPen = erlWithPen;
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
	 * @return the desc
	 */
	public getDesc(): string {
		return this.desc;
	}


	/**
	 * @param desc the desc to set
	 */
	public setDesc(desc: string): void {
		this.desc = desc;
	}


	/**
	 * @return the oidOnUstres
	 */
	public getOidOnUstres(): string {
		return this.oidOnUstres;
	}


	/**
	 * @param oidOnUstres the oidOnUstres to set
	 */
	public setOidOnUstres(oidOnUstres: string): void {
		this.oidOnUstres = oidOnUstres;
	}


	/**
	 * @return the investExp
	 */
	public getInvestExp(): string {
		return this.investExp;
	}


	/**
	 * @param investExp the investExp to set
	 */
	public setInvestExp(investExp: string): void {
		this.investExp = investExp;
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

Aggregate_add(Tax1099OID, "TAX1099OID_V100");
Element_add(Tax1099OID, { name: "SRVRTID",required: true , order: 0, type: String, read: Tax1099OID.prototype.getSrvrtId, write: Tax1099OID.prototype.setSrvrtId });
Element_add(Tax1099OID, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099OID.prototype.getTaxYear, write: Tax1099OID.prototype.setTaxYear });
Element_add(Tax1099OID, { name: "ORIGISDISC", required: false, order: 2, type: String, read: Tax1099OID.prototype.getOriginalDisc, write: Tax1099OID.prototype.setOriginalDisc });
Element_add(Tax1099OID, { name: "OTHERPERINT", required: false, order: 3, type: String, read: Tax1099OID.prototype.getOtherPerInt, write: Tax1099OID.prototype.setOtherPerInt });
Element_add(Tax1099OID, { name: "ERLWITHPEN", required: false, order: 4, type: String, read: Tax1099OID.prototype.getErlWithPen, write: Tax1099OID.prototype.setErlWithPen });
Element_add(Tax1099OID, { name: "FEDTAXWH", required: false, order: 5, type: String, read: Tax1099OID.prototype.getFedTaxWh, write: Tax1099OID.prototype.setFedTaxWh });
Element_add(Tax1099OID, { name: "DESCRIPTION", required: true, order: 6, type: String, read: Tax1099OID.prototype.getDesc, write: Tax1099OID.prototype.setDesc });
Element_add(Tax1099OID, { name: "OIDONUSTRES", required: false, order: 7, type: String, read: Tax1099OID.prototype.getOidOnUstres, write: Tax1099OID.prototype.setOidOnUstres });
Element_add(Tax1099OID, { name: "INVESTEXP", required: false, order: 8, type: String, read: Tax1099OID.prototype.getInvestExp, write: Tax1099OID.prototype.setInvestExp });
ChildAggregate_add(Tax1099OID, { required:true, order: 9, type: PayerAddress, read: Tax1099OID.prototype.getPayerAddress, write: Tax1099OID.prototype.setPayerAddress });
Element_add(Tax1099OID, { name: "PAYERID", required: true, order: 10, type: String, read: Tax1099OID.prototype.getPayerId, write: Tax1099OID.prototype.setPayerId });
ChildAggregate_add(Tax1099OID, { required:true, order: 11, type: RecAddress, read: Tax1099OID.prototype.getRecAddress, write: Tax1099OID.prototype.setRecAddress });
Element_add(Tax1099OID, { name: "RECID", required: true, order: 12, type: String, read: Tax1099OID.prototype.getRecId, write: Tax1099OID.prototype.setRecId });
Element_add(Tax1099OID, { name: "RECACCT", required: true, order: 13, type: String, read: Tax1099OID.prototype.getRecAcct, write: Tax1099OID.prototype.setRecAcct });
