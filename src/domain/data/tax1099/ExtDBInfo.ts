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
import {ProcDet} from "ProcDet";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";
import {Element_add} from "../../../meta/Element_add";


/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class ExtDBInfo {

	private procDet: Array<ProcDet>;
	private teInterest: string;
	private pabInterest: string;
	private teIntDividend: string;
	private pabDividend: string;
	
	/**
	 * @return the procDet
	 */
	public getProcDet(): Array<ProcDet> {
		return this.procDet;
	}

	/**
	 * @param procDet the procDet to set
	 */
    public setProcDet(procDet: Array<ProcDet>): void {
		this.procDet = procDet;
	}

	/**
	 * @return the teInterest
	 */
	public getTeInterest(): string {
		return this.teInterest;
	}

	/**
	 * @param teInterest the teInterest to set
	 */
	public setTeInterest(teInterest: string): void {
		this.teInterest = teInterest;
	}

	/**
	 * @return the pabInterest
	 */
	public getPabInterest(): string {
		return this.pabInterest;
	}

	/**
	 * @param pabInterest the pabInterest to set
	 */
	public setPabInterest(pabInterest: string): void {
		this.pabInterest = pabInterest;
	}

	/**
	 * @return the teIntDividend
	 */
	public getTeIntDividend(): string {
		return this.teIntDividend;
	}

	/**
	 * @param teIntDividend the teIntDividend to set
	 */
	public setTeIntDividend(teIntDividend: string): void {
		this.teIntDividend = teIntDividend;
	}

	/**
	 * @return the pabDividend
	 */
	public getPabDividend(): string {
		return this.pabDividend;
	}

	/**
	 * @param pabDividend the pabDividend to set
	 */
	public setPabDividend(pabDividend: string): void {
		this.pabDividend = pabDividend;
	}	
}

Aggregate_add( ExtDBInfo, "EXTDBINFO_V100");
ChildAggregate_add(ExtDBInfo, { required:false, order: 0, type: Array, collectionEntryType: ProcDet, read: ExtDBInfo.prototype.getProcDet, write: ExtDBInfo.prototype.setProcDet });
Element_add(ExtDBInfo, { name: "TEINTEREST",required: false , order: 1, type: String, read: ExtDBInfo.prototype.getTeInterest, write: ExtDBInfo.prototype.setTeInterest });
Element_add(ExtDBInfo, { name: "PABINTEREST",required: false , order: 2, type: String, read: ExtDBInfo.prototype.getPabInterest, write: ExtDBInfo.prototype.setPabInterest });
Element_add(ExtDBInfo, { name: "TEINTDIVIDEND",required: false , order: 3, type: String, read: ExtDBInfo.prototype.getTeIntDividend, write: ExtDBInfo.prototype.setTeIntDividend });
Element_add(ExtDBInfo, { name: "PABDIVIDEND",required: false , order: 4, type: String, read: ExtDBInfo.prototype.getPabDividend, write: ExtDBInfo.prototype.setPabDividend });


