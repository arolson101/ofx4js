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

module ofx4js.domain.data.common {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @author Ryan Heaton
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

}
