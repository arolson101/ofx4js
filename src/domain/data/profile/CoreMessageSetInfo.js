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

var ApplicationSecurity = require("domain/data/ApplicationSecurity");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

//import java.net.URL;
//import java.util.Locale;

/**
 * Core information about a specific version of a specific message set.
 *
 * @author Ryan Heaton
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
  this.language = Locale.US.getISO3Language();

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
  return version;
};
Element.add({name: "VER", required: true, order: 0, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getVersion"});


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
  return serviceProviderName;
};
Element.add({name: "SPNAME", order: 10, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getServiceProviderName"});


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
  return url;
};
Element.add({name: "URL", required: true, order: 20, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getUrl"});


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
  return security;
};
Element.add({name: "OFXSEC", required: true, order: 30, owner: CoreMessageSetInfo, /*type: ApplicationSecurity,*/ fcn: "getSecurity"});


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
  return sslRequired;
};
Element.add({name: "TRANSPSEC", required: true, order: 40, owner: CoreMessageSetInfo, /*type: Boolean,*/ fcn: "getSslRequired"});


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
  return realm;
};
Element.add({name: "SIGNONREALM", required: true, order: 50, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getRealm"});


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
  return language;
};
Element.add({name: "LANGUAGE", required: true, order: 60, owner: CoreMessageSetInfo, /*type: String,*/ fcn: "getLanguage"});


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
  return syncCapability;
};
Element.add({name: "SYNCMODE", required: true, order: 70, owner: CoreMessageSetInfo, /*type: SynchronizationCapability,*/ fcn: "getSyncCapability"});


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
  return fileBasedErrorRecoverySupport;
};
Element.add({name: "RESPFILEER", required: true, order: 80, owner: CoreMessageSetInfo, /*type: Boolean,*/ fcn: "getFileBasedErrorRecoverySupport"});


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
  return timeout;
};
Element.add({name: "INTU.TIMEOUT", order: 90, owner: CoreMessageSetInfo, /*type: Integer,*/ fcn: "getIntuTimeout"});


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
