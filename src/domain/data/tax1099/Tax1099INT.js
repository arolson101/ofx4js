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
var PayerAddress = require("./PayerAddress");
var RecAddress = require("./RecAddress");

/**
 * @class
 */
function Tax1099INT () {

  /**
   * @name Tax1099INT#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099INT#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099INT#intIncome
   * @type String
   * @access private
   */
  this.intIncome = null;

  /**
   * @name Tax1099INT#erlWithPen
   * @type String
   * @access private
   */
  this.erlWithPen = null;

  /**
   * @name Tax1099INT#intUsbndtrs
   * @type String
   * @access private
   */
  this.intUsbndtrs = null;

  /**
   * @name Tax1099INT#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099INT#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099INT#forTaxPd
   * @type String
   * @access private
   */
  this.forTaxPd = null;

  /**
   * @name Tax1099INT#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099INT#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099INT#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099INT#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099INT#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;

  /**
   * @name Tax1099INT#taxExemptInt
   * @type String
   * @access private
   */
  this.taxExemptInt = null;

  /**
   * @name Tax1099INT#specifiedPabInt
   * @type String
   * @access private
   */
  this.specifiedPabInt = null;
}



Aggregate.add("TAX1099INT_V100", Tax1099INT);


Tax1099INT.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add(Tax1099INT, {name: "SRVRTID",required: true , order: 0, attributeType: String, readMethod: "getSrvrtId", writeMethod: "setSrvrtId"});


Tax1099INT.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099INT.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add(Tax1099INT, {name: "TAXYEAR", required: true, order: 1, attributeType: String, readMethod: "getTaxYear", writeMethod: "setTaxYear"});


Tax1099INT.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the intIncome
 */
Tax1099INT.prototype.getIntIncome = function() {
  return this.intIncome;
};
Element.add(Tax1099INT, {name: "INTINCOME",required: false , order: 2, attributeType: String, readMethod: "getIntIncome", writeMethod: "setIntIncome"});


/**
 * @param {String} intIncome the intIncome to set
 */
Tax1099INT.prototype.setIntIncome = function(intIncome) {
  this.intIncome = intIncome;
};


/**
 * @return {String} the erlWithPen
 */
Tax1099INT.prototype.getErlWithPen = function() {
  return this.erlWithPen;
};
Element.add(Tax1099INT, {name: "ERLWITHPEN",required: false , order: 3, attributeType: String, readMethod: "getErlWithPen", writeMethod: "setErlWithPen"});


/**
 * @param {String} erlWithPen the erlWithPen to set
 */
Tax1099INT.prototype.setErlWithPen = function(erlWithPen) {
  this.erlWithPen = erlWithPen;
};


/**
 * @return {String} the intUsbndtrs
 */
Tax1099INT.prototype.getIntUsbndtrs = function() {
  return this.intUsbndtrs;
};
Element.add(Tax1099INT, {name: "INTUSBNDTRS",required: false , order: 4, attributeType: String, readMethod: "getIntUsbndtrs", writeMethod: "setIntUsbndtrs"});


/**
 * @param {String} intUsbndtrs the intUsbndtrs to set
 */
Tax1099INT.prototype.setIntUsbndtrs = function(intUsbndtrs) {
  this.intUsbndtrs = intUsbndtrs;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099INT.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add(Tax1099INT, {name: "FEDTAXWH", required: false, order: 5, attributeType: String, readMethod: "getFedTaxWh", writeMethod: "setFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099INT.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the investExp
 */
Tax1099INT.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add(Tax1099INT, {name: "INVESTEXP", required: false, order: 6, attributeType: String, readMethod: "getInvestExp", writeMethod: "setInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099INT.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {String} the forTaxPd
 */
Tax1099INT.prototype.getForTaxPd = function() {
  return this.forTaxPd;
};
Element.add(Tax1099INT, {name: "FORTAXPD", required: false, order: 7, attributeType: String, readMethod: "getForTaxPd", writeMethod: "setForTaxPd"});


/**
 * @param {String} forTaxPd the forTaxPd to set
 */
Tax1099INT.prototype.setForTaxPd = function(forTaxPd) {
  this.forTaxPd = forTaxPd;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099INT.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add(Tax1099INT, {required:true, order: 8, attributeType: PayerAddress, readMethod: "getPayerAddress", writeMethod: "setPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099INT.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099INT.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add(Tax1099INT, {name: "PAYERID", required: true, order: 9, attributeType: String, readMethod: "getPayerId", writeMethod: "setPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099INT.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099INT.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add(Tax1099INT, {required:true, order: 10, attributeType: RecAddress, readMethod: "getRecAddress", writeMethod: "setRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099INT.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099INT.prototype.getRecId = function() {
  return this.recId;
};
Element.add(Tax1099INT, {name: "RECID", required: true, order: 11, attributeType: String, readMethod: "getRecId", writeMethod: "setRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099INT.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099INT.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add(Tax1099INT, {name: "RECACCT", required: true, order: 12, attributeType: String, readMethod: "getRecAcct", writeMethod: "setRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099INT.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};


/**
 * @return {String} the taxExemptInt
 */
Tax1099INT.prototype.getTaxExemptInt = function() {
  return this.taxExemptInt;
};
Element.add(Tax1099INT, {name: "TAXEXEMPTINT", required: false, order: 13, attributeType: String, readMethod: "getTaxExemptInt", writeMethod: "setTaxExemptInt"});


/**
 * @param {String} taxExemptInt the taxExemptInt to set
 */
Tax1099INT.prototype.setTaxExemptInt = function(taxExemptInt) {
  this.taxExemptInt = taxExemptInt;
};


/**
 * @return {String} the specifiedPabInt
 */
Tax1099INT.prototype.getSpecifiedPabInt = function() {
  return this.specifiedPabInt;
};
Element.add(Tax1099INT, {name: "SPECIFIEDPABINT", required: false, order: 14, attributeType: String, readMethod: "getSpecifiedPabInt", writeMethod: "setSpecifiedPabInt"});


/**
 * @param {String} specifiedPabInt the specifiedPabInt to set
 */
Tax1099INT.prototype.setSpecifiedPabInt = function(specifiedPabInt) {
  this.specifiedPabInt = specifiedPabInt;
};




module.exports = Tax1099INT;
