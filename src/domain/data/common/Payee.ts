import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


export class Payee {

  private name: string;
  private address1: string;
  private address2: string;
  private address3: string;
  private city: string;
  private state: string;
  private zip: string;
  private country: string;
  private phone: string;

  /**
   * The name of the payee.
   *
   * @return The name of the payee.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * The name of the payee.
   *
   * @param name The name of the payee.
   */
  public setName(name: string): void {
    this.name = name;
  }

  /**
   * The address of the payee.
   *
   * @return The address of the payee.
   */
  public getAddress1(): string {
    return this.address1;
  }

  /**
   * The address of the payee.
   *
   * @param address1 The address of the payee.
   */
  public setAddress1(address1: string): void {
    this.address1 = address1;
  }

  /**
   * The address of the payee.
   *
   * @return The address of the payee.
   */
  public getAddress2(): string {
    return this.address2;
  }

  /**
   * The address of the payee.
   *
   * @param address2 The address of the payee.
   */
  public setAddress2(address2: string): void {
    this.address2 = address2;
  }

  /**
   * The address of the payee.
   *
   * @return The address of the payee.
   */
  public getAddress3(): string {
    return this.address3;
  }

  /**
   * The address of the payee.
   *
   * @param address3 The address of the payee.
   */
  public setAddress3(address3: string): void {
    this.address3 = address3;
  }

  /**
   * The city of the payee.
   *
   * @return The city of the payee.
   */
  public getCity(): string {
    return this.city;
  }

  /**
   * The city of the payee.
   *
   * @param city The city of the payee.
   */
  public setCity(city: string): void {
    this.city = city;
  }

  /**
   * The state of this payee.
   *
   * @return The state of this payee.
   */
  public getState(): string {
    return this.state;
  }

  /**
   * The state of this payee.
   *
   * @param state The state of this payee.
   */
  public setState(state: string): void {
    this.state = state;
  }

  /**
   * The postal code of this payee.
   *
   * @return The postal code of this payee.
   */
  public getZip(): string {
    return this.zip;
  }

  /**
   * The postal code of this payee.
   *
   * @param zip The postal code of this payee.
   */
  public setZip(zip: string): void {
    this.zip = zip;
  }

  /**
   * The country code for this payee.
   *
   * @return The country code for this payee.
   * @see java.util.Locale#getISO3Country()
   */
  public getCountry(): string {
    return this.country;
  }

  /**
   * The country code for this payee.
   *
   * @param country The country code for this payee.
   */
  public setCountry(country: string): void {
    this.country = country;
  }

  /**
   * The phone number.
   *
   * @return The phone number.
   */
  public getPhone(): string {
    return this.phone;
  }

  /**
   * The phone number.
   *
   * @param phone The phone number.
   */
  public setPhone(phone: string): void {
    this.phone = phone;
  }

}

Aggregate_add( Payee, "PAYEE" );
Element_add(Payee, { name: "NAME", order: 30, type: String, read: Payee.prototype.getName, write: Payee.prototype.setName });
Element_add(Payee, { name: "ADDR1", required: true, order: 40, type: String, read: Payee.prototype.getAddress1, write: Payee.prototype.setAddress1 });
Element_add(Payee, { name: "ADDR2", order: 50, type: String, read: Payee.prototype.getAddress2, write: Payee.prototype.setAddress2 });
Element_add(Payee, { name: "ADDR3", order: 60, type: String, read: Payee.prototype.getAddress3, write: Payee.prototype.setAddress3 });
Element_add(Payee, { name: "CITY", required: true, order: 70, type: String, read: Payee.prototype.getCity, write: Payee.prototype.setCity });
Element_add(Payee, { name: "STATE", required: true, order: 80, type: String, read: Payee.prototype.getState, write: Payee.prototype.setState });
Element_add(Payee, { name: "POSTALCODE", required: true, order: 90, type: String, read: Payee.prototype.getZip, write: Payee.prototype.setZip });
Element_add(Payee, { name: "COUNTRY", required: true, order: 100, type: String, read: Payee.prototype.getCountry, write: Payee.prototype.setCountry });
Element_add(Payee, { name: "PHONE", order: 110, type: String, read: Payee.prototype.getPhone, write: Payee.prototype.setPhone });
