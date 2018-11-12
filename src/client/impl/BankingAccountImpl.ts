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
import { BaseAccountImpl } from "./BaseAccountImpl";
import { BankAccountDetails } from "../../domain/data/banking/BankAccountDetails";
import { BankAccount } from "../BankAccount";
import { FinancialInstitutionImpl } from "./FinancialInstitutionImpl";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";
import { StatementResponse } from "../../domain/data/common/StatementResponse";
import { BankingResponseMessageSet } from "../../domain/data/banking/BankingResponseMessageSet";
import { MessageSetType } from "../../domain/data/MessageSetType";
import { OFXException } from "../../OFXException";
import { BankStatementResponseTransaction } from "../../domain/data/banking/BankStatementResponseTransaction";
import { BankStatementResponse } from "../../domain/data/banking/BankStatementResponse";
import { TransactionWrappedRequestMessage } from "../../domain/data/TransactionWrappedRequestMessage";
import { RequestMessage } from "../../domain/data/RequestMessage";
import { RequestMessageSet } from "../../domain/data/RequestMessageSet";
import { BankingRequestMessageSet } from "../../domain/data/banking/BankingRequestMessageSet";
import { BankStatementRequestTransaction } from "../../domain/data/banking/BankStatementRequestTransaction";
import { StatementRange } from "../../domain/data/common/StatementRange";
import { StatementRequest } from "../../domain/data/common/StatementRequest";
import { BankStatementRequest } from "../../domain/data/banking/BankStatementRequest";


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
