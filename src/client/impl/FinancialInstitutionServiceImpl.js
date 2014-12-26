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

var FinancialInstitutionImpl = require("./FinancialInstitutionImpl");
var FinancialInstitutionService = require("../FinancialInstitutionService");
var OFXV1Connection = require("../net/OFXV1Connection");

/**
 * @class
 */
function FinancialInstitutionServiceImpl () {

  /**
   * @name FinancialInstitutionServiceImpl#connection
   * @type OFXConnection
   * @access private
   */
  this.connection = new OFXV1Connection();

  /**
   * @name FinancialInstitutionServiceImpl#dataStore
   * @type FinancialInstitutionDataStore
   * @access private
   */
  this.dataStore = null;
}

inherit(FinancialInstitutionServiceImpl, "implements", FinancialInstitutionService);




FinancialInstitutionServiceImpl.prototype.getFinancialInstitution = function(/*String*/ fid) {
  return this.dataStore === null ? null : this.getFinancialInstitution(this.getDataStore().getInstitutionData(fid));
};


FinancialInstitutionServiceImpl.prototype.getFinancialInstitution = function(/*FinancialInstitutionData*/ data) {
  if (data === null) {
    return null;
  }

  return new FinancialInstitutionImpl(data, this.getConnection());
};


FinancialInstitutionServiceImpl.prototype.getDataStore = function() {
  return this.dataStore;
};


FinancialInstitutionServiceImpl.prototype.setDataStore = function(/*FinancialInstitutionDataStore*/ dataStore) {
  this.dataStore = dataStore;
};


FinancialInstitutionServiceImpl.prototype.getConnection = function() {
  return this.connection;
};


FinancialInstitutionServiceImpl.prototype.setConnection = function(/*OFXConnection*/ connection) {
  this.connection = connection;
};




module.exports = FinancialInstitutionServiceImpl;
