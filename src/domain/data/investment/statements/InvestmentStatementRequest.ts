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
import {IncludePosition} from "IncludePosition";
import {StatementRequest} from "../../common/StatementRequest";
import {InvestmentAccountDetails} from "../accounts/InvestmentAccountDetails";
import {Aggregate_add} from "../../../../meta/Aggregate_Add";
import {ChildAggregate_add} from "../../../../meta/ChildAggregate_add";
import {Element_add} from "../../../../meta/Element_add";

/**
 * Aggregate for the investment statement download request.
 * @see "Section 13.9.1.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentStatementRequest extends StatementRequest {

  private account: InvestmentAccountDetails;
  private includeOpenOrders: boolean;
  private includePosition: IncludePosition;
  private includeBalance: boolean;
  
  constructor() {
    super();
    this.includeOpenOrders = false;
    this.includeBalance = true;
  }

  /**
   * The account details.
   *
   * @return The account details.
   */
  public getAccount(): InvestmentAccountDetails {
    return this.account;
  }

  /**
   * The account details.
   *
   * @param account The account details.
   */
  public setAccount(account: InvestmentAccountDetails): void {
    this.account = account;
  }

  /**
   * Gets whether to include open orders. This is an optional field according to the OFX spec.
   * <br>
   * Note, open orders are not yet implemented.
   *
   * @return whether to include open orders
   */
  public getIncludeOpenOrders(): boolean {
    return this.includeOpenOrders;
  }

  /**
   * Sets whether to include open orders. This is an optional field according to the OFX spec.
   * <br>
   * Note, open orders are not yet implemented.
   *
   * @param includeOpenOrders whether to include open orders
   */
  public setIncludeOpenOrders(includeOpenOrders: boolean): void {
    this.includeOpenOrders = includeOpenOrders;
  }

  /**
   * Gets the include position child aggregate. This is a required field according to the OFX spec.
   *
   * @return the include position child aggregate
   */
  public getIncludePosition(): IncludePosition {
    return this.includePosition;
  }

  /**
   * Gets the include position child aggregate. This is a required field according to the OFX spec.
   *
   * @param includePosition the include position child aggregate
   */
  public setIncludePosition(includePosition: IncludePosition): void {
    this.includePosition = includePosition;
  }

  /**
   * Gets whether to include balance info in the response. This is a required field according to
   * the OFX spec.
   *
   * @return whether to include balance info in the response
   */
  public getIncludeBalance(): boolean {
    return this.includeBalance;
  }

  /**
   * Sets whether to include balance info in the response. This is a required field according to
   * the OFX spec.
   *
   * @param includeBalance whether to include balance info in the response
   */
  public setIncludeBalance(includeBalance: boolean): void {
    this.includeBalance = includeBalance;
  }
}

Aggregate_add(InvestmentStatementRequest, "INVSTMTRQ");
ChildAggregate_add(InvestmentStatementRequest, { name: "INVACCTFROM", required: true, order: 0, type: InvestmentAccountDetails, read: InvestmentStatementRequest.prototype.getAccount, write: InvestmentStatementRequest.prototype.setAccount });
Element_add(InvestmentStatementRequest, { name: "INCOO", order: 20, type: Boolean, read: InvestmentStatementRequest.prototype.getIncludeOpenOrders, write: InvestmentStatementRequest.prototype.setIncludeOpenOrders });
ChildAggregate_add(InvestmentStatementRequest, { name: "INCPOS", required: true, order: 30, type: IncludePosition, read: InvestmentStatementRequest.prototype.getIncludePosition, write: InvestmentStatementRequest.prototype.setIncludePosition });
Element_add(InvestmentStatementRequest, { name: "INCBAL", required: true, order: 40, type: Boolean, read: InvestmentStatementRequest.prototype.getIncludeBalance, write: InvestmentStatementRequest.prototype.setIncludeBalance });


