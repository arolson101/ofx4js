import { FinancialInstitutionAccount } from "../FinancialInstitutionAccount";
import { MessageSetType } from "../../domain/data/MessageSetType";
import { FinancialInstitutionImpl } from "./FinancialInstitutionImpl";
import { BankAccountDetails } from "../../domain/data/banking/BankAccountDetails";
import { CreditCardAccountDetails } from "../../domain/data/creditcard/CreditCardAccountDetails";
import { InvestmentAccountDetails } from "../../domain/data/investment/accounts/InvestmentAccountDetails";
import { OFXException } from "../../OFXException";
import { AccountStatement } from "../AccountStatement";
import { StatementRange } from "../../domain/data/common/StatementRange";
import { RequestEnvelope } from "../../domain/data/RequestEnvelope";
import { TransactionWrappedRequestMessage } from "../../domain/data/TransactionWrappedRequestMessage";
import { RequestMessage } from "../../domain/data/RequestMessage";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";
import { StatementResponse } from "../../domain/data/common/StatementResponse";
import { RequestMessageSet } from "../../domain/data/RequestMessageSet";
import { StatementRequest } from "../../domain/data/common/StatementRequest";


/**
 * Base account implementation. Supports banking and credit card accounts.
 */
export abstract class BaseAccountImpl<D> implements FinancialInstitutionAccount {

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
  protected abstract unwrapStatementResponse(response: ResponseEnvelope): StatementResponse /*throws OFXException*/;

  /**
   * Create a request message set from the specified transaction.
   *
   * @param transaction The transaction.
   * @return The request message set.
   */
  protected abstract createRequestMessageSet(transaction: TransactionWrappedRequestMessage<RequestMessage>): RequestMessageSet;

  /**
   * Create a transaction.
   *
   * @return The transaction.
   */
  protected abstract createTransaction(): TransactionWrappedRequestMessage<RequestMessage>;

  /**
   * Create a statement request.
   *
   * @param details The details.
   * @param range the range.
   * @return The statement request.
   */
  protected abstract createStatementRequest(details: D, range: StatementRange): StatementRequest;

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
