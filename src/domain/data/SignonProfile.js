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

/**
 * @class
 */
function SignonProfile() {
}

/**
 * The name of the sign-on realm.
 *
 * @return {String} The name of the sign-on realm.
 */
SignonProfile.prototype.getRealm = function() { throw new Error("not implemented"); };

/**
 * The minimum number of password characters.
 *
 * @return {Integer} The minimum number of password characters.
 */
SignonProfile.prototype.getMinPasswordCharacters = function() { throw new Error("not implemented"); };

/**
 * The maximum number of password characters.
 *
 * @return {Integer} The maximum number of password characters.
 */
SignonProfile.prototype.getMaxPasswordCharacters = function() { throw new Error("not implemented"); };

/**
 * The type of password characters supported.
 *
 * @return {CharacterType} The type of password characters supported.
 */
SignonProfile.prototype.getPasswordCharacterType = function() { throw new Error("not implemented"); };

/**
 * Whether the password is case-sensitive.
 *
 * @return {Boolean} Whether the password is case-sensitive.
 */
SignonProfile.prototype.getPasswordCaseSensitive = function() { throw new Error("not implemented"); };

/**
 * Whether special characters are allowed in the password.
 *
 * @return {Boolean} Whether special characters are allowed in the password.
 */
SignonProfile.prototype.getPasswordSpecialCharsAllowed = function() { throw new Error("not implemented"); };

/**
 * Whether spaces are allowed in the password.
 *
 * @return {Boolean} Whether spaces are allowed in the password.
 */
SignonProfile.prototype.getPasswordSpacesAllowed = function() { throw new Error("not implemented"); };

/**
 * Whether the server can process a password change request for this realm.
 *
 * @return {Boolean} Whether the server can process a password change request for this realm.
 */
SignonProfile.prototype.getChangePasswordSupported = function() { throw new Error("not implemented"); };

/**
 * Whether the server requires the user to change their password as part of their first signon.
 *
 * @return {Boolean} Whether the server requires the user to change their password as part of their first signon.
 */
SignonProfile.prototype.getChangePasswordFirstRequired = function() { throw new Error("not implemented"); };

/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonProfile.prototype.getAdditionalCredientialsLabel1 = function() { throw new Error("not implemented"); };

/**
 * Label for a set of additional credentials that the user must supply.
 *
 * @return {String} Label for a set of additional credentials that the user must supply.
 */
SignonProfile.prototype.getAdditionalCredientialsLabel2 = function() { throw new Error("not implemented"); };

/**
 * Whether a client UID is required for teh sign-on.
 *
 * @return {Boolean} Whether a client UID is required for teh sign-on.
 */
SignonProfile.prototype.getClientUIDRequired = function() { throw new Error("not implemented"); };

/**
 * Whether an auth token is required for the sign-on.
 *
 * @return {Boolean} Whether an auth token is required for the sign-on.
 */
SignonProfile.prototype.getAuthTokenRequiredForFirstSignon = function() { throw new Error("not implemented"); };

/**
 * The label of the auth token.
 *
 * @return {String} The label of the auth token.
 */
SignonProfile.prototype.getAuthTokenLabel = function() { throw new Error("not implemented"); };

/**
 * The URL for the auth token information.
 *
 * @return {String} The URL for the auth token information.
 */
SignonProfile.prototype.getAuthTokenInfoURL = function() { throw new Error("not implemented"); };

/**
 * Whether MFA is supported.
 *
 * @return {Boolean} Whether MFA is supported.
 */
SignonProfile.prototype.getMfaSupported = function() { throw new Error("not implemented"); };

/**
 * Whether an MFA challenge request is required for the first sign-on into this realm.
 *
 * @return {Boolean} Whether an MFA challenge request is required for the first sign-on into this realm.
 */
SignonProfile.prototype.getMfaChallengeRequiredForFirstSignon = function() { throw new Error("not implemented"); };


module.exports = SignonProfile;
