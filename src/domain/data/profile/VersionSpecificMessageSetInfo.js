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

var ChildAggregate = require("../../../meta/ChildAggregate");
var MessageSetProfile = require("../MessageSetProfile");
var CoreMessageSetInfo = require("./CoreMessageSetInfo");

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
  return this.core;
};
ChildAggregate.add(VersionSpecificMessageSetInfo, {order: 0, attributeType: CoreMessageSetInfo, readMethod: "getCore", writeMethod: "setCore"});


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
VersionSpecificMessageSetInfo.prototype.getMessageSetType = function() { throw new Error("not implemented"); };

VersionSpecificMessageSetInfo.prototype.getVersion = function() {
  return this.core !== null ? this.core.getVersion() : null;
};

VersionSpecificMessageSetInfo.prototype.getServiceProviderName = function() {
  return this.core !== null ? this.core.getServiceProviderName() : null;
};

VersionSpecificMessageSetInfo.prototype.getUrl = function() {
  return this.core !== null ? this.core.getUrl() : null;
};

VersionSpecificMessageSetInfo.prototype.getSecurity = function() {
  return this.core !== null ? this.core.getSecurity() : null;
};

VersionSpecificMessageSetInfo.prototype.isSslRequired = function() {
  return this.core !== null && this.core.getSslRequired() !== null ? this.core.getSslRequired() : true;
};

VersionSpecificMessageSetInfo.prototype.getRealm = function() {
  return this.core !== null ? this.core.getRealm() : null;
};

VersionSpecificMessageSetInfo.prototype.getLanguage = function() {
  return this.core !== null ? this.core.getLanguage() : null;
};

VersionSpecificMessageSetInfo.prototype.getSyncCapability = function() {
  return this.core !== null ? this.core.getSyncCapability() : null;
};

VersionSpecificMessageSetInfo.prototype.hasFileBasedErrorRecoverySupport = function() {
  return this.core !== null && this.core.getFileBasedErrorRecoverySupport() !== null ? this.core.getFileBasedErrorRecoverySupport() : false;
};




module.exports = VersionSpecificMessageSetInfo;
