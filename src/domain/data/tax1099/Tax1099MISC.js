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
var ChildAggregate = require("../../../meta/ChildAggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 */
function Tax1099MISC () {

  /**
   * @name Tax1099MISC#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099MISC#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099MISC#royalties
   * @type String
   * @access private
   */
  this.royalties = null;

  /**
   * @name Tax1099MISC#otherIncome
   * @type String
   * @access private
   */
  this.otherIncome = null;

  /**
   * @name Tax1099MISC#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099MISC#subPmts
   * @type String
   * @access private
   */
  this.subPmts = null;

  /**
   * @name Tax1099MISC#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099MISC#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099MISC#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099MISC#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099MISC#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099MISC_V100", Tax1099MISC);


Tax1099MISC.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add(Tax1099MISC, {name: "SRVRTID",required: true , order: 0, attributeType: String, readMethod: "getSrvrtId", writeMethod: "setSrvrtId"});


Tax1099MISC.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099MISC.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add(Tax1099MISC, {name: "TAXYEAR", required: true, order: 1, attributeType: String, readMethod: "getTaxYear", writeMethod: "setTaxYear"});


Tax1099MISC.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the royalties
 */
Tax1099MISC.prototype.getRoyalties = function() {
  return this.royalties;
};
Element.add(Tax1099MISC, {name: "ROYALTIES",required: false , order: 2, attributeType: String, readMethod: "getRoyalties", writeMethod: "setRoyalties"});


/**
 * @param {String} royalties the royalties to set
 */
Tax1099MISC.prototype.setRoyalties = function(royalties) {
  this.royalties = royalties;
};


/**
 * @return {String} the otherIncome
 */
Tax1099MISC.prototype.getOtherIncome = function() {
  return this.otherIncome;
};
Element.add(Tax1099MISC, {name: "OTHERINCOME",required: false , order: 3, attributeType: String, readMethod: "getOtherIncome", writeMethod: "setOtherIncome"});


/**
 * @param {String} otherIncome the otherIncome to set
 */
Tax1099MISC.prototype.setOtherIncome = function(otherIncome) {
  this.otherIncome = otherIncome;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099MISC.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add(Tax1099MISC, {name: "FEDTAXWH",required: false , order: 4, attributeType: String, readMethod: "getFedTaxWh", writeMethod: "setFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099MISC.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the subPmts
 */
Tax1099MISC.prototype.getSubPmts = function() {
  return this.subPmts;
};
Element.add(Tax1099MISC, {name: "SUBPMTS",required: false , order: 5, attributeType: String, readMethod: "getSubPmts", writeMethod: "setSubPmts"});


/**
 * @param {String} subPmts the subPmts to set
 */
Tax1099MISC.prototype.setSubPmts = function(subPmts) {
  this.subPmts = subPmts;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099MISC.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add(Tax1099MISC, {required:true, order: 6, attributeType: PayerAddress, readMethod: "getPayerAddress", writeMethod: "setPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099MISC.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099MISC.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add(Tax1099MISC, {name: "PAYERID", required: true, order: 7, attributeType: String, readMethod: "getPayerId", writeMethod: "setPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099MISC.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099MISC.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add(Tax1099MISC, {required:true, order: 8, attributeType: RecAddress, readMethod: "getRecAddress", writeMethod: "setRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099MISC.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099MISC.prototype.getRecId = function() {
  return this.recId;
};
Element.add(Tax1099MISC, {name: "RECID", required: true, order: 9, attributeType: String, readMethod: "getRecId", writeMethod: "setRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099MISC.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099MISC.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add(Tax1099MISC, {name: "RECACCT", required: true, order: 10, attributeType: String, readMethod: "getRecAcct", writeMethod: "setRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099MISC.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099MISC;
