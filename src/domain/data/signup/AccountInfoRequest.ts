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
///<reference path='../RequestMessage'/>

module ofx4js.domain.data.signup {

import RequestMessage = ofx4js.domain.data.RequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * @author Ryan Heaton
 */
export class AccountInfoRequest extends RequestMessage {

  private lastUpdated: Date;
  
  constructor() {
    super();
    this.lastUpdated = new Date(0); //default is never updated.
  }

  /**
   * When the account info was last updated.
   *
   * @return When the account info was last updated.
   */
  public getLastUpdated(): Date {
    return this.lastUpdated;
  }

  /**
   * When the account info was last updated.
   *
   * @param lastUpdated When the account info was last updated.
   */
  public setLastUpdated(lastUpdated: Date): void {
    this.lastUpdated = lastUpdated;
  }
}

Aggregate_add(AccountInfoRequest, "ACCTINFORQ");
Element_add(AccountInfoRequest, { name: "DTACCTUP", required: true, order: 0, type: Date, read: AccountInfoRequest.prototype.getLastUpdated, write: AccountInfoRequest.prototype.setLastUpdated });

}
