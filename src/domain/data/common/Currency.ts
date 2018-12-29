import { Aggregate_add } from "../../../meta/Aggregate_Add";
import { Element_add } from "../../../meta/Element_add";


/**
 * @see "Section 5.2, OFX Spec"
 */
export class Currency {

  private code: string;
  private exchangeRate: number;

  constructor() {
    this.code = "USD"; //java.util.Currency.getInstance(Locale.US).getCurrencyCode().toUpperCase();
  }

  /**
   * The currency code.
   *
   * @return The currency code.
   * @see java.util.Currency#getCurrencyCode()
   */
  public getCode(): string {
    return this.code;
  }

  /**
   * The currency code
   *
   * @param code The currency code
   */
  public setCode(code: string): void {
    this.code = code;
  }

  /**
   * The exchange rate.
   *
   * @return The exchange rate.
   */
  public getExchangeRate(): number {
    return this.exchangeRate;
  }

  /**
   * The exchange rate.
   *
   * @param exchangeRate The exchange rate.
   */
  public setExchangeRate(exchangeRate: number): void {
    this.exchangeRate = exchangeRate;
  }
}

Aggregate_add( Currency, "CURRENCY" );
Element_add(Currency, { name: "CURSYM", required: true, order: 0, type: String, read: Currency.prototype.getCode, write: Currency.prototype.setCode });
Element_add(Currency, { name: "CURRATE", required: true, order: 10, type: Number, read: Currency.prototype.getExchangeRate, write: Currency.prototype.setExchangeRate });
