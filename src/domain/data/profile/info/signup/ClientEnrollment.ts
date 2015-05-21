/*
 * Copyright 2012 TheStash
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
///<reference path='../../../../../meta/Aggregate_add'/>
///<reference path='../../../../../meta/Element_add'/>

module ofx4js.domain.data.profile.info.signup {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Client Enrollment option, contains indicator as to whether the account number is required as part of enrollment
 * @author Scott Priddy
 * @see "Section 8.8 OFX Spec"
 */
export class ClientEnrollment {

  private accountRequired: boolean;

  /**
   * Y if account number is required as part of enrollment
   * @return Boolean
   */
  public getAccountRequired(): boolean {
    return this.accountRequired;
  }

  public setAccountRequired(accountRequired: boolean): void {
    this.accountRequired = accountRequired;
  }

}

Aggregate_add( ClientEnrollment, "CLIENTENROLL" );
Element_add(ClientEnrollment, { name: "ACCTREQUIRED", required: true, order: 0, type: Boolean, read: ClientEnrollment.prototype.getAccountRequired, write: ClientEnrollment.prototype.setAccountRequired });

}
