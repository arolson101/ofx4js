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

var ResponseMessage = require("domain/data/ResponseMessage");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");
var FinancialInstitutionProfile = require("client/FinancialInstitutionProfile");

/**
 * @class
 * @augments ResponseMessage
 * @augments FinancialInstitutionProfile
 * @see "Section 7.2 OFX Spec"
 */
function ProfileResponse () {

  /**
   * @name ProfileResponse#messageSetList
   * @type MessageSetInfoList
   * @access private
   */
  this.messageSetList = null;

  /**
   * @name ProfileResponse#signonInfoList
   * @type SignonInfoList
   * @access private
   */
  this.signonInfoList = null;

  /**
   * @name ProfileResponse#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name ProfileResponse#financialInstitutionName
   * @type String
   * @access private
   */
  this.financialInstitutionName = null;

  /**
   * @name ProfileResponse#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name ProfileResponse#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name ProfileResponse#address3
   * @type String
   * @access private
   */
  this.address3 = null;

  /**
   * @name ProfileResponse#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name ProfileResponse#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name ProfileResponse#zip
   * @type String
   * @access private
   */
  this.zip = null;

  /**
   * @name ProfileResponse#country
   * @type String
   * @access private
   */
  this.country = null;

  /**
   * @name ProfileResponse#customerServicePhone
   * @type String
   * @access private
   */
  this.customerServicePhone = null;

  /**
   * @name ProfileResponse#technicalSupportPhone
   * @type String
   * @access private
   */
  this.technicalSupportPhone = null;

  /**
   * @name ProfileResponse#fax
   * @type String
   * @access private
   */
  this.fax = null;

  /**
   * @name ProfileResponse#siteURL
   * @type String
   * @access private
   */
  this.siteURL = null;

  /**
   * @name ProfileResponse#email
   * @type String
   * @access private
   */
  this.email = null;
}

inherit(ProfileResponse, "extends", ResponseMessage);
inherit(ProfileResponse, "implements", FinancialInstitutionProfile);


Aggregate.add("PROFRS", ProfileResponse);


/**
 * List of message set information.
 * @return {MessageSetInfoList} List of message set information.
 */
ProfileResponse.prototype.getMessageSetList = function() {
  return this.messageSetList;
};
ChildAggregate.add({order: 0, owner: ProfileResponse, /*type: MessageSetInfoList,*/ fcn: "getMessageSetList"});


/**
 * List of message set information.
 *
 * @param {MessageSetInfoList} messageSetList List of message set information.
 */
ProfileResponse.prototype.setMessageSetList = function(messageSetList) {
  this.messageSetList = messageSetList;
};


/**
 * List of signon information.
 *
 * @return {SignonInfoList} List of signon information.
 */
ProfileResponse.prototype.getSignonInfoList = function() {
  return this.signonInfoList;
};
ChildAggregate.add({order: 10, owner: ProfileResponse, /*type: SignonInfoList,*/ fcn: "getSignonInfoList"});


/**
 * List of signon information.
 *
 * @param {SignonInfoList} signonInfoList List of signon information.
 */
ProfileResponse.prototype.setSignonInfoList = function(signonInfoList) {
  this.signonInfoList = signonInfoList;
};


// Inherited.
ProfileResponse.prototype.getResponseMessageName = function() {
  return "profile";
};


// Inherited.
ProfileResponse.prototype.getLastUpdated = function() {
  return this.getTimestamp();
};


/**
 * The timestamp of this profile update.
 *
 * @return {Date} The timestamp of this profile update.
 */
ProfileResponse.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add({name: "DTPROFUP", order: 20, owner: ProfileResponse, /*type: Date,*/ fcn: "getTimestamp"});


/**
 * The timestamp of this profile update.
 *
 * @param {Date} timestamp The timestamp of this profile update.
 */
ProfileResponse.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * The name of the financial institution.
 *
 * @return {String} The name of the financial institution.
 */
ProfileResponse.prototype.getFinancialInstitutionName = function() {
  return this.financialInstitutionName;
};
Element.add({name: "FINAME", order: 30, owner: ProfileResponse, /*type: String,*/ fcn: "getFinancialInstitutionName"});


/**
 * The name of the financial institution.
 *
 * @param {String} financialInstitutionName The name of the financial institution.
 */
ProfileResponse.prototype.setFinancialInstitutionName = function(financialInstitutionName) {
  this.financialInstitutionName = financialInstitutionName;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1", required: true, order: 40, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress1"});


/**
 * The address of the financial institution.
 *
 * @param {String} address1 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2", order: 50, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress2"});


/**
 * The address of the financial institution.
 *
 * @param {String} address2 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
ProfileResponse.prototype.getAddress3 = function() {
  return this.address3;
};
Element.add({name: "ADDR3", order: 60, owner: ProfileResponse, /*type: String,*/ fcn: "getAddress3"});


/**
 * The address of the financial institution.
 *
 * @param {String} address3 The address of the financial institution.
 */
ProfileResponse.prototype.setAddress3 = function(address3) {
  this.address3 = address3;
};


/**
 * The city of the financial institution.
 *
 * @return {String} The city of the financial institution.
 */
ProfileResponse.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY", required: true, order: 70, owner: ProfileResponse, /*type: String,*/ fcn: "getCity"});


/**
 * The city of the financial institution.
 *
 * @param {String} city The city of the financial institution.
 */
ProfileResponse.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * The state of this financial institution.
 *
 * @return {String} The state of this financial institution.
 */
ProfileResponse.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE", required: true, order: 80, owner: ProfileResponse, /*type: String,*/ fcn: "getState"});


/**
 * The state of this financial institution.
 *
 * @param {String} state The state of this financial institution.
 */
ProfileResponse.prototype.setState = function(state) {
  this.state = state;
};


/**
 * The postal code of this financial institution.
 *
 * @return {String} The postal code of this financial institution.
 */
ProfileResponse.prototype.getZip = function() {
  return this.zip;
};
Element.add({name: "POSTALCODE", required: true, order: 90, owner: ProfileResponse, /*type: String,*/ fcn: "getZip"});


/**
 * The postal code of this financial institution.
 *
 * @param {String} zip The postal code of this financial institution.
 */
ProfileResponse.prototype.setZip = function(zip) {
  this.zip = zip;
};


/**
 * The country code for this financial institution.
 *
 * @return {String} The country code for this financial institution.
 * @see java.util.Locale#getISO3Country()
 */
ProfileResponse.prototype.getCountry = function() {
  return this.country;
};
Element.add({name: "COUNTRY", required: true, order: 100, owner: ProfileResponse, /*type: String,*/ fcn: "getCountry"});


/**
 * The country code for this financial institution.
 *
 * @param {String} country The country code for this financial institution.
 */
ProfileResponse.prototype.setCountry = function(country) {
  this.country = country;
};


/**
 * The phone number to customer service.
 *
 * @return {String} The phone number to customer service.
 */
ProfileResponse.prototype.getCustomerServicePhone = function() {
  return this.customerServicePhone;
};
Element.add({name: "CSPHONE", order: 110, owner: ProfileResponse, /*type: String,*/ fcn: "getCustomerServicePhone"});


/**
 * The phone number to customer service.
 *
 * @param {String} customerServicePhone The phone number to customer service.
 */
ProfileResponse.prototype.setCustomerServicePhone = function(customerServicePhone) {
  this.customerServicePhone = customerServicePhone;
};


/**
 * The phone number to tech support.
 *
 * @return {String} The phone number to tech support.
 */
ProfileResponse.prototype.getTechnicalSupportPhone = function() {
  return this.technicalSupportPhone;
};
Element.add({name: "TSPHONE", order: 120, owner: ProfileResponse, /*type: String,*/ fcn: "getTechnicalSupportPhone"});


/**
 * The phone number to tech support.
 *
 * @param {String} technicalSupportPhone The phone number to tech support.
 */
ProfileResponse.prototype.setTechnicalSupportPhone = function(technicalSupportPhone) {
  this.technicalSupportPhone = technicalSupportPhone;
};


/**
 * The fax number.
 *
 * @return {String} The fax number.
 */
ProfileResponse.prototype.getFax = function() {
  return this.fax;
};
Element.add({name: "FAXPHONE", order: 130, owner: ProfileResponse, /*type: String,*/ fcn: "getFax"});


/**
 * The fax number.
 *
 * @param {String} fax The fax number.
 */
ProfileResponse.prototype.setFax = function(fax) {
  this.fax = fax;
};


/**
 * URL for the financial institution.
 *
 * @return {String} URL for the financial institution.
 */
ProfileResponse.prototype.getSiteURL = function() {
  return this.siteURL;
};
Element.add({name: "URL", order: 140, owner: ProfileResponse, /*type: String,*/ fcn: "getSiteURL"});


/**
 * URL for the financial institution.
 *
 * @param {String} siteURL URL for the financial institution.
 */
ProfileResponse.prototype.setSiteURL = function(siteURL) {
  this.siteURL = siteURL;
};


/**
 * The email for this FI
 *
 * @return {String} The email for this FI
 */
ProfileResponse.prototype.getEmail = function() {
  return this.email;
};
Element.add({name: "EMAIL", order: 150, owner: ProfileResponse, /*type: String,*/ fcn: "getEmail"});


/**
 * The email for this FI
 *
 * @param {String} email The email for this FI
 */
ProfileResponse.prototype.setEmail = function(email) {
  this.email = email;
};


ProfileResponse.prototype.getMessageSetProfile = function(/*MessageSetType*/ type) {
  var profiles = this.getProfiles(type);
  if (profiles.length > 1) {
    throw new Error("More than one profile of type " + type);
  }
  else if (profiles.isEmpty()) {
    return null;
  }
  else {
    return profiles[0];
  }
};


/**
 * Get all the profiles of the specified type.
 *
 * @param {MessageSetType} type The type.
 * @return {Collection<MessageSetProfile>} The profiles.
 */
ProfileResponse.prototype.getProfiles = function(type) {
  var profiles = [];
  if (this.getMessageSetList() !== null && this.getMessageSetList().getInformationList() !== null) {
    for (var info in this.getMessageSetList().getInformationList()) {
      if (info.getVersionSpecificInformationList() !== null) {
        for (var versionSpecificInfo in info.getVersionSpecificInformationList()) {
          if (versionSpecificInfo.getMessageSetType() == type) {
            profiles.add(versionSpecificInfo);
          }
        }
      }
    }
  }
  return profiles;
};


ProfileResponse.prototype.getMessageSetProfile = function(/*MessageSetType*/ type, /*String*/ version) {
  for (var profile in this.getProfiles(type)) {
    if (version === null) {
      if (profile.getVersion() === null) {
        return profile;
      }
    }
    else if (version.equals(profile.getVersion())) {
      return profile;
    }
  }
  
  return null;
};


ProfileResponse.prototype.getSignonProfile = function(/*MessageSetProfile*/ messageSet) {
  if (this.getSignonInfoList() !== null && this.getSignonInfoList().getInfoList() !== null) {
    for (var signonInfo in this.getSignonInfoList().getInfoList()) {
      if (messageSet.getRealm() === null) {
        if (signonInfo.getRealm() === null) {
          return signonInfo;
        }
      }
      else if (messageSet.getRealm().equals(signonInfo.getRealm())) {
        return signonInfo;
      }
    }
  }
  return null;
};




module.exports = ProfileResponse;
