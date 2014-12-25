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

/**
 * @class
 */
function FinancialInstitution () {

  /**
   * @name FinancialInstitution#id
   * @type String
   * @access private
   */
  this.id = null;

  /**
   * @name FinancialInstitution#organization
   * @type String
   * @access private
   */
  this.organization = null;
}



Aggregate.add("FI", FinancialInstitution);


/**
 * Financial institution id.
 *
 * @return {String} Financial institution id.
 */
FinancialInstitution.prototype.getId = function() {
  return this.id;
};
Element.add({name: "FID", order: 10, owner: FinancialInstitution, /*type: String,*/ fcn: "getId"});


/**
 * Financial institution id.
 *
 * @param {String} id Financial institution id.
 */
FinancialInstitution.prototype.setId = function(id) {
  this.id = id;
};


/**
 * The organization.
 *
 * @return {String} The organization.
 */
FinancialInstitution.prototype.getOrganization = function() {
  return this.organization;
};
Element.add({name: "ORG", required: true, order: 0, owner: FinancialInstitution, /*type: String,*/ fcn: "getOrganization"});


/**
 * The organization.
 *
 * @param {String} organization The organization.
 */
FinancialInstitution.prototype.setOrganization = function(organization) {
  this.organization = organization;
};




module.exports = FinancialInstitution;
