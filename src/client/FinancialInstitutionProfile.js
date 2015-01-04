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
function FinancialInstitutionProfile() {
}

/**
 * When this profile was last updated.
 *
 * @return {Date} When this profile was last updated.
 */
FinancialInstitutionProfile.prototype.getLastUpdated = function() { throw new Error("not implemented"); };

/**
 * The name of the financial institution.
 *
 * @return {String} The name of the financial institution.
 */
FinancialInstitutionProfile.prototype.getFinancialInstitutionName = function() { throw new Error("not implemented"); };

/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
FinancialInstitutionProfile.prototype.getAddress1 = function() { throw new Error("not implemented"); };

/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
FinancialInstitutionProfile.prototype.getAddress2 = function() { throw new Error("not implemented"); };

/**
 * The address of the financial institution.
 *
 * @return {String} The address of the financial institution.
 */
FinancialInstitutionProfile.prototype.getAddress3 = function() { throw new Error("not implemented"); };

/**
 * The city of the financial institution.
 *
 * @return {String} The city of the financial institution.
 */
FinancialInstitutionProfile.prototype.getCity = function() { throw new Error("not implemented"); };

/**
 * The state of this financial institution.
 *
 * @return {String} The state of this financial institution.
 */
FinancialInstitutionProfile.prototype.getState = function() { throw new Error("not implemented"); };

/**
 * The postal code of this financial institution.
 *
 * @return {String} The postal code of this financial institution.
 */
FinancialInstitutionProfile.prototype.getZip = function() { throw new Error("not implemented"); };

/**
 * The country code for this financial institution.
 *
 * @return {String} The country code for this financial institution.
 * @see java.util.Locale#getISO3Country()
 */
FinancialInstitutionProfile.prototype.getCountry = function() { throw new Error("not implemented"); };

/**
 * The phone number to customer service.
 *
 * @return {String} The phone number to customer service.
 */
FinancialInstitutionProfile.prototype.getCustomerServicePhone = function() { throw new Error("not implemented"); };

/**
 * The phone number to tech support.
 *
 * @return {String} The phone number to tech support.
 */
FinancialInstitutionProfile.prototype.getTechnicalSupportPhone = function() { throw new Error("not implemented"); };

/**
 * The fax number.
 *
 * @return {String} The fax number.
 */
FinancialInstitutionProfile.prototype.getFax = function() { throw new Error("not implemented"); };

/**
 * URL for the financial institution.
 *
 * @return {String} URL for the financial institution.
 */
FinancialInstitutionProfile.prototype.getSiteURL = function() { throw new Error("not implemented"); };

/**
 * The email for this FI
 *
 * @return {String} The email for this FI
 */
FinancialInstitutionProfile.prototype.getEmail = function() { throw new Error("not implemented"); };

/**
 * Get the message set profile for the specified message set and, optionally, the specified version.
 *
 * @param {MessageSetType} type The message set type for which to retrieve the profile.
 * @param {String} [version] The version for which to retrieve the profile.
 * @return {MessageSetProfile} The message set profile information, or null if the FI doesn't support the specified message set of the specified version.
 */
FinancialInstitutionProfile.prototype.getMessageSetProfile = function(/*type, version*/) { throw new Error("not implemented"); };

/**
 * Get the signon profile for the specified message set.
 *
 * @param {MessageSetProfile} messageSet The message set.
 * @return {SignonProfile} The signon profile, or null if none was found.
 */
FinancialInstitutionProfile.prototype.getSignonProfile = function(/*messageSet*/) { throw new Error("not implemented"); };


module.exports = FinancialInstitutionProfile;
