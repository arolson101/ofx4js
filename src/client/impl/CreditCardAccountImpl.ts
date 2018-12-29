import { BaseAccountImpl } from "./BaseAccountImpl";
import { CreditCardAccountDetails } from "../../domain/data/creditcard/CreditCardAccountDetails";
import { CreditCardAccount } from "../CreditCardAccount";
import { FinancialInstitutionImpl } from "./FinancialInstitutionImpl";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";
import { StatementResponse } from "../../domain/data/common/StatementResponse";
import { CreditCardResponseMessageSet } from "../../domain/data/creditcard/CreditCardResponseMessageSet";
import { MessageSetType } from "../../domain/data/MessageSetType";
import { OFXException } from "../../OFXException";
import { CreditCardStatementResponseTransaction } from "../../domain/data/creditcard/CreditCardStatementResponseTransaction";
import { CreditCardStatementResponse } from "../../domain/data/creditcard/CreditCardStatementResponse";
import { TransactionWrappedRequestMessage } from "../../domain/data/TransactionWrappedRequestMessage";
import { RequestMessage } from "../../domain/data/RequestMessage";
import { RequestMessageSet } from "../../domain/data/RequestMessageSet";
import { CreditCardRequestMessageSet } from "../../domain/data/creditcard/CreditCardRequestMessageSet";
import { CreditCardStatementRequestTransaction } from "../../domain/data/creditcard/CreditCardStatementRequestTransaction";
import { StatementRange } from "../../domain/data/common/StatementRange";
import { StatementRequest } from "../../domain/data/common/StatementRequest";
import { CreditCardStatementRequest } from "../../domain/data/creditcard/CreditCardStatementRequest";


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
