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
import {CreditCardAccountDetails} from "CreditCardAccountDetails";
import {StatementRequest} from "../common/StatementRequest";
import {Aggregate_add} from "../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../meta/ChildAggregate_add";

/**
 * @author Ryan Heaton
 */
export class CreditCardStatementRequest extends StatementRequest {

  private account: CreditCardAccountDetails;

  /**
   * The account details.
   *
   * @return The account details.
   */
  public getAccount(): CreditCardAccountDetails {
    return this.account;
  }

  /**
   * The account details.
   *
   * @param account The account details.
   */
  public setAccount(account: CreditCardAccountDetails): void {
    this.account = account;
  }
}

Aggregate_add( CreditCardStatementRequest, "CCSTMTRQ" );
ChildAggregate_add(CreditCardStatementRequest, { name: "CCACCTFROM", required: true, order: 0, type: CreditCardAccountDetails, read: CreditCardStatementRequest.prototype.getAccount, write: CreditCardStatementRequest.prototype.setAccount });


