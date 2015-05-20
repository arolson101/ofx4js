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
import {Tax1099Request} from "Tax1099Request";
import {TransactionWrappedRequestMessage} from "../TransactionWrappedRequestMessage";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
 */
export class Tax1099RequestTransaction extends TransactionWrappedRequestMessage<Tax1099Request> {

  private tax1099Request: Tax1099Request;

  /**
   * The tax1099Request.
   *
   * @return The tax1099Request.
   */
  public getTax1099Request(): Tax1099Request {
    return this.tax1099Request;
  }

  /**
   * The tax1099Request.
   *
   * @param tax1099Request The message.
   *
   */
  public setTax1099Request(tax1099Request: Tax1099Request): void {
    this.tax1099Request = tax1099Request;
  }

  // Inherited.
  public setWrappedMessage(tax1099Request: Tax1099Request): void {
	  this.setTax1099Request(tax1099Request);
  }
}

Aggregate_add(Tax1099RequestTransaction, "TAX1099TRNRQ");
ChildAggregate_add(Tax1099RequestTransaction, { required: true, order: 30, type: Tax1099Request, read: Tax1099RequestTransaction.prototype.getTax1099Request, write: Tax1099RequestTransaction.prototype.setTax1099Request });


