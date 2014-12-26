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

var PayerAddress = require("./PayerAddress");
var RecAddress = require("./RecAddress");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");

var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099B () {

  /**
   * @name Tax1099B#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099B#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099B#extDBInfo
   * @type ExtDBInfo
   * @access private
   */
  this.extDBInfo = null;

  /**
   * @name Tax1099B#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099B#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099B#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099B#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099B#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099B_V100", Tax1099B);


Tax1099B.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add(Tax1099B, {name: "SRVRTID",required: true , order: 0, attributeType: String, readMethod: "getSrvrtId", writeMethod: "setSrvrtId"});


Tax1099B.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099B.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add(Tax1099B, {name: "TAXYEAR", required: true, order: 1, attributeType: String, readMethod: "getTaxYear", writeMethod: "setTaxYear"});


Tax1099B.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {ExtDBInfo} the extDBInfo
 */
Tax1099B.prototype.getExtDBInfo = function() {
  return this.extDBInfo;
};
ChildAggregate.add(Tax1099B, {required:true, order: 2, attributeType: ExtDBInfo, readMethod: "getExtDBInfo", writeMethod: "setExtDBInfo"});


/**
 * @param {ExtDBInfo} extDBInfo the extDBInfo to set
 */
Tax1099B.prototype.setExtDBInfo = function(extDBInfo) {
  this.extDBInfo = extDBInfo;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099B.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add(Tax1099B, {required:true, order: 3, attributeType: PayerAddress, readMethod: "getPayerAddress", writeMethod: "setPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099B.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099B.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add(Tax1099B, {name: "PAYERID", required: true, order: 4, attributeType: String, readMethod: "getPayerId", writeMethod: "setPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099B.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099B.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add(Tax1099B, {required:true, order: 5, attributeType: RecAddress, readMethod: "getRecAddress", writeMethod: "setRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099B.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099B.prototype.getRecId = function() {
  return this.recId;
};
Element.add(Tax1099B, {name: "RECID", required: true, order: 6, attributeType: String, readMethod: "getRecId", writeMethod: "setRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099B.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099B.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add(Tax1099B, {name: "RECACCT", required: true, order: 7, attributeType: String, readMethod: "getRecAcct", writeMethod: "setRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099B.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099B;
