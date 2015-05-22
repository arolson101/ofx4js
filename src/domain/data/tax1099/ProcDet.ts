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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/Element_add'/>

module ofx4js.domain.data.tax1099 {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class ProcDet {

	private dtAqd: string;
	private dtSale: string;
	private secName: string;
	private costBasis: string;
	private saleSpr: string;
	private longShort: string;
	private wasDisAllowed: string;
	private noncoveredSec: string;
	private basisNotshown: string;
	/**
	 * @return the dtAqd
	 */
	public getDtAqd(): string {
		return this.dtAqd;
	}
	/**
	 * @param dtAqd the dtAqd to set
	 */
	public setDtAqd(dtAqd: string): void {
		this.dtAqd = dtAqd;
	}
	/**
	 * @return the dtSale
	 */
	public getDtSale(): string {
		return this.dtSale;
	}
	/**
	 * @param dtSale the dtSale to set
	 */
	public setDtSale(dtSale: string): void {
		this.dtSale = dtSale;
	}
	/**
	 * @return the secName
	 */
	public getSecName(): string {
		return this.secName;
	}
	/**
	 * @param secName the secName to set
	 */
	public setSecName(secName: string): void {
		this.secName = secName;
	}
	/**
	 * @return the costBasis
	 */
	public getCostBasis(): string {
		return this.costBasis;
	}
	/**
	 * @param costBasis the costBasis to set
	 */
	public setCostBasis(costBasis: string): void {
		this.costBasis = costBasis;
	}
	/**
	 * @return the saleSpr
	 */
	public getSaleSpr(): string {
		return this.saleSpr;
	}
	/**
	 * @param saleSpr the saleSpr to set
	 */
	public setSaleSpr(saleSpr: string): void {
		this.saleSpr = saleSpr;
	}
	/**
	 * @return the longShort
	 */
	public getLongShort(): string {
		return this.longShort;
	}
	/**
	 * @param longShort the longShort to set
	 */
	public setLongShort(longShort: string): void {
		this.longShort = longShort;
	}
	/**
	 * @return the wasDisAllowed
	 */
	public getWasDisAllowed(): string {
		return this.wasDisAllowed;
	}
	/**
	 * @param wasDisAllowed the wasDisAllowed to set
	 */
	public setWasDisAllowed(wasDisAllowed: string): void {
		this.wasDisAllowed = wasDisAllowed;
	}
	/**
	 * @return the noncoveredSec
	 */
	public getNoncoveredSec(): string {
		return this.noncoveredSec;
	}
	/**
	 * @param noncoveredSec the noncoveredSec to set
	 */
	public setNoncoveredSec(noncoveredSec: string): void {
		this.noncoveredSec = noncoveredSec;
	}
	/**
	 * @return the basisNotshown
	 */
	public getBasisNotshown(): string {
		return this.basisNotshown;
	}
	/**
	 * @param basisNotshown the basisNotshown to set
	 */
	public setBasisNotshown(basisNotshown: string): void {
		this.basisNotshown = basisNotshown;
	}
}

Aggregate_add( ProcDet, "PROCDET_V100");
Element_add(ProcDet, { name: "DTAQD", required: false, order: 0, type: String, read: ProcDet.prototype.getDtAqd, write: ProcDet.prototype.setDtAqd });
Element_add(ProcDet, { name: "DTSALE", required: false, order: 2, type: String, read: ProcDet.prototype.getDtSale, write: ProcDet.prototype.setDtSale });
Element_add(ProcDet, { name: "SECNAME", required: false, order: 3, type: String, read: ProcDet.prototype.getSecName, write: ProcDet.prototype.setSecName });
Element_add(ProcDet, { name: "COSTBASIS", required: false, order: 4, type: String, read: ProcDet.prototype.getCostBasis, write: ProcDet.prototype.setCostBasis });
Element_add(ProcDet, { name: "SALESPR", required: false, order: 5, type: String, read: ProcDet.prototype.getSaleSpr, write: ProcDet.prototype.setSaleSpr });
Element_add(ProcDet, { name: "LONGSHORT", required: false, order: 6, type: String, read: ProcDet.prototype.getLongShort, write: ProcDet.prototype.setLongShort });
Element_add(ProcDet, { name: "WASHSALELOSSDISALLOWED", required: false, order: 7, type: String, read: ProcDet.prototype.getWasDisAllowed, write: ProcDet.prototype.setWasDisAllowed });
Element_add(ProcDet, { name: "NONCOVEREDSECURITY", required: false, order: 8, type: String, read: ProcDet.prototype.getNoncoveredSec, write: ProcDet.prototype.setNoncoveredSec });
Element_add(ProcDet, { name: "BASISNOTSHOWN", required: false, order: 9, type: String, read: ProcDet.prototype.getBasisNotshown, write: ProcDet.prototype.setBasisNotshown });

}
