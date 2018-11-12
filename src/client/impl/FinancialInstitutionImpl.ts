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
import { OFXConnection } from "../net/OFXConnection";
import { FinancialInstitutionData } from "../FinancialInstitutionData";
import { OFXException } from "../../OFXException";
import { FinancialInstitutionProfile } from "../FinancialInstitutionProfile";
import { RequestEnvelope } from "../../domain/data/RequestEnvelope";
import { SignonRequest } from "../../domain/data/signon/SignonRequest";
import { ProfileRequestMessageSet } from "../../domain/data/profile/ProfileRequestMessageSet";
import { ResponseEnvelope } from "../../domain/data/ResponseEnvelope";
import { AccountProfile } from "../../domain/data/signup/AccountProfile";
import { SignupRequestMessageSet } from "../../domain/data/signup/SignupRequestMessageSet";
import { BankAccountDetails } from "../../domain/data/banking/BankAccountDetails";
import { BankAccount } from "../BankAccount";
import { BankingAccountImpl } from "./BankingAccountImpl";
import { CreditCardAccountDetails } from "../../domain/data/creditcard/CreditCardAccountDetails";
import { CreditCardAccount } from "../CreditCardAccount";
import { CreditCardAccountImpl } from "./CreditCardAccountImpl";
import { InvestmentAccountDetails } from "../../domain/data/investment/accounts/InvestmentAccountDetails";
import { InvestmentAccount } from "../InvestmentAccount";
import { InvestmentAccountImpl } from "./InvestmentAccountImpl";
import { SortedSet } from "../../collections/SortedSet";
import { RequestMessageSet } from "../../domain/data/RequestMessageSet";
import { SignonRequestMessageSet } from "../../domain/data/signon/SignonRequestMessageSet";
import { ProfileResponseMessageSet } from "../../domain/data/profile/ProfileResponseMessageSet";
import { MessageSetType } from "../../domain/data/MessageSetType";
import { ProfileResponseTransaction } from "../../domain/data/profile/ProfileResponseTransaction";
import { ProfileResponse } from "../../domain/data/profile/ProfileResponse";
import { ApplicationSecurity } from "../../domain/data/ApplicationSecurity";
import { UnsupportedOFXSecurityTypeException } from "../../UnsupportedOFXSecurityTypeException";
import { ResponseMessageSet } from "../../domain/data/ResponseMessageSet";
import { NoOFXResponseException } from "../NoOFXResponseException";
import { SignonResponse } from "../../domain/data/signon/SignonResponse";
import { SignonResponseMessageSet } from "../../domain/data/signon/SignonResponseMessageSet";
import { StringSet } from "../../collections/collections";
import { TransactionWrappedRequestMessage } from "../../domain/data/TransactionWrappedRequestMessage";
import { RequestMessage } from "../../domain/data/RequestMessage";
import { instanceof_StatusHolder, StatusHolder } from "../../domain/data/common/StatusHolder";
import { TransactionWrappedResponseMessage } from "../../domain/data/TransactionWrappedResponseMessage";
import { ResponseMessage } from "../../domain/data/ResponseMessage";
import { OFXTransactionException } from "../../OFXTransactionException";
import { Status, KnownCode } from "../../domain/data/common/Status";
import { OFXStatusException } from "../../OFXStatusException";
import { ProfileRequestTransaction } from "../../domain/data/profile/ProfileRequestTransaction";
import { ProfileRequest } from "../../domain/data/profile/ProfileRequest";
import { OFXApplicationContextHolder } from "../context/OFXApplicationContextHolder";
import { AccountInfoRequestTransaction } from "../../domain/data/signup/AccountInfoRequestTransaction";
import { AccountInfoRequest } from "../../domain/data/signup/AccountInfoRequest";
import { SignupResponseMessageSet } from "../../domain/data/signup/SignupResponseMessageSet";
import { AccountInfoResponseTransaction } from "../../domain/data/signup/AccountInfoResponseTransaction";
import { AccountInfoResponse } from "../../domain/data/signup/AccountInfoResponse";
import { FinancialInstitution } from "../../domain/data/signon/FinancialInstitution";


//import java.net.URL;

/**
 * Base implementation for the financial institution.
 *
 * @author Ryan Heaton
 */
export class FinancialInstitutionImpl extends FinancialInstitution {

  private connection: OFXConnection;
  private data: FinancialInstitutionData;

  constructor(data: FinancialInstitutionData, connection: OFXConnection) {
    super();
    if (data == null) {
      throw new OFXException("Data cannot be null");
    }
    if (connection == null) {
      throw new OFXException("An OFX connection must be supplied");
    }

    this.data = data;
    this.connection = connection;
  }

  // Inherited.
  public readProfile() /*throws OFXException*/: Promise<FinancialInstitutionProfile> {
    var request: RequestEnvelope = this.createAuthenticatedRequest(SignonRequest.ANONYMOUS_USER, SignonRequest.ANONYMOUS_USER);
    var profileRequest: ProfileRequestMessageSet = new ProfileRequestMessageSet();
    profileRequest.setProfileRequest(this.createProfileTransaction());
    request.getMessageSets().insert(profileRequest);
    return this.sendRequest(request, this.getData().getOFXURL())
    .then((response: ResponseEnvelope): FinancialInstitutionProfile => {
      this.doGeneralValidationChecks(request, response);
      return this.getProfile(response);
    });
  }

  // Inherited.
  public readAccountProfiles(username: string, password: string) /*throws OFXException*/: Promise<Array<AccountProfile>> {
    var request: RequestEnvelope = this.createAuthenticatedRequest(username, password);
    var signupRequest: SignupRequestMessageSet = new SignupRequestMessageSet();
    signupRequest.setAccountInfoRequest(this.createAccountInfoTransaction());
    request.getMessageSets().insert(signupRequest);
    return this.sendRequest(request, this.getData().getOFXURL())
    .then((response: ResponseEnvelope): Array<AccountProfile> => {
      this.doGeneralValidationChecks(request, response);
      return this.getAccountProfiles(response);
    });
  }

  // Inherited.
  public loadBankAccount(details: BankAccountDetails, username: string, password: string): BankAccount {
    return new BankingAccountImpl(details, username, password, this);
  }

  // Inherited.
  public loadCreditCardAccount(details: CreditCardAccountDetails, username: string, password: string): CreditCardAccount {
    return new CreditCardAccountImpl(details, username, password, this);
  }

  // Inherited
  public loadInvestmentAccount(details: InvestmentAccountDetails, username: string, password: string): InvestmentAccount {
    return new InvestmentAccountImpl(details, username, password, this);
  }

  /**
   * Create an authenticated request envelope.
   *
   * @param username The username.
   * @param password The password.
   * @return The request envelope.
   */
  public createAuthenticatedRequest(username: string, password: string): RequestEnvelope {
    var request: RequestEnvelope = new RequestEnvelope();
    var messageSets: SortedSet<RequestMessageSet> = new SortedSet<RequestMessageSet>(RequestMessageSet.contentCompare);
    var signonRequest: SignonRequestMessageSet = new SignonRequestMessageSet();
    signonRequest.setSignonRequest(this.createSignonRequest(username, password));
    messageSets.insert(signonRequest);
    request.setMessageSets(messageSets);
    return request;
  }

//  /**
//   * Send a request.
//   *
//   * @param request The request.
//   * @return The request.
//   */
//  protected sendRequest(request: RequestEnvelope) /*throws OFXConnectionException*/: ResponseEnvelope {
//    return this.getConnection().sendRequest(request, getData().getOFXURL());
//  }

  /**
   * Send a request to a specific URL.
   *
   * @param request The request.
   * @param url The url.
   * @return The request.
   */
  public sendRequest(request: RequestEnvelope, url: string = this.getData().getOFXURL()) /*throws OFXConnectionException*/: Promise<ResponseEnvelope> {
    return this.getConnection().sendRequest(request, url);
  }

  /**
   * Open the specified response envelope and look for the profile.
   *
   * @param response The response envelope.
   * @return The profile.
   */
  protected getProfile(response: ResponseEnvelope) /*throws OFXException*/: FinancialInstitutionProfile {

    var profileSet: ProfileResponseMessageSet = <ProfileResponseMessageSet> response.getMessageSet(MessageSetType.profile);
    if (profileSet == null) {
      throw new OFXException("No profile response set.");
    }

    var transactionResponse: ProfileResponseTransaction = profileSet.getProfileResponse();
    if (transactionResponse == null) {
      throw new OFXException("No profile transaction wrapper.");
    }

    var message: ProfileResponse = transactionResponse.getMessage();
    if (message == null) {
      throw new OFXException("No profile message.");
    }
    return message;
  }

  /**
   * General validation checks on the specified response.
   *
   * @param request The request.
   * @param response Their response.
   * @throws OFXException Upon invalid response.
   */
  public doGeneralValidationChecks(request: RequestEnvelope, response: ResponseEnvelope) /*throws OFXException*/: void {
    if (response.getSecurity() != ApplicationSecurity.NONE) {
      throw new UnsupportedOFXSecurityTypeException("Unable to participate in " + response.getSecurity() + " security.");
    }

    if (request.getUID() !== response.getUID()) {
      throw new OFXException("Invalid transaction ID '" + response.getUID() + "' in response.  Expected: " + request);
    }

    for (var requestSet of request.getMessageSets().values()) {
      var responseSet: ResponseMessageSet = response.getMessageSet(requestSet.getType());
      if (responseSet == null) {
        throw new NoOFXResponseException("No response for the " + requestSet.getType() + " request.");
      }

      if (responseSet.getType() == MessageSetType.signon) {
        var signonResponse: SignonResponse = (<SignonResponseMessageSet> responseSet).getSignonResponse();

        if (signonResponse == null) {
          throw new NoOFXResponseException("No signon response.");
        }
      }

      var transactionIds: StringSet = {};
      for (var requestMessage of requestSet.getRequestMessages()) {
        if (requestMessage instanceof TransactionWrappedRequestMessage) {
          transactionIds[(<TransactionWrappedRequestMessage<RequestMessage>> requestMessage).getUID()] = true;
        }
      }

      for (var responseMessage of responseSet.getResponseMessages()) {
        if (instanceof_StatusHolder(responseMessage)) {
          this.validateStatus(<StatusHolder><any>responseMessage);
        }

        if (responseMessage instanceof TransactionWrappedResponseMessage) {
          var uid: string = (<TransactionWrappedResponseMessage<ResponseMessage>> responseMessage).getUID();
          if (uid == null) {
            throw new OFXTransactionException("Invalid response transaction: no UID.");
          }
          else if (!(uid in transactionIds)) {
            throw new OFXTransactionException("Response to an unknown transaction: " + uid + ".");
          } else {
            delete transactionIds[uid];
          }
        }
      }

      if (Object.keys(transactionIds).length != 0) {
        throw new OFXTransactionException("No response to the following transactions: " + transactionIds);
      }
    }
  }

  /**
   * Validate the status of the given status holder.
   *
   * @param statusHolder The status holder.
   */
  protected validateStatus(statusHolder: StatusHolder) /*throws OFXException*/: void {
    var status: Status = statusHolder.getStatus();
    if (status == null) {
      throw new OFXException("Invalid OFX response: no status returned in the " + statusHolder.getStatusHolderName() + " response.");
    }

    if (KnownCode.SUCCESS != status.getCode()) {
      var message: string = status.getMessage();
      if (message == null) {
        message = "No response status code.";

        if (status.getCode() != null) {
          message = status.getCode().getMessage();
        }
      }

      throw new OFXStatusException(status, "Invalid " + statusHolder.getStatusHolderName() + ": " + message);
    }
  }

  /**
   * Create a transaction message for a profile request.
   *
   * @return The transaction message.
   */
  protected createProfileTransaction(): ProfileRequestTransaction {
    var profileTx: ProfileRequestTransaction = new ProfileRequestTransaction();
    profileTx.setMessage(this.createProfileRequest());
    return profileTx;
  }

  /**
   * Create a profile request.
   *
   * @return The profile request.
   */
  protected createProfileRequest(): ProfileRequest {
    var profileRequest: ProfileRequest = new ProfileRequest();
    profileRequest.setProfileLastUpdated(new Date(0));
    return profileRequest;
  }

  /**
   * Create a sign-on request for the specified user.
   *
   * @param username The username.
   * @param password The password.
   * @return The signon request.
   */
  protected createSignonRequest(username: string, password: string): SignonRequest {
    var signonRequest: SignonRequest = new SignonRequest();
    signonRequest.setTimestamp(new Date());
    var fi: FinancialInstitution = new FinancialInstitution();
    fi.setId(this.getData().getFinancialInstitutionId());
    fi.setOrganization(this.getData().getOrganization());
    signonRequest.setFinancialInstitution(fi);
    signonRequest.setUserId(username);
    signonRequest.setPassword(password);
    signonRequest.setApplicationId(OFXApplicationContextHolder.getCurrentContext().getAppId());
    signonRequest.setApplicationVersion(OFXApplicationContextHolder.getCurrentContext().getAppVersion());
    return signonRequest;
  }

  /**
   * Create a transaction for an account info request.
   *
   * @return The transaction.
   */
  protected createAccountInfoTransaction(): AccountInfoRequestTransaction {
    var transaction: AccountInfoRequestTransaction = new AccountInfoRequestTransaction();
    transaction.setMessage(this.createAccountInfoRequest());
    return transaction;
  }

  /**
   * Create an account info request.
   *
   * @return The account info request.
   */
  protected createAccountInfoRequest(): AccountInfoRequest {
    return new AccountInfoRequest();
  }

  /**
   * Get the account profiles for the specified response envelope.
   *
   * @param response The response envelope.
   * @return The account profiles.
   */
  protected getAccountProfiles(response: ResponseEnvelope) /*throws OFXException*/: Array<AccountProfile> {
    var messageSet: SignupResponseMessageSet = <SignupResponseMessageSet> response.getMessageSet(MessageSetType.signup);
    if (messageSet == null) {
      throw new OFXException("No signup response message set.");
    }

    var transaction: AccountInfoResponseTransaction = messageSet.getAccountInfoResponse();
    if (transaction == null) {
      throw new OFXException("No account info transaction in the signup response.");
    }

    var infoResponse: AccountInfoResponse = transaction.getMessage();
    if (infoResponse == null) {
      throw new OFXException("No account info response in the transaction.");
    }

    return infoResponse.getAccounts();
  }

  /**
   * The connection used by this implementation.
   *
   * @return The connection used by this implementation.
   */
  public getConnection(): OFXConnection {
    return this.connection;
  }

  /**
   * The financial institution data.
   *
   * @return The financial institution data.
   */
  public getData(): FinancialInstitutionData {
    return this.data;
  }
}
