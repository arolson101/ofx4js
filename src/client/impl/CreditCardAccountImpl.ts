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
///<reference path='../../domain/data/common/StatementResponse'/>
///<reference path='../../domain/data/common/StatementRequest'/>
///<reference path='../../domain/data/common/StatementRange'/>
///<reference path='../../domain/data/ResponseEnvelope'/>
///<reference path='../../domain/data/creditcard/CreditCardStatementRequest'/>
///<reference path='../../domain/data/creditcard/CreditCardRequestMessageSet'/>
///<reference path='../../domain/data/creditcard/CreditCardResponseMessageSet'/>
///<reference path='../../domain/data/creditcard/CreditCardStatementResponse'/>
///<reference path='../../OFXException'/>
///<reference path='../CreditCardAccount'/>
///<reference path='BaseAccountImpl'/>
///<reference path='FinancialInstitutionImpl'/>

module ofx4js.client.impl {

import StatementResponse = ofx4js.domain.data.common.StatementResponse;
import StatementRequest = ofx4js.domain.data.common.StatementRequest;
import StatementRange = ofx4js.domain.data.common.StatementRange;
//import data.* = ofx4js.domain.data.*;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
//import creditcard.* = ofx4js.domain.data.creditcard.*;
import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
import CreditCardRequestMessageSet = ofx4js.domain.data.creditcard.CreditCardRequestMessageSet;
import CreditCardResponseMessageSet = ofx4js.domain.data.creditcard.CreditCardResponseMessageSet;
import CreditCardStatementRequest = ofx4js.domain.data.creditcard.CreditCardStatementRequest;
import CreditCardStatementResponse = ofx4js.domain.data.creditcard.CreditCardStatementResponse;
import CreditCardStatementRequestTransaction = ofx4js.domain.data.creditcard.CreditCardStatementRequestTransaction;
import CreditCardStatementResponseTransaction = ofx4js.domain.data.creditcard.CreditCardStatementResponseTransaction;
import OFXException = ofx4js.OFXException;
import CreditCardAccount = ofx4js.client.CreditCardAccount;

/**
 * @author Ryan Heaton
 */
export class CreditCardAccountImpl extends BaseAccountImpl<CreditCardAccountDetails> implements CreditCardAccount {

  constructor(details: CreditCardAccountDetails, username: string, password: string, institution: FinancialInstitutionImpl) {
    super(details, username, password, institution);
  }

  protected unwrapStatementResponse(response: ResponseEnvelope) /*throws OFXException*/: StatementResponse {
    var creditCardSet: CreditCardResponseMessageSet = <CreditCardResponseMessageSet> response.getMessageSet(MessageSetType.creditcard);
    if (creditCardSet == null) {
      throw new OFXException("No credit card response message set.");
    }

    var statementTransactionResponse: CreditCardStatementResponseTransaction = creditCardSet.getStatementResponse();
    if (statementTransactionResponse == null) {
      throw new OFXException("No credit card statement response transaction.");
    }

    var statement: CreditCardStatementResponse = statementTransactionResponse.getMessage();
    if (statement == null) {
      throw new OFXException("No credit card statement in the transaction.");
    }

    return statement;
  }

  protected createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet {
    var creditCardRequest: CreditCardRequestMessageSet = new CreditCardRequestMessageSet();
    creditCardRequest.setStatementRequest(<CreditCardStatementRequestTransaction> transaction);
    return creditCardRequest;
  }

  protected createTransaction(): TransactionWrappedRequestMessage<RequestMessage> {
    return new CreditCardStatementRequestTransaction();
  }

  protected createStatementRequest(details: CreditCardAccountDetails, range: StatementRange): StatementRequest {
    var bankRequest: CreditCardStatementRequest = new CreditCardStatementRequest();
    bankRequest.setAccount(details);
    bankRequest.setStatementRange(range);
    return bankRequest;
  }

}

}
