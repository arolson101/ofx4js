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

var ChildAggregate = require("meta/ChildAggregate");
var MessageSetProfile = require("domain/data/MessageSetProfile");
var ApplicationSecurity = require("domain/data/ApplicationSecurity");
var MessageSetType = require("domain/data/MessageSetType");

/**
 * Information specific to a version of a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
function VersionSpecificMessageSetInfo () {

  /**
   * @name VersionSpecificMessageSetInfo#core
   * @type CoreMessageSetInfo
   * @access private
   */
  this.core = null;
}

inherit(VersionSpecificMessageSetInfo, "implements", MessageSetProfile);




/**
 * The information core.
 *
 * @return {CoreMessageSetInfo} The information core.
 */
VersionSpecificMessageSetInfo.prototype.getCore = function() {
  return core;
};
ChildAggregate.add({order: 0, owner: VersionSpecificMessageSetInfo, /*type: CoreMessageSetInfo,*/ fcn: "getCore"});


/**
 * The information core.
 *
 * @param {CoreMessageSetInfo} core The information core.
 */
VersionSpecificMessageSetInfo.prototype.setCore = function(core) {
  this.core = core;
};


/**
 * The message set type.
 *
 * @return {MessageSetType} The message set type.
 */
VersionSpecificMessageSetInfo.prototype.getMessageSetType = function() {

public String getVersion() {
  return core != null ? core.getVersion() : null;
}

public String getServiceProviderName() {
  return core != null ? core.getServiceProviderName() : null;
}

public String getUrl() {
  return core != null ? core.getUrl() : null;
}

public ApplicationSecurity getSecurity() {
  return core != null ? core.getSecurity() : null;
}

public boolean isSslRequired() {
  return core != null && core.getSslRequired() != null ? core.getSslRequired() : true;
}

public String getRealm() {
  return core != null ? core.getRealm() : null;
}

public String getLanguage() {
  return core != null ? core.getLanguage() : null;
}

public SynchronizationCapability getSyncCapability() {
  return core != null ? core.getSyncCapability() : null;
}

public boolean hasFileBasedErrorRecoverySupport() {
  return core != null && core.getFileBasedErrorRecoverySupport() != null ? core.getFileBasedErrorRecoverySupport() : false;
}
};




module.exports = VersionSpecificMessageSetInfo;
