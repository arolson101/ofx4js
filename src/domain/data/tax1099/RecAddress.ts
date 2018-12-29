import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";

export class RecAddress {

	private recName1: string;
	private recName2: string;
	private address1: string;
	private address2: string;
	private city: string;
	private state: string;
	private postalCode: string;
	private phone: string;
	/**
	 * @return the recName1
	 */
	public getRecName1(): string {
		return this.recName1;
	}
	/**
	 * @param recName1 the recName1 to set
	 */
	public setRecName1(recName1: string): void {
		this.recName1 = recName1;
	}

	/**
	 * @return the recName2
	 */
	public getRecName2(): string {
		return this.recName2;
	}
	/**
	 * @param recName2 the recName2 to set
	 */
	public setRecName2(recName2: string): void {
		this.recName2 = recName2;
	}
	/**
	 * @return the address1
	 */
	public getAddress1(): string {
		return this.address1;
	}
	/**
	 * @param address1 the address1 to set
	 */
	public setAddress1(address1: string): void {
		this.address1 = address1;
	}

	/**
	 * @return the address2
	 */
	public getAddress2(): string {
		return this.address2;
	}
	/**
	 * @param address2 the address2 to set
	 */
	public setAddress2(address2: string): void {
		this.address2 = address2;
	}
	/**
	 * @return the city
	 */
	public getCity(): string {
		return this.city;
	}
	/**
	 * @param city the city to set
	 */
	public setCity(city: string): void {
		this.city = city;
	}
	/**
	 * @return the state
	 */
	public getState(): string {
		return this.state;
	}
	/**
	 * @param state the state to set
	 */
	public setState(state: string): void {
		this.state = state;
	}
	/**
	 * @return the postalCode
	 */
	public getPostalCode(): string {
		return this.postalCode;
	}
	/**
	 * @param postalCode the postalCode to set
	 */
	public setPostalCode(postalCode: string): void {
		this.postalCode = postalCode;
	}
	/**
	 * @return the phone
	 */
	public getPhone(): string {
		return this.phone;
	}
	/**
	 * @param phone the phone to set
	 */
	public setPhone(phone: string): void {
		this.phone = phone;
	}
}

Aggregate_add(RecAddress, "RECADDR");
Element_add(RecAddress, { name: "RECNAME1",required: true , order: 0, type: String, read: RecAddress.prototype.getRecName1, write: RecAddress.prototype.setRecName1 });
Element_add(RecAddress, { name: "RECNAME2",required: false , order: 1, type: String, read: RecAddress.prototype.getRecName2, write: RecAddress.prototype.setRecName2 });
Element_add(RecAddress, { name: "ADDR1",required: true , order: 2, type: String, read: RecAddress.prototype.getAddress1, write: RecAddress.prototype.setAddress1 });
Element_add(RecAddress, { name: "ADDR2",required: true , order: 3, type: String, read: RecAddress.prototype.getAddress2, write: RecAddress.prototype.setAddress2 });
Element_add(RecAddress, { name: "CITY",required: true , order: 4, type: String, read: RecAddress.prototype.getCity, write: RecAddress.prototype.setCity });
Element_add(RecAddress, { name: "STATE",required: true , order: 5, type: String, read: RecAddress.prototype.getState, write: RecAddress.prototype.setState });
Element_add(RecAddress, { name: "POSTALCODE",required: true , order: 6, type: String, read: RecAddress.prototype.getPostalCode, write: RecAddress.prototype.setPostalCode });
Element_add(RecAddress, { name: "PHONE",required: false , order: 7, type: String, read: RecAddress.prototype.getPhone, write: RecAddress.prototype.setPhone });
