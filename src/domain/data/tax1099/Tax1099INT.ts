import { PayerAddress } from "./PayerAddress";
import { RecAddress } from "./RecAddress";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";
import { ChildAggregate_add } from "../../../meta/ChildAggregate_add";

export class Tax1099INT  {
	private srvrtId: string;
	private taxYear: string;
	private intIncome: string;
	private erlWithPen: string;
	private intUsbndtrs: string;
	private fedTaxWh: string;
	private investExp: string;
	private forTaxPd: string;

	private payerAddress: PayerAddress;
	private payerId: string;
	private recAddress: RecAddress;
	private recId: string;
	private recAcct: string;
	private taxExemptInt: string;
	private specifiedPabInt: string;

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
	 * @return the intIncome
	 */
	public getIntIncome(): string {
		return this.intIncome;
	}


	/**
	 * @param intIncome the intIncome to set
	 */
	public setIntIncome(intIncome: string): void {
		this.intIncome = intIncome;
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
	 * @return the intUsbndtrs
	 */
	public getIntUsbndtrs(): string {
		return this.intUsbndtrs;
	}


	/**
	 * @param intUsbndtrs the intUsbndtrs to set
	 */
	public setIntUsbndtrs(intUsbndtrs: string): void {
		this.intUsbndtrs = intUsbndtrs;
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
	 * @return the forTaxPd
	 */
	public getForTaxPd(): string {
		return this.forTaxPd;
	}


	/**
	 * @param forTaxPd the forTaxPd to set
	 */
	public setForTaxPd(forTaxPd: string): void {
		this.forTaxPd = forTaxPd;
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


	/**
	 * @return the taxExemptInt
	 */
	public getTaxExemptInt(): string {
		return this.taxExemptInt;
	}


	/**
	 * @param taxExemptInt the taxExemptInt to set
	 */
	public setTaxExemptInt(taxExemptInt: string): void {
		this.taxExemptInt = taxExemptInt;
	}


	/**
	 * @return the specifiedPabInt
	 */
	public getSpecifiedPabInt(): string {
		return this.specifiedPabInt;
	}


	/**
	 * @param specifiedPabInt the specifiedPabInt to set
	 */
	public setSpecifiedPabInt(specifiedPabInt: string): void {
		this.specifiedPabInt = specifiedPabInt;
	}
}

Aggregate_add(Tax1099INT, "TAX1099INT_V100");
Element_add(Tax1099INT, { name: "SRVRTID",required: true , order: 0, type: String, read: Tax1099INT.prototype.getSrvrtId, write: Tax1099INT.prototype.setSrvrtId });
Element_add(Tax1099INT, { name: "TAXYEAR", required: true, order: 1, type: String, read: Tax1099INT.prototype.getTaxYear, write: Tax1099INT.prototype.setTaxYear });
Element_add(Tax1099INT, { name: "INTINCOME",required: false , order: 2, type: String, read: Tax1099INT.prototype.getIntIncome, write: Tax1099INT.prototype.setIntIncome });
Element_add(Tax1099INT, { name: "ERLWITHPEN",required: false , order: 3, type: String, read: Tax1099INT.prototype.getErlWithPen, write: Tax1099INT.prototype.setErlWithPen });
Element_add(Tax1099INT, { name: "INTUSBNDTRS",required: false , order: 4, type: String, read: Tax1099INT.prototype.getIntUsbndtrs, write: Tax1099INT.prototype.setIntUsbndtrs });
Element_add(Tax1099INT, { name: "FEDTAXWH", required: false, order: 5, type: String, read: Tax1099INT.prototype.getFedTaxWh, write: Tax1099INT.prototype.setFedTaxWh });
Element_add(Tax1099INT, { name: "INVESTEXP", required: false, order: 6, type: String, read: Tax1099INT.prototype.getInvestExp, write: Tax1099INT.prototype.setInvestExp });
Element_add(Tax1099INT, { name: "FORTAXPD", required: false, order: 7, type: String, read: Tax1099INT.prototype.getForTaxPd, write: Tax1099INT.prototype.setForTaxPd });
ChildAggregate_add(Tax1099INT, { required:true, order: 8, type: PayerAddress, read: Tax1099INT.prototype.getPayerAddress, write: Tax1099INT.prototype.setPayerAddress });
Element_add(Tax1099INT, { name: "PAYERID", required: true, order: 9, type: String, read: Tax1099INT.prototype.getPayerId, write: Tax1099INT.prototype.setPayerId });
ChildAggregate_add(Tax1099INT, { required:true, order: 10, type: RecAddress, read: Tax1099INT.prototype.getRecAddress, write: Tax1099INT.prototype.setRecAddress });
Element_add(Tax1099INT, { name: "RECID", required: true, order: 11, type: String, read: Tax1099INT.prototype.getRecId, write: Tax1099INT.prototype.setRecId });
Element_add(Tax1099INT, { name: "RECACCT", required: true, order: 12, type: String, read: Tax1099INT.prototype.getRecAcct, write: Tax1099INT.prototype.setRecAcct });
Element_add(Tax1099INT, { name: "TAXEXEMPTINT", required: false, order: 13, type: String, read: Tax1099INT.prototype.getTaxExemptInt, write: Tax1099INT.prototype.setTaxExemptInt });
Element_add(Tax1099INT, { name: "SPECIFIEDPABINT", required: false, order: 14, type: String, read: Tax1099INT.prototype.getSpecifiedPabInt, write: Tax1099INT.prototype.setSpecifiedPabInt });
