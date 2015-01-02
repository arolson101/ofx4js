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

var inherit = require("../../util/inherit");

var FinancialInstitutionData = require("../FinancialInstitutionData");

/**
 * Base class for FI data.
 *
 * @class
 */
function BaseFinancialInstitutionData () {

  /**
   * @name BaseFinancialInstitutionData#id
   * @type String
   * @access private
   */
  this.id = null;

  /**
   * @name BaseFinancialInstitutionData#fid
   * @type String
   * @access private
   */
  this.fid = null;

  /**
   * @name BaseFinancialInstitutionData#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name BaseFinancialInstitutionData#organization
   * @type String
   * @access private
   */
  this.organization = null;

  /**
   * @name BaseFinancialInstitutionData#ofxUrl
   * @type URL
   * @access private
   */
  this.ofxUrl = null;

  /**
   * @name BaseFinancialInstitutionData#brokerId
   * @type String
   * @access private
   */
  this.brokerId = null;
}

inherit(BaseFinancialInstitutionData, "implements", FinancialInstitutionData);




BaseFinancialInstitutionData.prototype.BaseFinancialInstitutionData = function() {
};


BaseFinancialInstitutionData.prototype.BaseFinancialInstitutionData = function(/*String*/ id) {
  this.id = id;
};


BaseFinancialInstitutionData.prototype.getId = function() {
  return this.id;
};


BaseFinancialInstitutionData.prototype.setId = function(/*String*/ id) {
  this.id = id;
};


BaseFinancialInstitutionData.prototype.getFinancialInstitutionId = function() {
  return this.fid;
};


BaseFinancialInstitutionData.prototype.setFinancialInstitutionId = function(/*String*/ id) {
  this.fid = id;
};


BaseFinancialInstitutionData.prototype.getName = function() {
  return this.name;
};


BaseFinancialInstitutionData.prototype.setName = function(/*String*/ name) {
  this.name = name;
};


BaseFinancialInstitutionData.prototype.getOrganization = function() {
  return this.organization;
};


BaseFinancialInstitutionData.prototype.setOrganization = function(/*String*/ organization) {
  this.organization = organization;
};


BaseFinancialInstitutionData.prototype.getOFXURL = function() {
  return this.ofxUrl;
};


BaseFinancialInstitutionData.prototype.setOFXURL = function(/*URL*/ OFXURL) {
  this.ofxUrl = OFXURL;
};


BaseFinancialInstitutionData.prototype.getBrokerId = function() {
  return this.brokerId;
};


BaseFinancialInstitutionData.prototype.setBrokerId = function(/*String*/ brokerId) {
  this.brokerId = brokerId;
};




module.exports = BaseFinancialInstitutionData;
