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
Element.add({name: "SRVRTID",required: false , order: 0, owner: Tax1099DIV, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099DIV.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099DIV.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: false, order: 1, owner: Tax1099DIV, /*type: String,*/ fcn: "getTaxYear"});


Tax1099DIV.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the ordDiv
 */
Tax1099DIV.prototype.getOrdDiv = function() {
  return this.ordDiv;
};
Element.add({name: "ORDDIV", required: false, order: 2, owner: Tax1099DIV, /*type: String,*/ fcn: "getOrdDiv"});


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
Element.add({name: "QUALIFIEDDIV", required: false, order: 3, owner: Tax1099DIV, /*type: String,*/ fcn: "getQualifiedDiv"});


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
Element.add({name: "TOTCAPGAIN", required: false, order: 4, owner: Tax1099DIV, /*type: String,*/ fcn: "getTotCapGain"});


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
Element.add({name: "P28GAIN", required: false, order: 5, owner: Tax1099DIV, /*type: String,*/ fcn: "getP28Gain"});


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
Element.add({name: "UNRECSEC1250", required: false, order: 6, owner: Tax1099DIV, /*type: String,*/ fcn: "getUnrecSec1250"});


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
Element.add({name: "SEC1202", required: false, order: 7, owner: Tax1099DIV, /*type: String,*/ fcn: "getSec1202"});


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
Element.add({name: "NONTAXDIST", required: false, order: 8, owner: Tax1099DIV, /*type: String,*/ fcn: "getNonTaxDist"});


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
Element.add({name: "FEDTAXWH", required: false, order: 9, owner: Tax1099DIV, /*type: String,*/ fcn: "getFedTaxWh"});


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
Element.add({name: "INVESTEXP", required: false, order: 10, owner: Tax1099DIV, /*type: String,*/ fcn: "getInvestExp"});


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
Element.add({name: "FORTAXPD", required: false, order: 11, owner: Tax1099DIV, /*type: String,*/ fcn: "getForTaxPd"});


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
Element.add({name: "CASHLIQ", required: false, order: 12, owner: Tax1099DIV, /*type: String,*/ fcn: "getCashLiq"});


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
Element.add({name: "NONCASHLIQ", required: false, order: 13, owner: Tax1099DIV, /*type: String,*/ fcn: "getNonCashLiq"});


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
ChildAggregate.add({required:true, order: 14, owner: Tax1099DIV, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


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
Element.add({name: "PAYERID", required: true, order: 15, owner: Tax1099DIV, /*type: String,*/ fcn: "getPayerId"});


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
ChildAggregate.add({required:true, order: 16, owner: Tax1099DIV, /*type: RecAddress,*/ fcn: "getRecAddress"});


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
Element.add({name: "RECID", required: true, order: 17, owner: Tax1099DIV, /*type: String,*/ fcn: "getRecId"});


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
Element.add({name: "RECACCT", required: true, order: 18, owner: Tax1099DIV, /*type: String,*/ fcn: "getRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099DIV.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099DIV;
