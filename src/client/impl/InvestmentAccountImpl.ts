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
///<reference path='../../client/InvestmentAccount'/>
///<reference path='../../domain/data/RequestEnvelope'/>
///<reference path='../../domain/data/ResponseEnvelope'/>
///<reference path='../../domain/data/common/StatementRange'/>
///<reference path='../../domain/data/common/StatementRequest'/>
///<reference path='../../domain/data/investment/statements/InvestmentStatementRequest'/>
///<reference path='../../domain/data/investment/statements/InvestmentStatementRequestMessageSet'/>
///<reference path='../../domain/data/investment/statements/InvestmentStatementResponse'/>
///<reference path='../../domain/data/investment/statements/InvestmentStatementRequestTransaction'/>
///<reference path='../../domain/data/investment/statements/InvestmentStatementResponseMessageSet'/>
///<reference path='../../domain/data/investment/statements/IncludePosition'/>
///<reference path='../../domain/data/seclist/SecurityListRequestTransaction'/>
///<reference path='../../domain/data/seclist/SecurityRequest'/>
///<reference path='../../domain/data/seclist/SecurityListRequestMessageSet'/>
///<reference path='../../domain/data/seclist/SecurityListResponseMessageSet'/>

module ofx4js.client.impl {

import OFXException = ofx4js.OFXException;
// import .* = ofx4js.domain.data.*;
import InvestmentAccount = ofx4js.client.InvestmentAccount;
import StatementRange = ofx4js.domain.data.common.StatementRange;
import StatementRequest = ofx4js.domain.data.common.StatementRequest;
import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
// import .* = ofx4js.domain.data.seclist.*;
// import .* = ofx4js.domain.data.investment.statements.*;
import IncludePosition = ofx4js.domain.data.investment.statements.IncludePosition;
import InvestmentStatementRequest = ofx4js.domain.data.investment.statements.InvestmentStatementRequest;
import InvestmentStatementRequestMessageSet = ofx4js.domain.data.investment.statements.InvestmentStatementRequestMessageSet;
import InvestmentStatementResponse = ofx4js.domain.data.investment.statements.InvestmentStatementResponse;
import InvestmentStatementRequestTransaction = ofx4js.domain.data.investment.statements.InvestmentStatementRequestTransaction;
import InvestmentStatementResponseMessageSet = ofx4js.domain.data.investment.statements.InvestmentStatementResponseMessageSet;
import InvestmentStatementResponseTransaction = ofx4js.domain.data.investment.statements.InvestmentStatementResponseTransaction;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import SecurityListRequestTransaction = ofx4js.domain.data.seclist.SecurityListRequestTransaction;
import SecurityRequest = ofx4js.domain.data.seclist.SecurityRequest;
import SecurityListRequest = ofx4js.domain.data.seclist.SecurityListRequest;
import SecurityListRequestMessageSet = ofx4js.domain.data.seclist.SecurityListRequestMessageSet;
import SecurityList = ofx4js.domain.data.seclist.SecurityList;
import SecurityListResponseMessageSet = ofx4js.domain.data.seclist.SecurityListResponseMessageSet;

/**
 * @author Jon Perlow
 */
export class InvestmentAccountImpl implements InvestmentAccount {
  private details: InvestmentAccountDetails;
  private username: string;
  private password: string;
  private institution: FinancialInstitutionImpl;

  constructor(details: InvestmentAccountDetails, username: string, password: string,
                               institution: FinancialInstitutionImpl) {
    this.details = details;
    this.username = username;
    this.password = password;
    this.institution = institution;
  }

  public readStatement(start: Date, end: Date) /*throws OFXException*/: Promise<InvestmentStatementResponse> {
    var range: StatementRange = new StatementRange();
    range.setIncludeTransactions(true);
    range.setStart(start);
    range.setEnd(end);

    var request: RequestEnvelope = this.institution.createAuthenticatedRequest(this.username, this.password);
    var requestTransaction: InvestmentStatementRequestTransaction = new InvestmentStatementRequestTransaction();
    requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
    request.getMessageSets().insert(this.createStatementRequestMessageSet(requestTransaction));

    var self = this;
    return self.institution.sendRequest(request)
    .then(function(response: ResponseEnvelope): InvestmentStatementResponse {
      self.institution.doGeneralValidationChecks(request, response);
      return self.unwrapStatementResponse(response);
    });
  }

  public readSecurityList(securities: Array<SecurityRequest>) /*throws OFXException*/: Promise<SecurityList> {
    var request: RequestEnvelope = this.institution.createAuthenticatedRequest(this.username, this.password);
    var requestTransaction: SecurityListRequestTransaction = new SecurityListRequestTransaction();
    requestTransaction.setWrappedMessage(this.createSecurityListRequest(securities));
    request.getMessageSets().insert(this.createSecurityListRequestMessageSet(requestTransaction));

    var self = this;
    return self.institution.sendRequest(request)
    .then(function(response: ResponseEnvelope): SecurityList {
      self.institution.doGeneralValidationChecks(request, response);
  
      return self.unwrapSecurityList(response);
    });
  }

  /**
   * The details of this account.
   *
   * @return The details of this account.
   */
  public getDetails(): InvestmentAccountDetails {
    return this.details;
  }

  private unwrapStatementResponse(response: ResponseEnvelope) /*throws OFXException*/: InvestmentStatementResponse {
    var investmentStatementSet: InvestmentStatementResponseMessageSet =
        <InvestmentStatementResponseMessageSet> response.getMessageSet(MessageSetType.investment);
    if (investmentStatementSet == null) {
      throw new OFXException("No investment response message set.");
    }

    var statementTransactionResponse: InvestmentStatementResponseTransaction =
        investmentStatementSet.getStatementResponse();
    if (statementTransactionResponse == null) {
      throw new OFXException("No investment statement response transaction.");
    }

    var statement: InvestmentStatementResponse = statementTransactionResponse.getMessage();
    if (statement == null) {
      throw new OFXException("No investment statement in the transaction.");
    }

    // See if there's a security list -- often sent back with an account statement by servers.
    var securityListMessageSet: SecurityListResponseMessageSet =
        <SecurityListResponseMessageSet> response.getMessageSet(
            MessageSetType.investment_security);
    if (securityListMessageSet != null) {
      statement.setSecurityList(securityListMessageSet.getSecurityList());
    }

    return statement;
  }

  private createStatementRequestMessageSet(transaction: InvestmentStatementRequestTransaction): RequestMessageSet {
    var investmentStatementRequest: InvestmentStatementRequestMessageSet =
        new InvestmentStatementRequestMessageSet();
    investmentStatementRequest.setStatementRequest(transaction);
    return investmentStatementRequest;
  }

  private createStatementRequest(details: InvestmentAccountDetails, range: StatementRange): InvestmentStatementRequest {
    var investRequest: InvestmentStatementRequest = new InvestmentStatementRequest();
    investRequest.setAccount(details);
    investRequest.setStatementRange(range);
    investRequest.setIncludePosition(new IncludePosition());
    return investRequest;
  }

  private createSecurityListRequestMessageSet(transaction: SecurityListRequestTransaction): RequestMessageSet {
    var securityListRequest: SecurityListRequestMessageSet =
        new SecurityListRequestMessageSet();
    securityListRequest.setSecurityListRequest(transaction);
    return securityListRequest;
  }

  private createSecurityListRequest(securities: Array<SecurityRequest>): SecurityListRequest {
    var securityListRequest: SecurityListRequest = new SecurityListRequest();
    securityListRequest.setSecurityRequests(securities);
    return securityListRequest;
  }

  private unwrapSecurityList(response: ResponseEnvelope) /*throws OFXException*/: SecurityList {
    var securityListSet: SecurityListResponseMessageSet =
        <SecurityListResponseMessageSet> response.getMessageSet(MessageSetType.investment_security);
    if (securityListSet == null) {
      throw new OFXException("No security list response message set.");
    }

    var securityList: SecurityList = securityListSet.getSecurityList();
    if (securityList == null) {
      throw new OFXException("No security list response transaction.");
    }

    return securityList;
  }
}

}
