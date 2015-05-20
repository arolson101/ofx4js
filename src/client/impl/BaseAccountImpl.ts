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
///<reference path="../../project.d.ts"/>
import {OFXException} from "../../OFXException";
import {AccountStatement} from "../AccountStatement";
import {FinancialInstitutionAccount} from "../FinancialInstitutionAccount";
//import data.* = ofx4js.domain.data.*;
import {MessageSetType} from "../../domain/data/MessageSetType";
import {RequestEnvelope} from "../../domain/data/RequestEnvelope";
import {ResponseEnvelope} from "../../domain/data/ResponseEnvelope";
import {RequestMessageSet} from "../../domain/data/RequestMessageSet";
import {RequestMessage} from "../../domain/data/RequestMessage";
import {TransactionWrappedRequestMessage} from "../../domain/data/TransactionWrappedRequestMessage";
import {BankAccountDetails} from "../../domain/data/banking/BankAccountDetails";
import {StatementRange} from "../../domain/data/common/StatementRange";
import {StatementRequest} from "../../domain/data/common/StatementRequest";
import {StatementResponse} from "../../domain/data/common/StatementResponse";
import {CreditCardAccountDetails} from "../../domain/data/creditcard/CreditCardAccountDetails";
import {InvestmentAccountDetails} from "../../domain/data/investment/accounts/InvestmentAccountDetails";
import {FinancialInstitutionImpl} from "FinancialInstitutionImpl";

/**
 * Base account implementation. Supports banking and credit card accounts.
 *
 * @author Ryan Heaton
 */
export /*abstract*/ class BaseAccountImpl<D> implements FinancialInstitutionAccount {

  private details: D;
  private messageType: MessageSetType;
  private username: string;
  private password: string;
  private institution: FinancialInstitutionImpl;

  constructor(details: D, username: string, password: string, institution: FinancialInstitutionImpl) {
    this.details = details;
    this.username = username;
    this.password = password;
    this.institution = institution;
    this.messageType = this.getMessageSetType(details);
  }

  /**
   * Get the message set type of the specified details.
   *
   * @param details The details.
   * @return The message set type.
   */
  protected getMessageSetType(details: D): MessageSetType {
    var messageType: MessageSetType;
    if (details instanceof BankAccountDetails) {
      messageType = MessageSetType.banking;
    }
    else if (this.getDetails() instanceof CreditCardAccountDetails) {
      messageType = MessageSetType.creditcard;
    }
    else if (this.getDetails() instanceof InvestmentAccountDetails) {
      messageType = MessageSetType.investment;
    }
    else {
      throw new Error("Illegal details");
    }
    return messageType;
  }

  public readStatement(start: Date, end: Date) /*throws OFXException*/: Promise<AccountStatement> {
    var range: StatementRange = new StatementRange();
    range.setIncludeTransactions(true);
    range.setStart(start);
    range.setEnd(end);

    var request: RequestEnvelope = this.institution.createAuthenticatedRequest(this.username, this.password);
    var requestTransaction: TransactionWrappedRequestMessage<RequestMessage> = this.createTransaction();
    requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
    request.getMessageSets().insert(this.createRequestMessageSet(requestTransaction));

    var self = this;
    return self.institution.sendRequest(request)
    .then(function(response: ResponseEnvelope): AccountStatement {
      self.institution.doGeneralValidationChecks(request, response);
  
      return self.unwrapStatementResponse(response);
    });
  }

  /**
   * Unwrap the statement response from the specified response envelope.
   *
   * @param response The response envelope to unwrap.
   * @return The response.
   */
  protected /*abstract*/ unwrapStatementResponse(response: ResponseEnvelope): StatementResponse /*throws OFXException*/ { throw new Error("abstract"); }

  /**
   * Create a request message set from the specified transaction.
   *
   * @param transaction The transaction.
   * @return The request message set.
   */
  protected /*abstract*/ createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet { throw new Error("abstract"); }

  /**
   * Create a transaction.
   *
   * @return The transaction.
   */
  protected /*abstract*/ createTransaction(): TransactionWrappedRequestMessage<RequestMessage> { throw new Error("abstract"); }

  /**
   * Create a statement request.
   *
   * @param details The details.
   * @param range the range.
   * @return The statement request.
   */
  protected /*abstract*/ createStatementRequest(details: D, range: StatementRange): StatementRequest { throw new Error("abstract"); }

  /**
   * The details of this account.
   *
   * @return The details of this account.
   */
  public getDetails(): D {
    return this.details;
  }

  /**
   * The message set type.
   *
   * @return The message set type.
   */
  protected getMessageType(): MessageSetType {
    return this.messageType;
  }
}

