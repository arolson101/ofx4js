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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var SignonProfile = require("../SignonProfile");

/**
 * Sign-on information
 *
 * @class
 * @augments SignonProfile
 * @see "Section 7.2.2, OFX Spec"
 */
function SignonInfo () {

  /**
   * @name SignonInfo#realm
   * @type String
   * @access private
   */
  this.realm = null;

  /**
   * @name SignonInfo#minPasswordCharacters
   * @type Integer
   * @access private
   */
  this.minPasswordCharacters = null;

  /**
   * @name SignonInfo#maxPasswordCharacters
   * @type Integer
   * @access private
   */
  this.maxPasswordCharacters = null;

  /**
   * @name SignonInfo#passwordCharacterType
   * @type CharacterType
   * @access private
   */
  this.passwordCharacterType = null;

  /**
   * @name SignonInfo#passwordCaseSensitive
   * @type Boolean
   * @access private
   */
  this.passwordCaseSensitive = true;

  /**
   * @name SignonInfo#passwordSpecialCharsAllowed
   * @type Boolean
   * @access private
   */
  this.passwordSpecialCharsAllowed = true;

  /**
   * @name SignonInfo#passwordSpacesAllowed
   * @type Boolean
   * @access private
   */
  this.passwordSpacesAllowed = true;

  /**
   * @name SignonInfo#changePasswordSupported
   * @type Boolean
   * @access private
   */
  this.changePasswordSupported = null;

  /**
   * @name SignonInfo#changePasswordFirstRequired
   * @type Boolean
   * @access private
   */
  this.changePasswordFirstRequired = null;

  /**
   * @name SignonInfo#additionalCredientialsLabel1
   * @type String
   * @access private
   */
  this.additionalCredientialsLabel1 = null;

  /**
   * @name SignonInfo#additionalCredientialsLabel2
   * @type String
   * @access private
   */
  this.additionalCredientialsLabel2 = null;

  /**
   * @name SignonInfo#clientUIDRequired
   * @type Boolean
   * @access private
   */
  this.clientUIDRequired = null;

  /**
   * @name SignonInfo#authTokenRequiredForFirstSignon
   * @type Boolean
   * @access private
   */
  this.authTokenRequiredForFirstSignon = null;

  /**
   * @name SignonInfo#authTokenLabel
   * @type String
   * @access private
   */
  this.authTokenLabel = null;

  /**
   * @name SignonInfo#authTokenInfoURL
   * @type String
   * @access private
   */
  this.authTokenInfoURL = null;

  /**
   * @name SignonInfo#mfaSupported
   * @type Boolean
   * @access private
   */
  this.mfaSupported = null;

  /**
   * @name SignonInfo#mfaChallengeRequiredForFirstSignon
   * @type Boolean
   * @access private
   */
  this.mfaChallengeRequiredForFirstSignon = null;
}

inherit(SignonInfo, "implements", SignonProfile);


Aggregate.add("SIGNONINFO", SignonInfo);


/**
 * The name of the sign-on realm.
 *
 * @return {String} The name of the sign-on realm.
 */
SignonInfo.prototype.getRealm = function() {
  return this.realm;
};
Element.add(SignonInfo, {name: "SIGNONREALM", required: true, order: 0, attributeType: String, readMethod: "getRealm", writeMethod: "setRealm"});


/**
 * The name of the sign-on realm.
 *
 * @param {String} realm The name of the sign-on realm.
 */
SignonInfo.prototype.setRealm = function(realm) {
  this.realm = realm;
};


/**
 * The minimum number of password characters.
 *
 * @return {Integer} The minimum number of password characters.
 */
SignonInfo.prototype.getMinPasswordCharacters = function() {
  return this.minPasswordCharacters;
};
Element.add(SignonInfo, {name: "MIN", required: true, order: 10, attributeType: Integer, readMethod: "getMinPasswordCharacters", writeMethod: "setMinPasswordCharacters"});


/**
 * The minimum number of password characters.
 *
 * @param {Integer} minPasswordCharacters The minimum number of password characters.
 */
SignonInfo.prototype.setMinPasswordCharacters = function(minPasswordCharacters) {
  this.minPasswordCharacters = minPasswordCharacters;
};


/**
 * The maximum number of password characters.
 *
 * @return {Integer} The maximum number of password characters.
 */
SignonInfo.prototype.getMaxPasswordCharacters = function() {
  return this.maxPasswordCharacters;
};
Element.add(SignonInfo, {name: "MAX", required: true, order: 20, attributeType: Integer, readMethod: "getMaxPasswordCharacters", writeMethod: "setMaxPasswordCharacters"});


/**
 * The maximum number of password characters.
 *
 * @param {Integer} maxPasswordCharacters The maximum number of password characters.
 */
SignonInfo.prototype.setMaxPasswordCharacters = function(maxPasswordCharacters) {
  this.maxPasswordCharacters = maxPasswordCharacters;
};


/**
 * The type of password characters supported.
 *
 * @return {CharacterType} The type of password characters supported.
 */
SignonInfo.prototype.getPasswordCharacterType = function() {
  return this.passwordCharacterType;
};
Element.add(SignonInfo, {name: "CHARTYPE", required: true, order: 30, attributeType: CharacterType, readMethod: "getPasswordCharacterType", writeMethod: "setPasswordCharacterType"});


/**
 * The type of password characters supported.
 *
 * @param {CharacterType} passwordCharacterType The type of password characters supported.
 */
SignonInfo.prototype.setPasswordCharacterType = function(passwordCharacterType) {
  this.passwordCharacterType = passwordCharacterType;
};


/**
 * Whether the password is case-sensitive.
 *
 * @return {Boolean} Whether the password is case-sensitive.
 */
SignonInfo.prototype.getPasswordCaseSensitive = function() {
  return this.passwordCaseSensitive;
};
Element.add(SignonInfo, {name: "CASESEN", required: true, order: 40, attributeType: bool, readMethod: "getPasswordCaseSensitive", writeMethod: "setPasswordCaseSensitive"});


/**
 * Whether the password is case-sensitive.
 *
 * @param {Boolean} passwordCaseSensitive Whether the password is case-sensitive.
 */
SignonInfo.prototype.setPasswordCaseSensitive = function(passwordCaseSensitive) {
  this.passwordCaseSensitive = passwordCaseSensitive;
};


/**
 * Whether special characters are allowed in the password.
 *
 * @return {Boolean} Whether special characters are allowed in the password.
 */
SignonInfo.prototype.getPasswordSpecialCharsAllowed = function() {
  return this.passwordSpecialCharsAllowed;
};
Element.add(SignonInfo, {name: "SPECIAL", required: true, order: 50, attributeType: bool, readMethod: "getPasswordSpecialCharsAllowed", writeMethod: "setPasswordSpecialCharsAllowed"});


/**
 * Whether special characters are allowed in the password.
 *
 * @param {Boolean} passwordSpecialCharsAllowed Whether special characters are allowed in the password.
 */
SignonInfo.prototype.setPasswordSpecialCharsAllowed = function(passwordSpecialCharsAllowed) {
  this.passwordSpecialCharsAllowed = passwordSpecialCharsAllowed;
};


/**
 * Whether spaces are allowed in the password.
 *
 * @return {Boolean} Whether spaces are allowed in the password.
 */
SignonInfo.prototype.getPasswordSpacesAllowed = function() {
  return this.passwordSpacesAllowed;
};
Element.add(SignonInfo, {name: "SPACES", required: true, order: 60, attributeType: bool, readMethod: "getPasswordSpacesAllowed", writeMethod: "setPasswordSpacesAllowed"});


/**
 * Whether spaces are allowed in the password.
 *
 * @param {Boolean} passwordSpacesAllowed Whether spaces are allowed in the password.
 */
SignonInfo.prototype.setPasswordSpacesAllowed = function(passwordSpacesAllowed) {
  this.passwordSpacesAllowed = passwordSpacesAllowed;
};


/**
 * Whether the server can process a password change request for this realm.
 *
 * @return {Boolean} Whether the server can process a password change request for this realm.
 */
SignonInfo.prototype.getChangePasswordSupported = function() {
  return this.changePasswordSupported;
};
Element.add(SignonInfo, {name: "PINCH", required: true, order: 70, attributeType: bool, readMethod: "getChangePasswordSupported", writeMethod: "setChangePasswordSupported"});


/**
 * Whether the server can process a password change request for this realm.
 *
 * @param {Boolean} changePasswordSupported Whether the server can process a password change request for this realm.
 */
SignonInfo.prototype.setChangePasswordSupported = function(changePasswordSupported) {
  this.changePasswordSupported = changePasswordSupported;
};


/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @return {Boolean} Whether the server requires the user to change their password as part of their first signon.
 */
SignonInfo.prototype.getChangePasswordFirstRequired = function() {
  return this.changePasswordFirstRequired;
};
Element.add(SignonInfo, {name: "CHGPINFIRST", required: true, order: 80, attributeType: bool, readMethod: "getChangePasswordFirstRequired", writeMethod: "setChangePasswordFirstRequired"});


/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @param {Boolean} changePasswordFirstRequired Whether the server requires the user to change their password as part of their first signon.
 */
SignonInfo.prototype.setChangePasswordFirstRequired = function(changePasswordFirstRequired) {
  this.changePasswordFirstRequired = changePasswordFirstRequired;
};


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.getAdditionalCredientialsLabel1 = function() {
  return this.additionalCredientialsLabel1;
};
Element.add(SignonInfo, {name: "USERCRED1LABEL", order: 90, attributeType: String, readMethod: "getAdditionalCredientialsLabel1", writeMethod: "setAdditionalCredientialsLabel1"});


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @param {String} additionalCredientialsLabel1 Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.setAdditionalCredientialsLabel1 = function(additionalCredientialsLabel1) {
  this.additionalCredientialsLabel1 = additionalCredientialsLabel1;
};


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.getAdditionalCredientialsLabel2 = function() {
  return this.additionalCredientialsLabel2;
};
Element.add(SignonInfo, {name: "USERCRED2LABEL", order: 100, attributeType: String, readMethod: "getAdditionalCredientialsLabel2", writeMethod: "setAdditionalCredientialsLabel2"});


/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @param {String} additionalCredientialsLabel2 Label for a set of additional credentials that the user must supply.
 */
SignonInfo.prototype.setAdditionalCredientialsLabel2 = function(additionalCredientialsLabel2) {
  this.additionalCredientialsLabel2 = additionalCredientialsLabel2;
};


/**
 * Whether a client UID is required for teh sign-on.
 *
 * @return {Boolean} Whether a client UID is required for teh sign-on.
 */
SignonInfo.prototype.getClientUIDRequired = function() {
  return this.clientUIDRequired;
};
Element.add(SignonInfo, {name: "CLIENTUIDREQ", order: 110, attributeType: bool, readMethod: "getClientUIDRequired", writeMethod: "setClientUIDRequired"});


/**
 * Whether a client UID is required for teh sign-on.
 *
 * @param {Boolean} clientUIDRequired Whether a client UID is required for teh sign-on.
 */
SignonInfo.prototype.setClientUIDRequired = function(clientUIDRequired) {
  this.clientUIDRequired = clientUIDRequired;
};


/**
 * Whether an auth token is required for the sign-on.
 *
 * @return {Boolean} Whether an auth token is required for the sign-on.
 */
SignonInfo.prototype.getAuthTokenRequiredForFirstSignon = function() {
  return this.authTokenRequiredForFirstSignon;
};
Element.add(SignonInfo, {name: "AUTHTOKENFIRST", order: 120, attributeType: bool, readMethod: "getAuthTokenRequiredForFirstSignon", writeMethod: "setAuthTokenRequiredForFirstSignon"});


/**
 * Whether an auth token is required for the sign-on.
 *
 * @param {Boolean} authTokenRequiredForFirstSignon
 *         Whether an auth token is required for the sign-on.
 */
SignonInfo.prototype.setAuthTokenRequiredForFirstSignon = function(authTokenRequiredForFirstSignon) {
  this.authTokenRequiredForFirstSignon = authTokenRequiredForFirstSignon;
};


/**
 * The label of the auth token.
 *
 * @return {String} The label of the auth token.
 */
SignonInfo.prototype.getAuthTokenLabel = function() {
  return this.authTokenLabel;
};
Element.add(SignonInfo, {name: "AUTHTOKENLABEL", order: 130, attributeType: String, readMethod: "getAuthTokenLabel", writeMethod: "setAuthTokenLabel"});


/**
 * The label of the auth token.
 *
 * @param {String} authTokenLabel The label of the auth token.
 */
SignonInfo.prototype.setAuthTokenLabel = function(authTokenLabel) {
  this.authTokenLabel = authTokenLabel;
};


/**
 * The URL for the auth token information.
 *
 * @return {String} The URL for the auth token information.
 */
SignonInfo.prototype.getAuthTokenInfoURL = function() {
  return this.authTokenInfoURL;
};
Element.add(SignonInfo, {name: "AUTHTOKENINFOURL", order: 140, attributeType: String, readMethod: "getAuthTokenInfoURL", writeMethod: "setAuthTokenInfoURL"});


/**
 * The URL for the auth token information.
 *
 * @param {String} authTokenInfoURL The URL for the auth token information.
 */
SignonInfo.prototype.setAuthTokenInfoURL = function(authTokenInfoURL) {
  this.authTokenInfoURL = authTokenInfoURL;
};


/**
 * Whether MFA is supported.
 *
 * @return {Boolean} Whether MFA is supported.
 */
SignonInfo.prototype.getMfaSupported = function() {
  return this.mfaSupported;
};
Element.add(SignonInfo, {name: "MFACHALLENGESUPT", order: 150, attributeType: bool, readMethod: "getMfaSupported", writeMethod: "setMfaSupported"});


/**
 * Whether MFA is supported.
 *
 * @param {Boolean} mfaSupported Whether MFA is supported.
 */
SignonInfo.prototype.setMfaSupported = function(mfaSupported) {
  this.mfaSupported = mfaSupported;
};


/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @return {Boolean} Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonInfo.prototype.getMfaChallengeRequiredForFirstSignon = function() {
  return this.mfaChallengeRequiredForFirstSignon;
};
Element.add(SignonInfo, {name: "MFACHALLENGEFIRST", order: 160, attributeType: bool, readMethod: "getMfaChallengeRequiredForFirstSignon", writeMethod: "setMfaChallengeRequiredForFirstSignon"});


/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @param {Boolean} mfaChallengeRequiredForFirstSignon
 *         Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonInfo.prototype.setMfaChallengeRequiredForFirstSignon = function(mfaChallengeRequiredForFirstSignon) {
  this.mfaChallengeRequiredForFirstSignon = mfaChallengeRequiredForFirstSignon;
};




module.exports = SignonInfo;
