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

var SynchronizationCapability = require("domain/data/profile/SynchronizationCapability");

//import java.net.URL;

/**
 * @author Ryan Heaton
 */
function MessageSetProfile() {
}

/**
 * Version of the message set.
 *
 * @return {String} The version of the message set.
 */
MessageSetProfile.prototype.getVersion = function() { throw new Error("not implemented"); };

/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @return {String} The name of the service provider (sometimes the message set processing is outsourced).
 */
MessageSetProfile.prototype.getServiceProviderName = function() { throw new Error("not implemented"); };

/**
 * The URL at which the message set is processed.
 *
 * @return {String} The URL at which the message set is processed.
 */
MessageSetProfile.prototype.getUrl = function() { throw new Error("not implemented"); };

/**
 * The application-level security required for this message set.
 *
 * @return {ApplicationSecurity} The application-level security required for this message set.
 */
MessageSetProfile.prototype.getSecurity = function() { throw new Error("not implemented"); };

/**
 * Whether transport-level security is required for this message set.
 *
 * @return {boolean} Whether transport-level security is required for this message set.
 */
MessageSetProfile.prototype.isSslRequired = function() { throw new Error("not implemented"); };

/**
 * The sign-on realm.
 *
 * @return {String} The sign-on realm.
 */
MessageSetProfile.prototype.getRealm = function() { throw new Error("not implemented"); };

/**
 * The language.
 *
 * @return {String} The language.
 * @see java.util.Locale#getISO3Language()
 */
MessageSetProfile.prototype.getLanguage = function() { throw new Error("not implemented"); };

/**
 * The synchronization capability for this message set.
 *
 * @return {SynchronizationCapability} The synchronization capability for this message set.
 */
MessageSetProfile.prototype.getSyncCapability = function() { throw new Error("not implemented"); };

/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @return {boolean} Whether there exists support for resposne-file based error recovery.
 */
MessageSetProfile.prototype.hasFileBasedErrorRecoverySupport = function() { throw new Error("not implemented"); };


module.exports = MessageSetProfile;
