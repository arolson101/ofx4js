"use strict";

var inherit = require("../../util/inherit");

var InvestmentAccount = require("../InvestmentAccount");
var StatementRange = require("../../domain/data/common/StatementRange");
var IncludePosition = require("../../domain/data/investment/statements/IncludePosition");
var InvestmentStatementRequestTransaction = require("../../domain/data/investment/statements/InvestmentStatementRequestTransaction");
var SecurityListRequestTransaction = require("../../domain/data/seclist/SecurityListRequestTransaction");
var MessageSetType = require("../../domain/data/MessageSetType");
var InvestmentStatementRequestMessageSet = require("../../domain/data/investment/statements/InvestmentStatementRequestMessageSet");
var InvestmentStatementRequest = require("../../domain/data/investment/statements/InvestmentStatementRequest");
var SecurityListRequestMessageSet = require("../../domain/data/seclist/SecurityListRequestMessageSet");
var SecurityListRequest = require("../../domain/data/seclist/SecurityListRequest");

/**
 * @class
 */
function InvestmentAccountImpl () {

  /**
   * @name InvestmentAccountImpl#details
   * @type InvestmentAccountDetails
   * @access private
   */
  this.details = null;

  /**
   * @name InvestmentAccountImpl#username
   * @type String
   * @access private
   */
  this.username = null;

  /**
   * @name InvestmentAccountImpl#password
   * @type String
   * @access private
   */
  this.password = null;

  /**
   * @name InvestmentAccountImpl#institution
   * @type FinancialInstitutionImpl
   * @access private
   */
  this.institution = null;
}

inherit(InvestmentAccountImpl, "implements", InvestmentAccount);




InvestmentAccountImpl.prototype.InvestmentAccountImpl = function(/*InvestmentAccountDetails*/ details, /*String*/ username, /*String*/ password, /*FinancialInstitutionImpl*/ institution) {
  this.details = details;
  this.username = username;
  this.password = password;
  this.institution = institution;
};


InvestmentAccountImpl.prototype.readStatement = function(/*Date*/ start, /*Date*/ end) {
  var range = new StatementRange();
  range.setIncludeTransactions(true);
  range.setStart(start);
  range.setEnd(end);

  var request = this.institution.createAuthenticatedRequest(this.username, this.password);
  var requestTransaction = new InvestmentStatementRequestTransaction();
  requestTransaction.setWrappedMessage(this.createStatementRequest(this.getDetails(), range));
  request.getMessageSets().push(this.createStatementRequestMessageSet(requestTransaction));

  var response = this.institution.sendRequest(request);
  this.institution.doGeneralValidationChecks(request, response);

  return this.unwrapStatementResponse(response);
};


InvestmentAccountImpl.prototype.readSecurityList = function(/*SecurityRequest[]*/ securities) {
  var request = this.institution.createAuthenticatedRequest(this.username, this.password);
  var requestTransaction = new SecurityListRequestTransaction();
  requestTransaction.setWrappedMessage(this.createSecurityListRequest(securities));
  request.getMessageSets().push(this.createSecurityListRequestMessageSet(requestTransaction));

  var response = this.institution.sendRequest(request);
  this.institution.doGeneralValidationChecks(request, response);

  return this.unwrapSecurityList(response);
};


/**
 * The details of this account.
 *
 * @return {InvestmentAccountDetails} The details of this account.
 */
InvestmentAccountImpl.prototype.getDetails = function() {
  return this.details;
};


InvestmentAccountImpl.prototype.unwrapStatementResponse = function(/*ResponseEnvelope*/ response) {
  var investmentStatementSet = response.getMessageSet(MessageSetType.investment);
  if (!investmentStatementSet) {
    throw new Error("No investment response message set.");
  }

  var statementTransactionResponse = investmentStatementSet.getStatementResponse();
  if (!statementTransactionResponse) {
    throw new Error("No investment statement response transaction.");
  }

  var statement = statementTransactionResponse.getMessage();
  if (!statement) {
    throw new Error("No investment statement in the transaction.");
  }

  // See if there's a security list -- often sent back with an account statement by servers.
  var securityListMessageSet = response.getMessageSet(MessageSetType.investment_security);
  if (securityListMessageSet) {
    statement.setSecurityList(securityListMessageSet.getSecurityList());
  }

  return statement;
};


InvestmentAccountImpl.prototype.createStatementRequestMessageSet = function(/*InvestmentStatementRequestTransaction*/ transaction) {
  var investmentStatementRequest = new InvestmentStatementRequestMessageSet();
  investmentStatementRequest.setStatementRequest(transaction);
  return investmentStatementRequest;
};


InvestmentAccountImpl.prototype.createStatementRequest = function(/*InvestmentAccountDetails*/ details, /*StatementRange*/ range) {
  var investRequest = new InvestmentStatementRequest();
  investRequest.setAccount(details);
  investRequest.setStatementRange(range);
  investRequest.setIncludePosition(new IncludePosition());
  return investRequest;
};


InvestmentAccountImpl.prototype.createSecurityListRequestMessageSet = function(/*SecurityListRequestTransaction*/ transaction) {
  var securityListRequest = new SecurityListRequestMessageSet();
  securityListRequest.setSecurityListRequest(transaction);
  return securityListRequest;
};


InvestmentAccountImpl.prototype.createSecurityListRequest = function(/*SecurityRequest[]*/ securities) {
  var securityListRequest = new SecurityListRequest();
  securityListRequest.setSecurityRequests(securities);
  return securityListRequest;
};


InvestmentAccountImpl.prototype.unwrapSecurityList = function(/*ResponseEnvelope*/ response) {
  var securityListSet = response.getMessageSet(MessageSetType.investment_security);
  if (!securityListSet) {
    throw new Error("No security list response message set.");
  }

  var securityList = securityListSet.getSecurityList();
  if (!securityList) {
    throw new Error("No security list response transaction.");
  }

  return securityList;
};




module.exports = InvestmentAccountImpl;
