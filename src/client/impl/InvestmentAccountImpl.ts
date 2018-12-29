import { InvestmentAccount } from "../InvestmentAccount";
import { InvestmentAccountDetails } from "../../domain/data/investment/accounts/InvestmentAccountDetails";
import { FinancialInstitutionImpl } from "./FinancialInstitutionImpl";
import { InvestmentStatementResponse } from "../../domain/data/investment/statements/InvestmentStatementResponse";
import { StatementRange } from "../../domain/data/common/StatementRange";
import { RequestEnvelope } from "../../domain/data/RequestEnvelope";
import { InvestmentStatementRequestTransaction } from "../../domain/data/investment/statements/InvestmentStatementRequestTransaction";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";
import { SecurityRequest } from "../../domain/data/seclist/SecurityRequest";
import { SecurityList } from "../../domain/data/seclist/SecurityList";
import { SecurityListRequestTransaction } from "../../domain/data/seclist/SecurityListRequestTransaction";
import { InvestmentStatementResponseMessageSet } from "../../domain/data/investment/statements/InvestmentStatementResponseMessageSet";
import { MessageSetType } from "../../domain/data/MessageSetType";
import { OFXException } from "../../OFXException";
import { InvestmentStatementResponseTransaction } from "../../domain/data/investment/statements/InvestmentStatementResponseTransaction";
import { SecurityListResponseMessageSet } from "../../domain/data/seclist/SecurityListResponseMessageSet";
import { RequestMessageSet } from "../../domain/data/RequestMessageSet";
import { InvestmentStatementRequestMessageSet } from "../../domain/data/investment/statements/InvestmentStatementRequestMessageSet";
import { InvestmentStatementRequest } from "../../domain/data/investment/statements/InvestmentStatementRequest";
import { IncludePosition } from "../../domain/data/investment/statements/IncludePosition";
import { SecurityListRequestMessageSet } from "../../domain/data/seclist/SecurityListRequestMessageSet";
import { SecurityListRequest } from "../../domain/data/seclist/SecurityListRequest";


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

    return this.institution.sendRequest(request)
    .then((response: ResponseEnvelope): InvestmentStatementResponse => {
      this.institution.doGeneralValidationChecks(request, response);
      return this.unwrapStatementResponse(response);
    });
  }

  public readSecurityList(securities: Array<SecurityRequest>) /*throws OFXException*/: Promise<SecurityList> {
    var request: RequestEnvelope = this.institution.createAuthenticatedRequest(this.username, this.password);
    var requestTransaction: SecurityListRequestTransaction = new SecurityListRequestTransaction();
    requestTransaction.setWrappedMessage(this.createSecurityListRequest(securities));
    request.getMessageSets().insert(this.createSecurityListRequestMessageSet(requestTransaction));

    return this.institution.sendRequest(request)
    .then((response: ResponseEnvelope): SecurityList => {
      this.institution.doGeneralValidationChecks(request, response);

      return this.unwrapSecurityList(response);
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
