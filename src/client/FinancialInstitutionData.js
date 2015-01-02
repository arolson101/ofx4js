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
 * Interface for core FI data.  This is the base set of information
 * required in order to initiate a connection to an FI server.
 *
 * @class
 */
function FinancialInstitutionData() {
}

/**
 * A unique id for this FI.
 *
 * @return {String} A unique id for this FI.
 */
FinancialInstitutionData.prototype.getId = function() { throw new Error("not implemented"); };

/**
 * The id of the FI.
 *
 * @return {String} The id of the FI.
 */
FinancialInstitutionData.prototype.getFinancialInstitutionId = function() { throw new Error("not implemented"); };

/**
 * The name of the FI.
 *
 * @return {String} The name of the FI.
 */
FinancialInstitutionData.prototype.getName = function() { throw new Error("not implemented"); };

/**
 * The OFX organization name.
 *
 * @return {String} The OFX organization name.
 */
FinancialInstitutionData.prototype.getOrganization = function() { throw new Error("not implemented"); };

/**
 * The URL to the OFX server for this institution.
 *
 * @return {URL} The URL to the OFX server for this institution.
 */
FinancialInstitutionData.prototype.getOFXURL = function() { throw new Error("not implemented"); };

/**
 * The broker id.
 *
 * @return {String} The broker id.
 */
FinancialInstitutionData.prototype.getBrokerId = function() { throw new Error("not implemented"); };


module.exports = FinancialInstitutionData;
