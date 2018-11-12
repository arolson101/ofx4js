/*
 * Copyright 2010 Web Cohesion
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
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";


/**
 * Original currency aggregate ("ORIGCURRENCY"). For investment transactions in other currencies,
 * the financial institution can report the transaction as converted into the default currency
 * and then include this child aggregate to report what the original currency was and what the
 * rate of conversion was.
 * @see "Section 5.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class OriginalCurrency {

  private currencyRate: number;
  private currencyCode: string;

  /**
   * Gets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
   * the transaction response) to "CURSYM" (the original currency code below).
   *
   * @return the currency rate
   */
  public getCurrencyRate(): number {
    return this.currencyRate;
  }

  /**
   * Sets the rate of currency conversion. This is the ratio of "CURDEF" (the default currency in
   * the transaction response) to "CURSYM" (the original currency code below).
   *
   * @param currencyRate the currency rate
   */
  public setCurrencyRate(currencyRate: number): void {
    this.currencyRate = currencyRate;
  }

  /**
   * Gets the ISO-4217 3-letter currency identifier of the original currency.
   * @see java.util.Currency#getCurrencyCode()
   *
   * @return the currency code
   */
  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * Sets the ISO-4217 3-letter currency identifier of the original currency.
   * @see java.util.Currency#getCurrencyCode()
   *
   * @param currencyCode the currency code
   */
  public setCurrencyCode(currencyCode: string): void {
    this.currencyCode = currencyCode;
  }
}

Aggregate_add( OriginalCurrency, "ORIGCURRENCY" );
Element_add(OriginalCurrency, { name: "CURRATE", required: true, order: 10, type: Number, read: OriginalCurrency.prototype.getCurrencyRate, write: OriginalCurrency.prototype.setCurrencyRate });
Element_add(OriginalCurrency, { name: "CURSYM", required: true, order: 20, type: String, read: OriginalCurrency.prototype.getCurrencyCode, write: OriginalCurrency.prototype.setCurrencyCode });
