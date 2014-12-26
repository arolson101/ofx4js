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

var InvestmentAccountInfo = require("../investment/accounts/InvestmentAccountInfo");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ChildAggregate = require("../../../meta/ChildAggregate");
var BankAccountInfo = require("../banking/BankAccountInfo");
var CreditCardAccountInfo = require("../creditcard/CreditCardAccountInfo");

/**
 * @class
 */
function AccountProfile () {

  /**
   * @name AccountProfile#description
   * @type String
   * @access private
   */
  this.description = null;

  /**
   * @name AccountProfile#phone
   * @type String
   * @access private
   */
  this.phone = null;

  /**
   * @name AccountProfile#bankSpecifics
   * @type BankAccountInfo
   * @access private
   */
  this.bankSpecifics = null;

  /**
   * @name AccountProfile#creditCardSpecifics
   * @type CreditCardAccountInfo
   * @access private
   */
  this.creditCardSpecifics = null;

  /**
   * @name AccountProfile#investSpecifics
   * @type InvestmentAccountInfo
   * @access private
   */
  this.investSpecifics = null;
}



Aggregate.add("ACCTINFO", AccountProfile);


/**
 * Description of the account.
 *
 * @return {String} The description of the account.
 */
AccountProfile.prototype.getDescription = function() {
  return this.description;
};
Element.add({name: "DESC", order: 0, owner: AccountProfile, /*type: String,*/ readMethod: "getDescription", writeMethod: "setDescription"});


/**
 * The description of the account.
 *
 * @param {String} description The description of the account.
 */
AccountProfile.prototype.setDescription = function(description) {
  this.description = description;
};


/**
 * Phone number for the account.
 *
 * @return {String} Phone number for the account.
 */
AccountProfile.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE", order: 10, owner: AccountProfile, /*type: String,*/ readMethod: "getPhone", writeMethod: "setPhone"});


/**
 * Phone number for the account.
 *
 * @param {String} phone Phone number for the account.
 */
AccountProfile.prototype.setPhone = function(phone) {
  this.phone = phone;
};


/**
 * Account specifics.
 *
 * @return {net.sf.ofx4j.domain.data.common.AccountInfo} Account specifics.
 */
AccountProfile.prototype.getSpecifics = function() {
  if (this.getBankSpecifics() !== null && this.getCreditCardSpecifics() !== null) {
    throw new Error("Only one account specifics aggregate can be set at a time.");
  }
  else if (this.getBankSpecifics() !== null) {
    return this.getBankSpecifics();
  } else if (this.getInvestmentSpecifics() !== null) {
    return this.getInvestmentSpecifics();
  }
  else {
    return this.getCreditCardSpecifics();
  }
};


/**
 * Account specifics.
 *
 * @param {net.sf.ofx4j.domain.data.common.AccountInfo} specifics Account specifics.
 */
AccountProfile.prototype.setSpecifics = function(specifics) {
  if (specifics instanceof BankAccountInfo) {
    this.setBankSpecifics(specifics);
  }
  else if (specifics instanceof CreditCardAccountInfo) {
    this.setCreditCardSpecifics(specifics);
  } else if (specifics instanceof InvestmentAccountInfo) {
    this.setInvestmentSpecifics(specifics);
  }
  else {
    throw new Error("Unknown specifics type: " + specifics);
  }
};


/**
 * Bank-specific info.
 *
 * @return {BankAccountInfo} Bank-specific info.
 */
AccountProfile.prototype.getBankSpecifics = function() {
  return this.bankSpecifics;
};
ChildAggregate.add({order: 20, owner: AccountProfile, /*type: BankAccountInfo,*/ readMethod: "getBankSpecifics", writeMethod: "setBankSpecifics"});


/**
 * Bank-specific info.
 *
 * @param {BankAccountInfo} bankSpecifics Bank-specific info.
 */
AccountProfile.prototype.setBankSpecifics = function(bankSpecifics) {
  this.creditCardSpecifics = null;
  this.investSpecifics = null;
  this.bankSpecifics = bankSpecifics;
};


/**
 * Credit-card account info.
 *
 * @return {CreditCardAccountInfo} Credit-card account info.
 */
AccountProfile.prototype.getCreditCardSpecifics = function() {
  return this.creditCardSpecifics;
};
ChildAggregate.add({order: 30, owner: AccountProfile, /*type: CreditCardAccountInfo,*/ readMethod: "getCreditCardSpecifics", writeMethod: "setCreditCardSpecifics"});


/**
 * Credit-card account info.
 *
 * @param {CreditCardAccountInfo} creditCardSpecifics Credit-card account info.
 */
AccountProfile.prototype.setCreditCardSpecifics = function(creditCardSpecifics) {
  this.bankSpecifics = null;
  this.investSpecifics = null;
  this.creditCardSpecifics = creditCardSpecifics;
};


/**
 * Investment account info.
 *
 * @return {InvestmentAccountInfo} Investment account info.
 */
AccountProfile.prototype.getInvestmentSpecifics = function() {
  return this.investSpecifics;
};
ChildAggregate.add({order: 40, owner: AccountProfile, /*type: InvestmentAccountInfo,*/ readMethod: "getInvestmentSpecifics", writeMethod: "setInvestmentSpecifics"});


/**
 * Investment account info.
 *
 * @param {InvestmentAccountInfo} investSpecifics Investment account info.
 */
AccountProfile.prototype.setInvestmentSpecifics = function(investSpecifics) {
  this.bankSpecifics = null;
  this.creditCardSpecifics = null;
  this.investSpecifics = investSpecifics;
};




module.exports = AccountProfile;
