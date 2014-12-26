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

var T1099Response = require("../common/T1099Response");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

/**
 * @class
 * @augments T1099Response
 */
function Tax1099Response () {

  /**
   * @name Tax1099Response#tax1099div
   * @type Tax1099DIV
   * @access private
   */
  this.tax1099div = null;

  /**
   * @name Tax1099Response#lstTax1099DIV
   * @type List<Tax1099DIV>
   * @access private
   */
  this.lstTax1099DIV = null;

  /**
   * @name Tax1099Response#lstTax1099INT
   * @type List<Tax1099INT>
   * @access private
   */
  this.lstTax1099INT = null;

  /**
   * @name Tax1099Response#lstTax1099R
   * @type List<Tax1099R>
   * @access private
   */
  this.lstTax1099R = null;

  /**
   * @name Tax1099Response#lstTax1099B
   * @type List<Tax1099B>
   * @access private
   */
  this.lstTax1099B = null;

  /**
   * @name Tax1099Response#lstTax1099MISC
   * @type List<Tax1099MISC>
   * @access private
   */
  this.lstTax1099MISC = null;

  /**
   * @name Tax1099Response#lstTax1099OID
   * @type List<Tax1099OID>
   * @access private
   */
  this.lstTax1099OID = null;
}

inherit(Tax1099Response, "extends", T1099Response);


Aggregate.add("TAX1099RS", Tax1099Response);


/**
 * @return {Tax1099DIV[]} the lstTax1099DIV
 */
Tax1099Response.prototype.getLstTax1099DIV = function() {
  return this.lstTax1099DIV;
};
ChildAggregate.add({required: false, order: 0, owner: Tax1099Response, /*type: Tax1099DIV[],*/ readMethod: "getLstTax1099DIV", writeMethod: "setLstTax1099DIV"});


/**
 * @param {Tax1099DIV[]} lstTax1099DIV
 *            the lstTax1099DIV to set
 */
Tax1099Response.prototype.setLstTax1099DIV = function(lstTax1099DIV) {
  this.lstTax1099DIV = lstTax1099DIV;
};


Tax1099Response.prototype.getResponseMessageName = function() {
  return "1099 Tax details";
};


/**
 * @return {Tax1099INT[]} the lstTax1099INT
 */
Tax1099Response.prototype.getLstTax1099INT = function() {
  return this.lstTax1099INT;
};
ChildAggregate.add({required: false, order: 1, owner: Tax1099Response, /*type: Tax1099INT[],*/ readMethod: "getLstTax1099INT", writeMethod: "setLstTax1099INT"});


/**
 * @param {Tax1099INT[]} lstTax1099INT the lstTax1099INT to set
 */
Tax1099Response.prototype.setLstTax1099INT = function(lstTax1099INT) {
  this.lstTax1099INT = lstTax1099INT;
};


/**
 * @return {Tax1099R[]} the lstTax1099R
 */
Tax1099Response.prototype.getLstTax1099R = function() {
  return this.lstTax1099R;
};
ChildAggregate.add({required: false, order: 2, owner: Tax1099Response, /*type: Tax1099R[],*/ readMethod: "getLstTax1099R", writeMethod: "setLstTax1099R"});


/**
 * @param {Tax1099R[]} lstTax1099R the lstTax1099R to set
 */
Tax1099Response.prototype.setLstTax1099R = function(lstTax1099R) {
  this.lstTax1099R = lstTax1099R;
};


/**
 * @return {Tax1099B[]} the lstTax1099B
 */
Tax1099Response.prototype.getLstTax1099B = function() {
  return this.lstTax1099B;
};
ChildAggregate.add({required: false, order: 3, owner: Tax1099Response, /*type: Tax1099B[],*/ readMethod: "getLstTax1099B", writeMethod: "setLstTax1099B"});


/**
 * @param {Tax1099B[]} lstTax1099B the lstTax1099B to set
 */
Tax1099Response.prototype.setLstTax1099B = function(lstTax1099B) {
  this.lstTax1099B = lstTax1099B;
};


/**
 * @return {Tax1099MISC[]} the lstTax1099MISC
 */
Tax1099Response.prototype.getLstTax1099MISC = function() {
  return this.lstTax1099MISC;
};
ChildAggregate.add({required: false, order: 4, owner: Tax1099Response, /*type: Tax1099MISC[],*/ readMethod: "getLstTax1099MISC", writeMethod: "setLstTax1099MISC"});


/**
 * @param {Tax1099MISC[]} lstTax1099MISC the lstTax1099MISC to set
 */
Tax1099Response.prototype.setLstTax1099MISC = function(lstTax1099MISC) {
  this.lstTax1099MISC = lstTax1099MISC;
};


/**
 * @return {Tax1099OID[]} the lstTax1099OID
 */
Tax1099Response.prototype.getLstTax1099OID = function() {
  return this.lstTax1099OID;
};
ChildAggregate.add({required: false, order:5, owner: Tax1099Response, /*type: Tax1099OID[],*/ readMethod: "getLstTax1099OID", writeMethod: "setLstTax1099OID"});


/**
 * @param {Tax1099OID[]} lstTax1099OID the lstTax1099OID to set
 */
Tax1099Response.prototype.setLstTax1099OID = function(lstTax1099OID) {
  this.lstTax1099OID = lstTax1099OID;
};




module.exports = Tax1099Response;
