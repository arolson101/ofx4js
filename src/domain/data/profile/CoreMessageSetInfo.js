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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");
var ApplicationSecurity = require("../ApplicationSecurity");
var SynchronizationCapability = require("./SynchronizationCapability");

/**
 * Core information about a specific version of a specific message set.
 *
 * @class
 * @see "Section 7.2.1, OFX Spec"
 */
function CoreMessageSetInfo () {

  /**
   * @name CoreMessageSetInfo#version
   * @type String
   * @access private
   */
  this.version = "1";

  /**
   * @name CoreMessageSetInfo#serviceProviderName
   * @type String
   * @access private
   */
  this.serviceProviderName = null;

  /**
   * @name CoreMessageSetInfo#url
   * @type String
   * @access private
   */
  this.url = null;

  /**
   * @name CoreMessageSetInfo#security
   * @type ApplicationSecurity
   * @access private
   */
  this.security = null;

  /**
   * @name CoreMessageSetInfo#sslRequired
   * @type Boolean
   * @access private
   */
  this.sslRequired = null;

  /**
   * @name CoreMessageSetInfo#realm
   * @type String
   * @access private
   */
  this.realm = null;

  /**
   * @name CoreMessageSetInfo#language
   * @type String
   * @access private
   */
  this.language = "eng";

  /**
   * @name CoreMessageSetInfo#syncCapability
   * @type SynchronizationCapability
   * @access private
   */
  this.syncCapability = null;

  /**
   * @name CoreMessageSetInfo#fileBasedErrorRecoverySupport
   * @type Boolean
   * @access private
   */
  this.fileBasedErrorRecoverySupport = null;

  /**
   * @name CoreMessageSetInfo#timeout
   * @type Integer
   * @access private
   */
  this.timeout = null;
}



Aggregate.add("MSGSETCORE", CoreMessageSetInfo);


/**
 * Version of the message set.
 *
 * @return {String} The version of the message set.
 */
CoreMessageSetInfo.prototype.getVersion = function() {
  return this.version;
};
Element.add(CoreMessageSetInfo, {name: "VER", required: true, order: 0, attributeType: String, readMethod: "getVersion", writeMethod: "setVersion"});


/**
 * The version of the message set.
 *
 * @param {String} version The version of the message set.
 */
CoreMessageSetInfo.prototype.setVersion = function(version) {
  this.version = version;
};


/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @return {String} The name of the service provider (sometimes the message set processing is outsourced).
 */
CoreMessageSetInfo.prototype.getServiceProviderName = function() {
  return this.serviceProviderName;
};
Element.add(CoreMessageSetInfo, {name: "SPNAME", order: 10, attributeType: String, readMethod: "getServiceProviderName", writeMethod: "setServiceProviderName"});


/**
 * The name of the service provider (sometimes the message set processing is outsourced).
 *
 * @param {String} serviceProviderName The name of the service provider (sometimes the message set processing is outsourced).
 */
CoreMessageSetInfo.prototype.setServiceProviderName = function(serviceProviderName) {
  this.serviceProviderName = serviceProviderName;
};


/**
 * The URL at which the message set is processed.
 *
 * @return {String} The URL at which the message set is processed.
 */
CoreMessageSetInfo.prototype.getUrl = function() {
  return this.url;
};
Element.add(CoreMessageSetInfo, {name: "URL", required: true, order: 20, attributeType: String, readMethod: "getUrl", writeMethod: "setUrl"});


/**
 * The URL at which the message set is processed.
 *
 * @param {String} url The URL at which the message set is processed.
 */
CoreMessageSetInfo.prototype.setUrl = function(url) {
  this.url = url;
};


/**
 * The application-level security required for this message set.
 *
 * @return {ApplicationSecurity} The application-level security required for this message set.
 */
CoreMessageSetInfo.prototype.getSecurity = function() {
  return this.security;
};
Element.add(CoreMessageSetInfo, {name: "OFXSEC", required: true, order: 30, attributeType: ApplicationSecurity, readMethod: "getSecurity", writeMethod: "setSecurity"});


/**
 * The application-level security required for this message set.
 *
 * @param {ApplicationSecurity} security The application-level security required for this message set.
 */
CoreMessageSetInfo.prototype.setSecurity = function(security) {
  this.security = security;
};


/**
 * Whether transport-level security is required for this message set.
 *
 * @return {Boolean} Whether transport-level security is required for this message set.
 */
CoreMessageSetInfo.prototype.getSslRequired = function() {
  return this.sslRequired;
};
Element.add(CoreMessageSetInfo, {name: "TRANSPSEC", required: true, order: 40, attributeType: Boolean, readMethod: "getSslRequired", writeMethod: "setSslRequired"});


/**
 * Whether transport-level security is required for this message set.
 *
 * @param {Boolean} sslRequired Whether transport-level security is required for this message set.
 */
CoreMessageSetInfo.prototype.setSslRequired = function(sslRequired) {
  this.sslRequired = sslRequired;
};


/**
 * The sign-on realm.
 *
 * @return {String} The sign-on realm.
 */
CoreMessageSetInfo.prototype.getRealm = function() {
  return this.realm;
};
Element.add(CoreMessageSetInfo, {name: "SIGNONREALM", required: true, order: 50, attributeType: String, readMethod: "getRealm", writeMethod: "setRealm"});


/**
 * The sign-on realm.
 *
 * @param {String} realm The sign-on realm.
 */
CoreMessageSetInfo.prototype.setRealm = function(realm) {
  this.realm = realm;
};


/**
 * The language.
 *
 * @return {String} The language.
 * @see java.util.Locale#getISO3Language()
 */
CoreMessageSetInfo.prototype.getLanguage = function() {
  return this.language;
};
Element.add(CoreMessageSetInfo, {name: "LANGUAGE", required: true, order: 60, attributeType: String, readMethod: "getLanguage", writeMethod: "setLanguage"});


/**
 * The language.
 *
 * @param {String} language The language.
 */
CoreMessageSetInfo.prototype.setLanguage = function(language) {
  this.language = language;
};


/**
 * The synchronization capability for this message set.
 *
 * @return {SynchronizationCapability} The synchronization capability for this message set.
 */
CoreMessageSetInfo.prototype.getSyncCapability = function() {
  return this.syncCapability;
};
Element.add(CoreMessageSetInfo, {name: "SYNCMODE", required: true, order: 70, attributeType: SynchronizationCapability, readMethod: "getSyncCapability", writeMethod: "setSyncCapability"});


/**
 * The synchronization capability for this message set.
 *
 * @param {SynchronizationCapability} syncCapability The synchronization capability for this message set.
 */
CoreMessageSetInfo.prototype.setSyncCapability = function(syncCapability) {
  this.syncCapability = syncCapability;
};


/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @return {Boolean} Whether there exists support for resposne-file based error recovery.
 */
CoreMessageSetInfo.prototype.getFileBasedErrorRecoverySupport = function() {
  return this.fileBasedErrorRecoverySupport;
};
Element.add(CoreMessageSetInfo, {name: "RESPFILEER", required: true, order: 80, attributeType: Boolean, readMethod: "getFileBasedErrorRecoverySupport", writeMethod: "setFileBasedErrorRecoverySupport"});


/**
 * Whether there exists support for resposne-file based error recovery.
 *
 * @param {Boolean} fileBasedErrorRecoverySupport Whether there exists support for resposne-file based error recovery.
 */
CoreMessageSetInfo.prototype.setFileBasedErrorRecoverySupport = function(fileBasedErrorRecoverySupport) {
  this.fileBasedErrorRecoverySupport = fileBasedErrorRecoverySupport;
};


/**
 * Gets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
 * it. It likely is some type of timeout in seconds.
 *
 * @return {Integer} the "INTU.TIMEOUT" property
 */
CoreMessageSetInfo.prototype.getIntuTimeout = function() {
  return this.timeout;
};
Element.add(CoreMessageSetInfo, {name: "INTU.TIMEOUT", order: 90, attributeType: Number, readMethod: "getIntuTimeout", writeMethod: "setIntuTimeout"});


/**
 * Sets the "INTU.TIMEOUT" field. There's no public documentation of this field but E*TRADE sends
 * it. It likely is some type of timeout in seconds.
 *
 * @param {Integer} timeout the "INTU.TIMEOUT" property
 */
CoreMessageSetInfo.prototype.setIntuTimeout = function(timeout) {
  this.timeout = timeout;
};




module.exports = CoreMessageSetInfo;
