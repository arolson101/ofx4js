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
import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class PayerAddress {

	private payerName1: string;
	private payerName2: string;
	private address1: string;
	private address2: string;
	private city: string;
	private state: string;
	private postalCode: string;
	private phone: string;
	/**
	 * @return the payerName1
	 */
	public getPayerName1(): string {
		return this.payerName1;
	}
	/**
	 * @param payerName1 the payerName1 to set
	 */
	public setPayerName1(payerName1: string): void {
		this.payerName1 = payerName1;
	}
	/**
	 * @return the payerName2
	 */
	public getPayerName2(): string {
		return this.payerName2;
	}
	/**
	 * @param payerName2 the payerName2 to set
	 */
	public setPayerName2(payerName2: string): void {
		this.payerName2 = payerName2;
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

Aggregate_add(PayerAddress, "PAYERADDR");
Element_add(PayerAddress, { name: "PAYERNAME1",required: true , order: 0, type: String, read: PayerAddress.prototype.getPayerName1, write: PayerAddress.prototype.setPayerName1 });
Element_add(PayerAddress, { name: "PAYERNAME2",required: false , order: 1, type: String, read: PayerAddress.prototype.getPayerName2, write: PayerAddress.prototype.setPayerName2 });
Element_add(PayerAddress, { name: "ADDR1",required: true , order: 2, type: String, read: PayerAddress.prototype.getAddress1, write: PayerAddress.prototype.setAddress1 });
Element_add(PayerAddress, { name: "ADDR2",required: true , order: 3, type: String, read: PayerAddress.prototype.getAddress2, write: PayerAddress.prototype.setAddress2 });
Element_add(PayerAddress, { name: "CITY",required: true , order: 4, type: String, read: PayerAddress.prototype.getCity, write: PayerAddress.prototype.setCity });
Element_add(PayerAddress, { name: "STATE",required: true , order: 5, type: String, read: PayerAddress.prototype.getState, write: PayerAddress.prototype.setState });
Element_add(PayerAddress, { name: "POSTALCODE",required: true , order: 6, type: String, read: PayerAddress.prototype.getPostalCode, write: PayerAddress.prototype.setPostalCode });
Element_add(PayerAddress, { name: "PHONE",required: false , order: 7, type: String, read: PayerAddress.prototype.getPhone, write: PayerAddress.prototype.setPhone });
