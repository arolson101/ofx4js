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

var inherit = require("../../../../util/inherit");

var StatementResponse = require("../../common/StatementResponse");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var InvestmentAccountDetails = require("../accounts/InvestmentAccountDetails");
var InvestmentTransactionList = require("../transactions/InvestmentTransactionList");
var InvestmentPositionList = require("../positions/InvestmentPositionList");
var InvestmentBalance = require("./InvestmentBalance");


/**
 * Aggregate for the investment statement download response.
 * @see "Section 13.9.2.2, OFX Spec"
 *
 * @class
 * @augments StatementResponse
 */
function InvestmentStatementResponse () {
  StatementResponse.call(this);

  /**
   * @name InvestmentStatementResponse#dateOfStatement
   * @type Date
   * @access private
   */
  this.dateOfStatement = null;

  /**
   * @name InvestmentStatementResponse#account
   * @type InvestmentAccountDetails
   * @access private
   */
  this.account = null;

  /**
   * @name InvestmentStatementResponse#transactionList
   * @type InvestmentTransactionList
   * @access private
   */
  this.transactionList = null;

  /**
   * @name InvestmentStatementResponse#positionList
   * @type InvestmentPositionList
   * @access private
   */
  this.positionList = null;

  /**
   * @name InvestmentStatementResponse#accountBalance
   * @type InvestmentBalance
   * @access private
   */
  this.accountBalance = null;

  /**
   * @name InvestmentStatementResponse#securityList
   * @type SecurityList
   * @access private
   */
  this.securityList = null;
}

inherit(InvestmentStatementResponse, "extends", StatementResponse);


Aggregate.add("INVSTMTRS", InvestmentStatementResponse);


/**
 * Gets the name of the response message.
 *
 * @return {String} the name of the response message
 */
// @Override
InvestmentStatementResponse.prototype.getResponseMessageName = function() {
  return "investment statement";
};


/**
 * Gets the date and time for the statement download. This is a required field according to the
 * OFX spec.
 *
 * @return {Date} the date and time for the statement download
 */
InvestmentStatementResponse.prototype.getDateOfStatement = function() {
  return this.dateOfStatement;
};
Element.add(InvestmentStatementResponse, {name: "DTASOF", required: true, order: 60, attributeType: Date, readMethod: "getDateOfStatement", writeMethod: "setDateOfStatement"});


/**
 * Sets the date and time for the statement download. This is a required field according to the
 * OFX spec.
 *
 * @param {Date} dateOfStatement the date and time for the statement download
 */
InvestmentStatementResponse.prototype.setDateOfStatement = function(dateOfStatement) {
  this.dateOfStatement = dateOfStatement;
};


/**
 * Gets the account for the statement. This is a required field according to the OFX spec.
 *
 * @return {InvestmentAccountDetails} the account for the statement
 */
InvestmentStatementResponse.prototype.getAccount = function() {
  return this.account;
};
ChildAggregate.add(InvestmentStatementResponse, {name:"INVACCTFROM", required: true, order: 10, attributeType: InvestmentAccountDetails, readMethod: "getAccount", writeMethod: "setAccount"});


/**
 * Sets the account for the statement. This is a required field according to the OFX spec.
 *
 * @param {InvestmentAccountDetails} account the account for the statement
 */
InvestmentStatementResponse.prototype.setAccount = function(account) {
  this.account = account;
};


/**
 * Gets the transaction list aggregate. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentTransactionList} the transaction list aggregate
 */
InvestmentStatementResponse.prototype.getInvestmentTransactionList = function() {
  return this.transactionList;
};
ChildAggregate.add(InvestmentStatementResponse, {order: 70, attributeType: InvestmentTransactionList, readMethod: "getInvestmentTransactionList", writeMethod: "setInvestmentTransactionList"});


/**
 * Sets the transaction list aggregate. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentTransactionList} transactionList the transaction list aggregate
 */
InvestmentStatementResponse.prototype.setInvestmentTransactionList = function(transactionList) {
  this.transactionList = transactionList;
};


/**
 * Gets the position list aggreate. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentPositionList} the position list aggregate
 */
InvestmentStatementResponse.prototype.getPositionList = function() {
  return this.positionList;
};
ChildAggregate.add(InvestmentStatementResponse, {order: 80, attributeType: InvestmentPositionList, readMethod: "getPositionList", writeMethod: "setPositionList"});


/**
 * Sets the position list aggreate. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentPositionList} positionList the position list aggregate
 */
InvestmentStatementResponse.prototype.setPositionList = function(positionList) {
  this.positionList = positionList;
};


/**
 * Gets the account balance. This is an optional field according to the OFX spec.
 *
 * @return {InvestmentBalance} the account balance
 */
InvestmentStatementResponse.prototype.getAccountBalance = function() {
  return this.accountBalance;
};
ChildAggregate.add(InvestmentStatementResponse, {order: 90, attributeType: InvestmentBalance, readMethod: "getAccountBalance", writeMethod: "setAccountBalance"});


/**
 * Sets the account balance. This is an optional field according to the OFX spec.
 *
 * @param {InvestmentBalance} accountBalance the account balance
 */
InvestmentStatementResponse.prototype.setAccountBalance = function(accountBalance) {
  this.accountBalance = accountBalance;
};


/**
 * Gets the security list aggregate.
 * <br>
 * This is not actually technically part of the investment statement responsr aggregate, but
 * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
 * we provide it here for convenience.
 *
 * @return {SecurityList} the security list aggregate
 */
InvestmentStatementResponse.prototype.getSecurityList = function() {
  return this.securityList;
};


/**
 * Sets the security list aggregate.
 * <br>
 * This is not actually technically part of the investment statement responsr aggregate, but
 * according to Section 13.8.4, OFX spec, this aggregate can appear the overall response and
 * we provide it here for convenience.
 *
 * @param {SecurityList} securityList the security list aggregate
 */
InvestmentStatementResponse.prototype.setSecurityList = function(securityList) {
  this.securityList = securityList;
};




module.exports = InvestmentStatementResponse;
