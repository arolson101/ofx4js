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
///<reference path='../common/T1099Request'/>

module ofx4js.domain.data.tax1099 {


import T1099Request = ofx4js.domain.data.common.T1099Request;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class Tax1099Request extends T1099Request {

    public getTaxYear(): string {
		return this.taxYear;
	}

	public setTaxYear(taxYear: string): void {
		this.taxYear = taxYear;
	}

	private taxYear: string;
}

Aggregate_add(Tax1099Request, "TAX1099RQ");
Element_add(Tax1099Request, { name: "TAXYEAR", required: true, order: 0, type: String, read: Tax1099Request.prototype.getTaxYear, write: Tax1099Request.prototype.setTaxYear });

}
