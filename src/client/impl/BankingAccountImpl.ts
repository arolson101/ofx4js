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
///<reference path='../../domain/data/banking/BankingResponseMessageSet'/>
///<reference path='../../domain/data/banking/BankStatementRequest'/>
///<reference path='../../domain/data/banking/BankingRequestMessageSet'/>
///<reference path='../../OFXException'/>
///<reference path='../../client/BankAccount'/>
///<reference path='BaseAccountImpl'/>
///<reference path='FinancialInstitutionImpl'/>

module ofx4js.client.impl {

import StatementResponse = ofx4js.domain.data.common.StatementResponse;
import StatementRequest = ofx4js.domain.data.common.StatementRequest;
import StatementRange = ofx4js.domain.data.common.StatementRange;
//import data.* = ofx4js.domain.data.*;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
//import banking.* = ofx4js.domain.data.banking.*;
import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
import BankingResponseMessageSet = ofx4js.domain.data.banking.BankingResponseMessageSet;
import BankStatementRequest = ofx4js.domain.data.banking.BankStatementRequest;
import BankStatementResponse = ofx4js.domain.data.banking.BankStatementResponse;
import BankStatementResponseTransaction = ofx4js.domain.data.banking.BankStatementResponseTransaction;
import BankingRequestMessageSet = ofx4js.domain.data.banking.BankingRequestMessageSet;
import BankStatementRequestTransaction = ofx4js.domain.data.banking.BankStatementRequestTransaction;
import OFXException = ofx4js.OFXException;
import BankAccount = ofx4js.client.BankAccount;

/**
 * @author Ryan Heaton
 */
export class BankingAccountImpl extends BaseAccountImpl<BankAccountDetails> implements BankAccount {

  constructor(details: BankAccountDetails, username: string, password: string, institution: FinancialInstitutionImpl) {
    super(details, username, password, institution);
  }

  protected unwrapStatementResponse(response: ResponseEnvelope) /*throws OFXException*/: StatementResponse {
    var bankingSet: BankingResponseMessageSet = <BankingResponseMessageSet> response.getMessageSet(MessageSetType.banking);
    if (bankingSet == null) {
      throw new OFXException("No banking response message set.");
    }

    var statementTransactionResponse: BankStatementResponseTransaction = bankingSet.getStatementResponse();
    if (statementTransactionResponse == null) {
      throw new OFXException("No banking statement response transaction.");
    }

    var statement: BankStatementResponse = statementTransactionResponse.getMessage();
    if (statement == null) {
      throw new OFXException("No banking statement in the transaction.");
    }

    return statement;
  }

  protected createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet {
    var bankingRequest: BankingRequestMessageSet = new BankingRequestMessageSet();
    bankingRequest.setStatementRequest(<BankStatementRequestTransaction> transaction);
    return bankingRequest;
  }

  protected createTransaction(): TransactionWrappedRequestMessage<RequestMessage> {
    return new BankStatementRequestTransaction();
  }

  protected createStatementRequest(details: BankAccountDetails, range: StatementRange): StatementRequest {
    var bankRequest: BankStatementRequest = new BankStatementRequest();
    bankRequest.setAccount(details);
    bankRequest.setStatementRange(range);
    return bankRequest;
  }

}

}
