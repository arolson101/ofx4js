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
///<reference path='../../collections/SortedSet'/>
///<reference path='../../OFXException'/>
///<reference path='../../OFXStatusException'/>
///<reference path='../../client/NoOFXResponseException'/>
///<reference path='../../UnsupportedOFXSecurityTypeException'/>
///<reference path='../../OFXTransactionException'/>
///<reference path='../context/OFXApplicationContextHolder'/>
///<reference path='../../domain/data/signon/SignonRequest'/>
///<reference path='../../domain/data/signon/SignonRequestMessageSet'/>
///<reference path='../../domain/data/signup/SignupRequestMessageSet'/>
///<reference path='../../domain/data/signup/SignupResponseMessageSet'/>
///<reference path='../../domain/data/common/StatusHolder'/>
///<reference path='../../domain/data/profile/ProfileRequestMessageSet'/>
///<reference path='../../domain/data/profile/ProfileRequestTransaction'/>
///<reference path='../../domain/data/profile/ProfileResponse'/>
///<reference path='../../domain/data/profile/ProfileResponseMessageSet'/>
///<reference path='../../domain/data/profile/ProfileResponseTransaction'/>
///<reference path='../../domain/data/signup/AccountProfile'/>
///<reference path='../../domain/data/signup/AccountInfoRequest'/>
///<reference path='../../domain/data/signup/AccountInfoResponse'/>
///<reference path='../../domain/data/ApplicationSecurity'/>
///<reference path='../../domain/data/RequestEnvelope'/>
///<reference path='../../domain/data/RequestMessageSet'/>
///<reference path='../../domain/data/ResponseMessageSet'/>
///<reference path='../net/OFXConnection'/>
///<reference path='../net/OFXConnectionException'/>
///<reference path='../BankAccount'/>
///<reference path='../FinancialInstitution'/>
///<reference path='BankingAccountImpl'/>
///<reference path='InvestmentAccountImpl'/>

module ofx4js.client.impl {

import SortedSet = ofx4js.collections.SortedSet;
import OFXException = ofx4js.OFXException;
import OFXStatusException = ofx4js.OFXStatusException;
import UnsupportedOFXSecurityTypeException = ofx4js.UnsupportedOFXSecurityTypeException;
import OFXTransactionException = ofx4js.OFXTransactionException;
import NoOFXResponseException = ofx4js.client.NoOFXResponseException;
//import client.* = ofx4js.client.*;
import OFXApplicationContextHolder = ofx4js.client.context.OFXApplicationContextHolder;
//import data.* = ofx4js.domain.data.*;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import ResponseMessage = ofx4js.domain.data.ResponseMessage;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import ResponseMessageSet = ofx4js.domain.data.ResponseMessageSet;
import TransactionWrappedRequestMessage = ofx4js.domain.data.TransactionWrappedRequestMessage;
import TransactionWrappedResponseMessage = ofx4js.domain.data.TransactionWrappedResponseMessage;
import AccountProfile = ofx4js.domain.data.signup.AccountProfile;
import AccountInfoRequest = ofx4js.domain.data.signup.AccountInfoRequest;
import AccountInfoRequestTransaction = ofx4js.domain.data.signup.AccountInfoRequestTransaction;
import AccountInfoResponse = ofx4js.domain.data.signup.AccountInfoResponse;
import AccountInfoResponseTransaction = ofx4js.domain.data.signup.AccountInfoResponseTransaction;
import ApplicationSecurity = ofx4js.domain.data.ApplicationSecurity;
import RequestEnvelope = ofx4js.domain.data.RequestEnvelope;
import ResponseEnvelope = ofx4js.domain.data.ResponseEnvelope;
import ProfileRequest = ofx4js.domain.data.profile.ProfileRequest;
import ProfileRequestMessageSet = ofx4js.domain.data.profile.ProfileRequestMessageSet;
import ProfileRequestTransaction = ofx4js.domain.data.profile.ProfileRequestTransaction;
import ProfileResponse = ofx4js.domain.data.profile.ProfileResponse;
import ProfileResponseMessageSet = ofx4js.domain.data.profile.ProfileResponseMessageSet;
import ProfileResponseTransaction = ofx4js.domain.data.profile.ProfileResponseTransaction;
import InvestmentAccount = ofx4js.client.InvestmentAccount;
import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
//import signup.* = ofx4js.domain.data.signup.*;
import CreditCardAccountDetails = ofx4js.domain.data.creditcard.CreditCardAccountDetails;
import BankAccountDetails = ofx4js.domain.data.banking.BankAccountDetails;
import Status = ofx4js.domain.data.common.Status;
import KnownCode = ofx4js.domain.data.common.KnownCode;
import StatusHolder = ofx4js.domain.data.common.StatusHolder;
import instanceof_StatusHolder = ofx4js.domain.data.common.instanceof_StatusHolder;
import SignonRequest = ofx4js.domain.data.signon.SignonRequest;
//import profile.* = ofx4js.domain.data.signon.SignonRequest;
import SignonRequestMessageSet = ofx4js.domain.data.signon.SignonRequestMessageSet;
import SignonResponse = ofx4js.domain.data.signon.SignonResponse;
import SignonResponseMessageSet = ofx4js.domain.data.signon.SignonResponseMessageSet;
import SignupRequestMessageSet = ofx4js.domain.data.signup.SignupRequestMessageSet;
import SignupResponseMessageSet = ofx4js.domain.data.signup.SignupResponseMessageSet;
import OFXConnection = ofx4js.client.net.OFXConnection;
import OFXConnectionException = ofx4js.client.net.OFXConnectionException;
import BankAccount = ofx4js.client.BankAccount;

//import java.net.URL;

/**
 * Base implementation for the financial institution.
 *
 * @author Ryan Heaton
 */
export class FinancialInstitutionImpl implements FinancialInstitution {

  private connection: OFXConnection;
  private data: FinancialInstitutionData;

  constructor(data: FinancialInstitutionData, connection: OFXConnection) {
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
    var fi: ofx4js.domain.data.signon.FinancialInstitution = new ofx4js.domain.data.signon.FinancialInstitution();
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

}
