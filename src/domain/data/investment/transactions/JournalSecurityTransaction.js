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

var SubAccountType = require("../accounts/SubAccountType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionWithSecurity = require("./TransactionWithSecurity");
var TransactionType = require("./TransactionType");
var SecurityId = require("../../seclist/SecurityId");

/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 * @augments TransactionWithSecurity
 */
function JournalSecurityTransaction () {
  BaseOtherInvestmentTransaction.call(this, TransactionType.JOURNAL_SECURITY);

  /**
   * @name JournalSecurityTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name JournalSecurityTransaction#subAccountFrom
   * @type String
   * @access private
   */
  this.subAccountFrom = null;

  /**
   * @name JournalSecurityTransaction#subAccountTo
   * @type String
   * @access private
   */
  this.subAccountTo = null;

  /**
   * @name JournalSecurityTransaction#total
   * @type Double
   * @access private
   */
  this.total = null;
}

inherit(JournalSecurityTransaction, "extends", BaseOtherInvestmentTransaction);
inherit(JournalSecurityTransaction, "implements", TransactionWithSecurity);


Aggregate.add("JRNLSEC", JournalSecurityTransaction);



/**
 * Gets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was bought
 */
JournalSecurityTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add(JournalSecurityTransaction, {required: true, order: 20, attributeType: SecurityId, readMethod: "getSecurityId", writeMethod: "setSecurityId"});


/**
 * Sets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was bought
 */
JournalSecurityTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
 * Gets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account type
 */
JournalSecurityTransaction.prototype.getFromSubAccountFund = function() {
  return this.subAccountFrom;
};
Element.add(JournalSecurityTransaction, {name: "SUBACCTFROM", order: 30, attributeType: String, readMethod: "getFromSubAccountFund", writeMethod: "setFromSubAccountFund"});


/**
 * Sets the sub account type the transer is from (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountFrom the sub account type
 */
JournalSecurityTransaction.prototype.setFromSubAccountFund = function(subAccountFrom) {
  this.subAccountFrom = subAccountFrom;
};


/**
 * Gets the result of getFromSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalSecurityTransaction.prototype.getFromSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getFromSubAccountFund());
};


/**
 * Gets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {String} the sub account fund
 */
JournalSecurityTransaction.prototype.getToSubAccountFund = function() {
  return this.subAccountTo;
};
Element.add(JournalSecurityTransaction, {name: "SUBACCTTO", order: 40, attributeType: String, readMethod: "getToSubAccountFund", writeMethod: "setToSubAccountFund"});


/**
 * sets the sub account type that the transfer is to (e.g. CASH, MARGIN, SHORT, OTHER).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {String} subAccountTo the sub account fund
 */
JournalSecurityTransaction.prototype.setToSubAccountFund = function(subAccountTo) {
  this.subAccountTo = subAccountTo;
};


/**
 * Gets the result of getToSubAccountFund as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
JournalSecurityTransaction.prototype.getToSubAccountFundEnum = function() {
  return SubAccountType.fromOfx(this.getToSubAccountFund());
};


/**
 * Gets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @return {Double} the total
 */
JournalSecurityTransaction.prototype.getTotal = function() {
  return this.total;
};
Element.add(JournalSecurityTransaction, {name: "TOTAL", order: 50, attributeType: Number, readMethod: "getTotal", writeMethod: "setTotal"});


/**
 * Sets the total for the transaction.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @param {Double} total the total
 */
JournalSecurityTransaction.prototype.setTotal = function(total) {
  this.total = total;
};




module.exports = JournalSecurityTransaction;
