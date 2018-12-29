import { T1099Request } from "../common/T1099Request";
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


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
