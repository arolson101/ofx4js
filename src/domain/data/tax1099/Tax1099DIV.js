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
function Tax1099DIV () {

  /**
   * @name Tax1099DIV#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099DIV#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099DIV#ordDiv
   * @type String
   * @access private
   */
  this.ordDiv = null;

  /**
   * @name Tax1099DIV#qualifiedDiv
   * @type String
   * @access private
   */
  this.qualifiedDiv = null;

  /**
   * @name Tax1099DIV#totCapGain
   * @type String
   * @access private
   */
  this.totCapGain = null;

  /**
   * @name Tax1099DIV#p28Gain
   * @type String
   * @access private
   */
  this.p28Gain = null;

  /**
   * @name Tax1099DIV#unrecSec1250
   * @type String
   * @access private
   */
  this.unrecSec1250 = null;

  /**
   * @name Tax1099DIV#sec1202
   * @type String
   * @access private
   */
  this.sec1202 = null;

  /**
   * @name Tax1099DIV#nonTaxDist
   * @type String
   * @access private
   */
  this.nonTaxDist = null;

  /**
   * @name Tax1099DIV#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099DIV#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099DIV#forTaxPd
   * @type String
   * @access private
   */
  this.forTaxPd = null;

  /**
   * @name Tax1099DIV#cashLiq
   * @type String
   * @access private
   */
  this.cashLiq = null;

  /**
   * @name Tax1099DIV#nonCashLiq
   * @type String
   * @access private
   */
  this.nonCashLiq = null;

  /**
   * @name Tax1099DIV#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099DIV#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099DIV#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099DIV#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099DIV#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099DIV_V100", Tax1099DIV);


Tax1099DIV.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add(Tax1099DIV, {name: "SRVRTID",required: false , order: 0, attributeType: String, readMethod: "getSrvrtId", writeMethod: "setSrvrtId"});


Tax1099DIV.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099DIV.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add(Tax1099DIV, {name: "TAXYEAR", required: false, order: 1, attributeType: String, readMethod: "getTaxYear", writeMethod: "setTaxYear"});


Tax1099DIV.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the ordDiv
 */
Tax1099DIV.prototype.getOrdDiv = function() {
  return this.ordDiv;
};
Element.add(Tax1099DIV, {name: "ORDDIV", required: false, order: 2, attributeType: String, readMethod: "getOrdDiv", writeMethod: "setOrdDiv"});


/**
 * @param {String} ordDiv the ordDiv to set
 */
Tax1099DIV.prototype.setOrdDiv = function(ordDiv) {
  this.ordDiv = ordDiv;
};


/**
 * @return {String} the qualifiedDiv
 */
Tax1099DIV.prototype.getQualifiedDiv = function() {
  return this.qualifiedDiv;
};
Element.add(Tax1099DIV, {name: "QUALIFIEDDIV", required: false, order: 3, attributeType: String, readMethod: "getQualifiedDiv", writeMethod: "setQualifiedDiv"});


/**
 * @param {String} qualifiedDiv the qualifiedDiv to set
 */
Tax1099DIV.prototype.setQualifiedDiv = function(qualifiedDiv) {
  this.qualifiedDiv = qualifiedDiv;
};


/**
 * @return {String} the totCapGain
 */
Tax1099DIV.prototype.getTotCapGain = function() {
  return this.totCapGain;
};
Element.add(Tax1099DIV, {name: "TOTCAPGAIN", required: false, order: 4, attributeType: String, readMethod: "getTotCapGain", writeMethod: "setTotCapGain"});


/**
 * @param {String} totCapGain the totCapGain to set
 */
Tax1099DIV.prototype.setTotCapGain = function(totCapGain) {
  this.totCapGain = totCapGain;
};


/**
 * @return {String} the p28Gain
 */
Tax1099DIV.prototype.getP28Gain = function() {
  return this.p28Gain;
};
Element.add(Tax1099DIV, {name: "P28GAIN", required: false, order: 5, attributeType: String, readMethod: "getP28Gain", writeMethod: "setP28Gain"});


/**
 * @param {String} p28Gain the p28Gain to set
 */
Tax1099DIV.prototype.setP28Gain = function(p28Gain) {
  this.p28Gain = p28Gain;
};


/**
 * @return {String} the unrecSec1250
 */
Tax1099DIV.prototype.getUnrecSec1250 = function() {
  return this.unrecSec1250;
};
Element.add(Tax1099DIV, {name: "UNRECSEC1250", required: false, order: 6, attributeType: String, readMethod: "getUnrecSec1250", writeMethod: "setUnrecSec1250"});


/**
 * @param {String} unrecSec1250 the unrecSec1250 to set
 */
Tax1099DIV.prototype.setUnrecSec1250 = function(unrecSec1250) {
  this.unrecSec1250 = unrecSec1250;
};


/**
 * @return {String} the sec1202
 */
Tax1099DIV.prototype.getSec1202 = function() {
  return this.sec1202;
};
Element.add(Tax1099DIV, {name: "SEC1202", required: false, order: 7, attributeType: String, readMethod: "getSec1202", writeMethod: "setSec1202"});


/**
 * @param {String} sec1202 the sec1202 to set
 */
Tax1099DIV.prototype.setSec1202 = function(sec1202) {
  this.sec1202 = sec1202;
};


/**
 * @return {String} the nonTaxDist
 */
Tax1099DIV.prototype.getNonTaxDist = function() {
  return this.nonTaxDist;
};
Element.add(Tax1099DIV, {name: "NONTAXDIST", required: false, order: 8, attributeType: String, readMethod: "getNonTaxDist", writeMethod: "setNonTaxDist"});


/**
 * @param {String} nonTaxDist the nonTaxDist to set
 */
Tax1099DIV.prototype.setNonTaxDist = function(nonTaxDist) {
  this.nonTaxDist = nonTaxDist;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099DIV.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add(Tax1099DIV, {name: "FEDTAXWH", required: false, order: 9, attributeType: String, readMethod: "getFedTaxWh", writeMethod: "setFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099DIV.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the investExp
 */
Tax1099DIV.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add(Tax1099DIV, {name: "INVESTEXP", required: false, order: 10, attributeType: String, readMethod: "getInvestExp", writeMethod: "setInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099DIV.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {String} the forTaxPd
 */
Tax1099DIV.prototype.getForTaxPd = function() {
  return this.forTaxPd;
};
Element.add(Tax1099DIV, {name: "FORTAXPD", required: false, order: 11, attributeType: String, readMethod: "getForTaxPd", writeMethod: "setForTaxPd"});


/**
 * @param {String} forTaxPd the forTaxPd to set
 */
Tax1099DIV.prototype.setForTaxPd = function(forTaxPd) {
  this.forTaxPd = forTaxPd;
};


/**
 * @return {String} the cashLiq
 */
Tax1099DIV.prototype.getCashLiq = function() {
  return this.cashLiq;
};
Element.add(Tax1099DIV, {name: "CASHLIQ", required: false, order: 12, attributeType: String, readMethod: "getCashLiq", writeMethod: "setCashLiq"});


/**
 * @param {String} cashLiq the cashLiq to set
 */
Tax1099DIV.prototype.setCashLiq = function(cashLiq) {
  this.cashLiq = cashLiq;
};


/**
 * @return {String} the nonCashLiq
 */
Tax1099DIV.prototype.getNonCashLiq = function() {
  return this.nonCashLiq;
};
Element.add(Tax1099DIV, {name: "NONCASHLIQ", required: false, order: 13, attributeType: String, readMethod: "getNonCashLiq", writeMethod: "setNonCashLiq"});


/**
 * @param {String} nonCashLiq the nonCashLiq to set
 */
Tax1099DIV.prototype.setNonCashLiq = function(nonCashLiq) {
  this.nonCashLiq = nonCashLiq;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099DIV.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add(Tax1099DIV, {required:true, order: 14, attributeType: PayerAddress, readMethod: "getPayerAddress", writeMethod: "setPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099DIV.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099DIV.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add(Tax1099DIV, {name: "PAYERID", required: true, order: 15, attributeType: String, readMethod: "getPayerId", writeMethod: "setPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099DIV.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099DIV.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add(Tax1099DIV, {required:true, order: 16, attributeType: RecAddress, readMethod: "getRecAddress", writeMethod: "setRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099DIV.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099DIV.prototype.getRecId = function() {
  return this.recId;
};
Element.add(Tax1099DIV, {name: "RECID", required: true, order: 17, attributeType: String, readMethod: "getRecId", writeMethod: "setRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099DIV.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099DIV.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add(Tax1099DIV, {name: "RECACCT", required: true, order: 18, attributeType: String, readMethod: "getRecAcct", writeMethod: "setRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099DIV.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099DIV;
