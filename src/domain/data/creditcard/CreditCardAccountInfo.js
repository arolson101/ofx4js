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

var inherit = require("../../../util/inherit");

var AccountInfo = require("../common/AccountInfo");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments AccountInfo
 */
function CreditCardAccountInfo () {

  /**
   * @name CreditCardAccountInfo#creditCardAccount
   * @type CreditCardAccountDetails
   * @access private
   */
  this.creditCardAccount = null;

  /**
   * @name CreditCardAccountInfo#supportsTransactionDetailOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransactionDetailOperations = null;

  /**
   * @name CreditCardAccountInfo#supportsTransferToOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferToOtherAccountOperations = null;

  /**
   * @name CreditCardAccountInfo#supportsTransferFromOtherAccountOperations
   * @type Boolean
   * @access private
   */
  this.supportsTransferFromOtherAccountOperations = null;

  /**
   * @name CreditCardAccountInfo#status
   * @type AccountStatus
   * @access private
   */
  this.status = null;
}

inherit(CreditCardAccountInfo, "implements", AccountInfo);


Aggregate.add("CCACCTINFO", CreditCardAccountInfo);


/**
 * The credit card account this information is referencing.
 *
 * @return {CreditCardAccountDetails} The credit card account this information is referencing.
 */
CreditCardAccountInfo.prototype.getCreditCardAccount = function() {
  return this.creditCardAccount;
};
ChildAggregate.add({name: "CCACCTFROM", required: true, order: 0, owner: CreditCardAccountInfo, /*type: CreditCardAccountDetails,*/ readMethod: "getCreditCardAccount", writeMethod: "setCreditCardAccount"});


/**
 * The credit card account this information is referencing.
 *
 * @param {CreditCardAccountDetails} creditCardAccount The credit card account this information is referencing.
 */
CreditCardAccountInfo.prototype.setCreditCardAccount = function(creditCardAccount) {
  this.creditCardAccount = creditCardAccount;
};


// Inherited.
CreditCardAccountInfo.prototype.getAccountDetails = function() {
  return this.getCreditCardAccount();
};


/**
 * Whether this account supports download of transaction details.
 *
 * @return {Boolean} Whether this account supports download of transaction details.
 */
CreditCardAccountInfo.prototype.getSupportsTransactionDetailOperations = function() {
  return this.supportsTransactionDetailOperations;
};
Element.add({name: "SUPTXDL", required: true, order: 10, owner: CreditCardAccountInfo, /*type: Boolean,*/ readMethod: "getSupportsTransactionDetailOperations", writeMethod: "setSupportsTransactionDetailOperations"});


/**
 * Whether this account supports download of transaction details.
 *
 * @param {Boolean} supportsTransactionDetailOperations Whether this account supports download of transaction details.
 */
CreditCardAccountInfo.prototype.setSupportsTransactionDetailOperations = function(supportsTransactionDetailOperations) {
  this.supportsTransactionDetailOperations = supportsTransactionDetailOperations;
};


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations to other accounts.
 */
CreditCardAccountInfo.prototype.getSupportsTransferToOtherAccountOperations = function() {
  return this.supportsTransferToOtherAccountOperations;
};
Element.add({name: "XFERSRC", required: true, order: 20, owner: CreditCardAccountInfo, /*type: Boolean,*/ readMethod: "getSupportsTransferToOtherAccountOperations", writeMethod: "setSupportsTransferToOtherAccountOperations"});


/**
 * Whether this account supports transfer operations to other accounts.
 *
 * @param {Boolean} supportsTransferToOtherAccountOperations Whether this account supports transfer operations to other accounts.
 */
CreditCardAccountInfo.prototype.setSupportsTransferToOtherAccountOperations = function(supportsTransferToOtherAccountOperations) {
  this.supportsTransferToOtherAccountOperations = supportsTransferToOtherAccountOperations;
};


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @return {Boolean} Whether this account supports transfer operations from other accounts.
 */
CreditCardAccountInfo.prototype.getSupportsTransferFromOtherAccountOperations = function() {
  return this.supportsTransferFromOtherAccountOperations;
};
Element.add({name: "XFERDEST", required: true, order: 30, owner: CreditCardAccountInfo, /*type: Boolean,*/ readMethod: "getSupportsTransferFromOtherAccountOperations", writeMethod: "setSupportsTransferFromOtherAccountOperations"});


/**
 * Whether this account supports transfer operations from other accounts.
 *
 * @param {Boolean} supportsTransferFromOtherAccountOperations Whether this account supports transfer operations from other accounts.
 */
CreditCardAccountInfo.prototype.setSupportsTransferFromOtherAccountOperations = function(supportsTransferFromOtherAccountOperations) {
  this.supportsTransferFromOtherAccountOperations = supportsTransferFromOtherAccountOperations;
};


/**
 * The account status.
 *
 * @return {AccountStatus} The account status.
 */
CreditCardAccountInfo.prototype.getStatus = function() {
  return this.status;
};
Element.add({name: "SVCSTATUS", required: true, order: 40, owner: CreditCardAccountInfo, /*type: AccountStatus,*/ readMethod: "getStatus", writeMethod: "setStatus"});


/**
 * The account status.
 *
 * @param {AccountStatus} status The account status.
 */
CreditCardAccountInfo.prototype.setStatus = function(status) {
  this.status = status;
};




module.exports = CreditCardAccountInfo;
