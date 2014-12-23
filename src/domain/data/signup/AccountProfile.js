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

var inherit = require("../inherit");

var InvestmentAccountInfo = require("domain/data/investment/accounts/InvestmentAccountInfo");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");
var ChildAggregate = require("meta/ChildAggregate");
var BankAccountInfo = require("domain/data/banking/BankAccountInfo");
var CreditCardAccountInfo = require("domain/data/creditcard/CreditCardAccountInfo");

/**
 * @author Ryan Heaton
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
  return description;
};
Element.add({name: "DESC", order: 0, owner: AccountProfile, /*type: String,*/ fcn: "getDescription"});


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
  return phone;
};
Element.add({name: "PHONE", order: 10, owner: AccountProfile, /*type: String,*/ fcn: "getPhone"});


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
  if (getBankSpecifics() != null && getCreditCardSpecifics() != null) {
    throw new IllegalStateException("Only one account specifics aggregate can be set at a time.");
  }
  else if (getBankSpecifics() != null) {
    return getBankSpecifics();
  } else if (getInvestmentSpecifics() != null) {
    return getInvestmentSpecifics();
  }
  else {
    return getCreditCardSpecifics();
  }
}

/**
 * Account specifics.
 *
 * @param specifics Account specifics.
 */
public void setSpecifics(net.sf.ofx4j.domain.data.common.AccountInfo specifics) {
  if (specifics instanceof BankAccountInfo) {
    setBankSpecifics((BankAccountInfo) specifics);
  }
  else if (specifics instanceof CreditCardAccountInfo) {
    setCreditCardSpecifics((CreditCardAccountInfo) specifics);
  } else if (specifics instanceof InvestmentAccountInfo) {
    setInvestmentSpecifics((InvestmentAccountInfo) specifics);
  }
  else {
    throw new IllegalArgumentException("Unknown specifics type: " + specifics);
  }
}

/**
 * Bank-specific info.
 *
 * @return Bank-specific info.
 */
@ChildAggregate ( order = 20 )
public BankAccountInfo getBankSpecifics() {
  return bankSpecifics;
}

/**
 * Bank-specific info.
 *
 * @param bankSpecifics Bank-specific info.
 */
public void setBankSpecifics(BankAccountInfo bankSpecifics) {
  this.creditCardSpecifics = null;
  this.investSpecifics = null;
  this.bankSpecifics = bankSpecifics;
}

/**
 * Credit-card account info.
 *
 * @return Credit-card account info.
 */
@ChildAggregate ( order = 30 )
public CreditCardAccountInfo getCreditCardSpecifics() {
  return creditCardSpecifics;
}

/**
 * Credit-card account info.
 *
 * @param creditCardSpecifics Credit-card account info.
 */
public void setCreditCardSpecifics(CreditCardAccountInfo creditCardSpecifics) {
  this.bankSpecifics = null;
  this.investSpecifics = null;
  this.creditCardSpecifics = creditCardSpecifics;
}

/**
 * Investment account info.
 *
 * @return Investment account info.
 */
@ChildAggregate ( order = 40 )
public InvestmentAccountInfo getInvestmentSpecifics() {
  return investSpecifics;
}

/**
 * Investment account info.
 *
 * @param investSpecifics Investment account info.
 */
public void setInvestmentSpecifics(InvestmentAccountInfo investSpecifics) {
  this.bankSpecifics = null;
  this.creditCardSpecifics = null;
  this.investSpecifics = investSpecifics;
}
}
;




module.exports = AccountProfile;
