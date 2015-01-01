/*
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

"use strict";

var inherit = require("../../util/inherit");

var OFXApplicationContextHolder = require("../context/OFXApplicationContextHolder");
var Status = require("../../domain/data/common/Status");
var StatusHolder = require("../../domain/data/common/StatusHolder");
var SignonRequest = require("../../domain/data/signon/SignonRequest");
var SignonRequestMessageSet = require("../../domain/data/signon/SignonRequestMessageSet");
var FinancialInstitution = require("../FinancialInstitution");
var ProfileRequestMessageSet = require("../../domain/data/profile/ProfileRequestMessageSet");
var SignupRequestMessageSet = require("../../domain/data/signup/SignupRequestMessageSet");
var BankingAccountImpl = require("./BankingAccountImpl");
var CreditCardAccountImpl = require("./CreditCardAccountImpl");
var InvestmentAccountImpl = require("./InvestmentAccountImpl");
var RequestEnvelope = require("../../domain/data/RequestEnvelope");
var MessageSetType = require("../../domain/data/MessageSetType");
var ApplicationSecurity = require("../../domain/data/ApplicationSecurity");
var TransactionWrappedRequestMessage = require("../../domain/data/TransactionWrappedRequestMessage");
var TransactionWrappedResponseMessage = require("../../domain/data/TransactionWrappedResponseMessage");
var AccountInfoRequest = require("../../domain/data/signup/AccountInfoRequest");
var AccountInfoRequestTransaction = require("../../domain/data/signup/AccountInfoRequestTransaction");
var ProfileRequestTransaction = require("../../domain/data/profile/ProfileRequestTransaction");
var ProfileRequest = require("../../domain/data/profile/ProfileRequest");

/**
 * Base implementation for the financial institution.
 *
 * @class
 */
function FinancialInstitutionImpl () {

  /**
   * @name FinancialInstitutionImpl#connection
   * @type OFXConnection
   * @access private
   */
  this.connection = null;

  /**
   * @name FinancialInstitutionImpl#data
   * @type FinancialInstitutionData
   * @access private
   */
  this.data = null;
}

inherit(FinancialInstitutionImpl, "implements", FinancialInstitution);




FinancialInstitutionImpl.prototype.FinancialInstitutionImpl = function(/*FinancialInstitutionData*/ data, /*OFXConnection*/ connection) {
  if (data === null) {
    throw new Error("Data cannot be null");
  }
  if (connection === null) {
    throw new Error("An OFX connection must be supplied");
  }

  this.data = data;
  this.connection = connection;
};


// Inherited.
FinancialInstitutionImpl.prototype.readProfile = function() {
  var request = this.createAuthenticatedRequest(SignonRequest.ANONYMOUS_USER, SignonRequest.ANONYMOUS_USER);
  var profileRequest = new ProfileRequestMessageSet();
  profileRequest.setProfileRequest(this.createProfileTransaction());
  request.getMessageSets().push(profileRequest);
  var response = this.sendRequest(request, this.getData().getOFXURL());
  this.doGeneralValidationChecks(request, response);
  return this.getProfile(response);
};


// Inherited.
FinancialInstitutionImpl.prototype.readAccountProfiles = function(/*String*/ username, /*String*/ password) {
  var request = this.createAuthenticatedRequest(username, password);
  var signupRequest = new SignupRequestMessageSet();
  signupRequest.setAccountInfoRequest(this.createAccountInfoTransaction());
  request.getMessageSets().push(signupRequest);
  var response = this.sendRequest(request, this.getData().getOFXURL());
  this.doGeneralValidationChecks(request, response);
  return this.getAccountProfiles(response);
};


// Inherited.
FinancialInstitutionImpl.prototype.loadBankAccount = function(/*BankAccountDetails*/ details, /*String*/ username, /*String*/ password) {
  return new BankingAccountImpl(details, username, password, this);
};


// Inherited.
FinancialInstitutionImpl.prototype.loadCreditCardAccount = function(/*CreditCardAccountDetails*/ details, /*String*/ username, /*String*/ password) {
  return new CreditCardAccountImpl(details, username, password, this);
};


// Inherited
FinancialInstitutionImpl.prototype.loadInvestmentAccount = function(/*InvestmentAccountDetails*/ details, /*String*/ username, /*String*/ password) {
  return new InvestmentAccountImpl(details, username, password, this);
};


/**
 * Create an authenticated request envelope.
 *
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {RequestEnvelope} The request envelope.
 */
FinancialInstitutionImpl.prototype.createAuthenticatedRequest = function(username, password) {
  var request = new RequestEnvelope();
  var messageSets = {};
  var signonRequest = new SignonRequestMessageSet();
  signonRequest.setSignonRequest(this.createSignonRequest(username, password));
  messageSets[signonRequest] = signonRequest;
  request.setMessageSets(messageSets);
  return request;
};


/**
 * Send a request.
 *
 * @param {RequestEnvelope} request The request.
 * @return {ResponseEnvelope} The request.
 */
FinancialInstitutionImpl.prototype.sendRequest = function(request) {
  return this.getConnection().sendRequest(request, this.getData().getOFXURL());
};


/**
 * Send a request to a specific URL.
 *
 * @param {RequestEnvelope} request The request.
 * @param {URL} url The url.
 * @return {ResponseEnvelope} The request.
 */
FinancialInstitutionImpl.prototype.sendRequest = function(request, url) {
  return this.getConnection().sendRequest(request, url);
};


/**
 * Open the specified response envelope and look for the profile.
 *
 * @param {ResponseEnvelope} response The response envelope.
 * @return {FinancialInstitutionProfile} The profile.
 */
FinancialInstitutionImpl.prototype.getProfile = function(response) {

  var profileSet = response.getMessageSet(MessageSetType.profile);
  if (profileSet === null) {
    throw new Error("No profile response set.");
  }

  var transactionResponse = profileSet.getProfileResponse();
  if (transactionResponse === null) {
    throw new Error("No profile transaction wrapper.");
  }

  var message = transactionResponse.getMessage();
  if (message === null) {
    throw new Error("No profile message.");
  }
  return message;
};


/**
 * General validation checks on the specified response.
 *
 * @param {RequestEnvelope} request The request.
 * @param {ResponseEnvelope} response Their response.
 * @throws OFXException Upon invalid response.
 */
FinancialInstitutionImpl.prototype.doGeneralValidationChecks = function(request, response) {
  if (response.getSecurity() != ApplicationSecurity.NONE) {
    throw new Error(String.format("Unable to participate in %s security.", response.getSecurity()));
  }

  if (request.getUID() !== response.getUID()) {
    throw new Error(String.format("Invalid transaction ID '%s' in response.  Expected: %s", response.getUID(), request));
  }

  var messageSets = request.getMessageSets();
  for (var messageSetsIdx=0; messageSetsIdx<messageSets.length; messageSetsIdx++) {
    var requestSet = messageSets[messageSetsIdx];
    var responseSet = response.getMessageSet(requestSet.getType());
    if (responseSet === null) {
      throw new Error("No response for the " + requestSet.getType() + " request.");
    }

    if (responseSet.getType() === MessageSetType.signon) {
      var signonResponse = responseSet.getSignonResponse();

      if (signonResponse === null) {
        throw new Error("No signon response.");
      }
    }

    var transactionIds = {};
    var requestMessages = requestSet.getRequestMessages();
    for (var requestMessagesIdx=0; requestMessagesIdx<requestMessages.length; requestMessages++) {
      var requestMessage = requestMessages[requestMessagesIdx];
      if (requestMessage instanceof TransactionWrappedRequestMessage) {
        transactionIds[requestMessage.getUID()] = 1;
      }
    }

    var responseMessages = responseSet.getResponseMessages();
    for (var responseMessagesIdx=0; responseMessagesIdx<responseMessages.length; responseMessagesIdx++) {
      var responseMessage = responseMessages[responseMessagesIdx];
      if (responseMessage instanceof StatusHolder) {
        this.validateStatus(responseMessage);
      }

      if (responseMessage instanceof TransactionWrappedResponseMessage) {
        var uid = responseMessage.getUID();
        if (uid === null) {
          throw new Error("Invalid response transaction: no UID.");
        }
        else if (!transactionIds.remove(uid)) {
          throw new Error("Response to an unknown transaction: " + uid + ".");
        }
      }
    }

    if (transactionIds.length > 0) {
      throw new Error("No response to the following transactions: " + transactionIds);
    }
  }
};


/**
 * Validate the status of the given status holder.
 *
 * @param {StatusHolder} statusHolder The status holder.
 */
FinancialInstitutionImpl.prototype.validateStatus = function(statusHolder) {
  var status = statusHolder.getStatus();
  if (status === null) {
    throw new Error("Invalid OFX response: no status returned in the " + statusHolder.getStatusHolderName() + " response.");
  }

  if (Status.KnownCode.SUCCESS !== status.getCode()) {
    var message = status.getMessage();
    if (message === null) {
      message = "No response status code.";

      if (status.getCode() !== null) {
        message = status.getCode().getMessage();
      }
    }

    throw new Error(status, "Invalid " + statusHolder.getStatusHolderName() + ": " + message);
  }
};


/**
 * Create a transaction message for a profile request.
 *
 * @return {ProfileRequestTransaction} The transaction message.
 */
FinancialInstitutionImpl.prototype.createProfileTransaction = function() {
  var profileTx = new ProfileRequestTransaction();
  profileTx.setMessage(this.createProfileRequest());
  return profileTx;
};


/**
 * Create a profile request.
 *
 * @return {ProfileRequest} The profile request.
 */
FinancialInstitutionImpl.prototype.createProfileRequest = function() {
  var profileRequest = new ProfileRequest();
  profileRequest.setProfileLastUpdated(new Date(0));
  return profileRequest;
};


/**
 * Create a sign-on request for the specified user.
 *
 * @param {String} username The username.
 * @param {String} password The password.
 * @return {SignonRequest} The signon request.
 */
FinancialInstitutionImpl.prototype.createSignonRequest = function(username, password) {
  var signonRequest = new SignonRequest();
  signonRequest.setTimestamp(new Date());
  var fi = new FinancialInstitution();
  fi.setId(this.getData().getFinancialInstitutionId());
  fi.setOrganization(this.getData().getOrganization());
  signonRequest.setFinancialInstitution(fi);
  signonRequest.setUserId(username);
  signonRequest.setPassword(password);
  signonRequest.setApplicationId(OFXApplicationContextHolder.getCurrentContext().getAppId());
  signonRequest.setApplicationVersion(OFXApplicationContextHolder.getCurrentContext().getAppVersion());
  return signonRequest;
};


/**
 * Create a transaction for an account info request.
 *
 * @return {AccountInfoRequestTransaction} The transaction.
 */
FinancialInstitutionImpl.prototype.createAccountInfoTransaction = function() {
  var transaction = new AccountInfoRequestTransaction();
  transaction.setMessage(this.createAccountInfoRequest());
  return transaction;
};


/**
 * Create an account info request.
 *
 * @return {AccountInfoRequest} The account info request.
 */
FinancialInstitutionImpl.prototype.createAccountInfoRequest = function() {
  return new AccountInfoRequest();
};


/**
 * Get the account profiles for the specified response envelope.
 *
 * @param {ResponseEnvelope} response The response envelope.
 * @return {Collection<AccountProfile>} The account profiles.
 */
FinancialInstitutionImpl.prototype.getAccountProfiles = function(response) {
  var messageSet = response.getMessageSet(MessageSetType.signup);
  if (messageSet === null) {
    throw new Error("No signup response message set.");
  }

  var transaction = messageSet.getAccountInfoResponse();
  if (transaction === null) {
    throw new Error("No account info transaction in the signup response.");
  }

  var infoResponse = transaction.getMessage();
  if (infoResponse === null) {
    throw new Error("No account info response in the transaction.");
  }

  return infoResponse.getAccounts();
};


/**
 * The connection used by this implementation.
 *
 * @return {OFXConnection} The connection used by this implementation.
 */
FinancialInstitutionImpl.prototype.getConnection = function() {
  return this.connection;
};


/**
 * The financial institution data.
 *
 * @return {FinancialInstitutionData} The financial institution data.
 */
FinancialInstitutionImpl.prototype.getData = function() {
  return this.data;
};




module.exports = FinancialInstitutionImpl;
