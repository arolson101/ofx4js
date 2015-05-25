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
///<reference path='../../OFXException'/>
///<reference path='../../client/AccountStatement'/>
///<reference path='../../client/FinancialInstitutionAccount'/>
///<reference path='../../domain/data/common/StatementRange'/>
///<reference path='../../domain/data/common/StatementRequest'/>
///<reference path='../../domain/data/common/StatementResponse'/>
///<reference path='../../domain/data/creditcard/CreditCardAccountDetails'/>
///<reference path='../../domain/data/investment/accounts/InvestmentAccountDetails'/>
///<reference path='../../domain/data/MessageSetType'/>

module ofx4js.client.impl {

import OFXException = ofx4js.OFXException;
import AccountStatement = ofx4js.client.AccountStatement;
import FinancialInstitutionAccount = ofx4js.client.FinancialInstitutionAccount;
//import data.* = ofx4js.domain.data.*;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
import StatementRange = ofx4js.domain.data.common.StatementRange;
import StatementRequest = ofx4js.domain.data.common.StatementRequest;
import StatementResponse = ofx4js.domain.data.common.StatementResponse;
import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;

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
      throw new OFXException("Illegal details");
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

    return this.institution.sendRequest(request)
    .then((response: ResponseEnvelope): AccountStatement => {
      this.institution.doGeneralValidationChecks(request, response);

      return this.unwrapStatementResponse(response);
    });
  }

  /**
   * Unwrap the statement response from the specified response envelope.
   *
   * @param response The response envelope to unwrap.
   * @return The response.
   */
  protected /*abstract*/ unwrapStatementResponse(response: ResponseEnvelope): StatementResponse /*throws OFXException*/ { throw new OFXException("abstract"); }

  /**
   * Create a request message set from the specified transaction.
   *
   * @param transaction The transaction.
   * @return The request message set.
   */
  protected /*abstract*/ createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet { throw new OFXException("abstract"); }

  /**
   * Create a transaction.
   *
   * @return The transaction.
   */
  protected /*abstract*/ createTransaction(): TransactionWrappedRequestMessage<RequestMessage> { throw new OFXException("abstract"); }

  /**
   * Create a statement request.
   *
   * @param details The details.
   * @param range the range.
   * @return The statement request.
   */
  protected /*abstract*/ createStatementRequest(details: D, range: StatementRange): StatementRequest { throw new OFXException("abstract"); }

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

}
