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
import { StatementResponse } from "../../common/StatementResponse";
import { InvestmentAccountDetails } from "../accounts/InvestmentAccountDetails";
import { InvestmentTransactionList } from "../transactions/InvestmentTransactionList";
import { InvestmentPositionList } from "../positions/InvestmentPositionList";
import { InvestmentBalance } from "./InvestmentBalance";
import { SecurityList } from "../../seclist/SecurityList";
import { Aggregate_add } from "../../../../meta/Aggregate_Add";
import { Element_add } from "../../../../meta/Element_add";
import { ChildAggregate_add } from "../../../../meta/ChildAggregate_add";


/**
 * Aggregate for the investment statement download response.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export class InvestmentStatementResponse extends StatementResponse {

  private dateOfStatement: Date;
  private account: InvestmentAccountDetails;
  private investmentTransactionList: InvestmentTransactionList;
  private positionList: InvestmentPositionList;
  private accountBalance: InvestmentBalance;

  // This is not actually technically part of the INVSTMTRS, but according to Section 13.8.4,
  // OFX spec, this aggregate can appear in a statement response as part of the SECLISTMSGSRQV1
  // message set even when it wasn't requested. We include it here to make it accessible as part of
  // the AccountStatement
  private securityList: SecurityList;

  /**
   * Gets the name of the response message.
   *
   * @return the name of the response message
   */
  //@Override
  public getResponseMessageName(): string {
    return "investment statement";
  }

  /**
   * Gets the date and time for the statement download. This is a required field according to the
   * OFX spec.
   *
   * @return the date and time for the statement download
   */
  public getDateOfStatement(): Date {
    return this.dateOfStatement;
  }

  /**
   * Sets the date and time for the statement download. This is a required field according to the
   * OFX spec.
   *
   * @param dateOfStatement the date and time for the statement download
   */
  public setDateOfStatement(dateOfStatement: Date): void {
    this.dateOfStatement = dateOfStatement;
  }

  /**
   * Gets the account for the statement. This is a required field according to the OFX spec.
   *
   * @return the account for the statement
   */
  public getAccount(): InvestmentAccountDetails {
    return this.account;
  }

  /**
   * Sets the account for the statement. This is a required field according to the OFX spec.
   *
   * @param account the account for the statement
   */
  public setAccount(account: InvestmentAccountDetails): void {
    this.account = account;
  }

  /**
   * Gets the transaction list aggregate. This is an optional field according to the OFX spec.
   *
   * @return the transaction list aggregate
   */
  public getInvestmentTransactionList(): InvestmentTransactionList {
    return this.investmentTransactionList;
  }

  /**
   * Sets the transaction list aggregate. This is an optional field according to the OFX spec.
   *
   * @param transactionList the transaction list aggregate
   */
  public setInvestmentTransactionList(transactionList: InvestmentTransactionList): void {
    this.investmentTransactionList = transactionList;
  }

  /**
   * Gets the position list aggreate. This is an optional field according to the OFX spec.
   *
   * @return the position list aggregate
   */
  public getPositionList(): InvestmentPositionList {
    return this.positionList;
  }

  /**
   * Sets the position list aggreate. This is an optional field according to the OFX spec.
   *
   * @param positionList the position list aggregate
   */
  public setPositionList(positionList: InvestmentPositionList): void {
    this.positionList = positionList;
  }

  /**
   * Gets the account balance. This is an optional field according to the OFX spec.
   *
   * @return the account balance
   */
  public getAccountBalance(): InvestmentBalance {
    return this.accountBalance;
  }

  /**
   * Sets the account balance. This is an optional field according to the OFX spec.
   *
   * @param accountBalance the account balance
   */
  public setAccountBalance(accountBalance: InvestmentBalance): void {
    this.accountBalance = accountBalance;
  }

  /**
   * Gets the security list aggregate.
   * <br>
   * This is not actually technically part of the investment statement responsr aggregate, but
   * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
   * we provide it here for convenience.
   *
   * @return the security list aggregate
   */
  public getSecurityList(): SecurityList {
    return this.securityList;
  }

  /**
   * Sets the security list aggregate.
   * <br>
   * This is not actually technically part of the investment statement responsr aggregate, but
   * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
   * we provide it here for convenience.
   *
   * @param securityList the security list aggregate
   */
  public setSecurityList(securityList: SecurityList): void {
    this.securityList = securityList;
  }
}

Aggregate_add(InvestmentStatementResponse, "INVSTMTRS");
Element_add(InvestmentStatementResponse, { name: "DTASOF", required: true, order: 60, type: Date, read: InvestmentStatementResponse.prototype.getDateOfStatement, write: InvestmentStatementResponse.prototype.setDateOfStatement });
ChildAggregate_add(InvestmentStatementResponse, { name:"INVACCTFROM", required: true, order: 10, type: InvestmentAccountDetails, read: InvestmentStatementResponse.prototype.getAccount, write: InvestmentStatementResponse.prototype.setAccount });
ChildAggregate_add(InvestmentStatementResponse, { order: 70, type: InvestmentTransactionList, read: InvestmentStatementResponse.prototype.getInvestmentTransactionList, write: InvestmentStatementResponse.prototype.setInvestmentTransactionList });
ChildAggregate_add(InvestmentStatementResponse, { order: 80, type: InvestmentPositionList, read: InvestmentStatementResponse.prototype.getPositionList, write: InvestmentStatementResponse.prototype.setPositionList });
ChildAggregate_add(InvestmentStatementResponse, { order: 90, type: InvestmentBalance, read: InvestmentStatementResponse.prototype.getAccountBalance, write: InvestmentStatementResponse.prototype.setAccountBalance });
