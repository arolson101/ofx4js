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
function Tax1099OID () {

  /**
   * @name Tax1099OID#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099OID#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099OID#originalDisc
   * @type String
   * @access private
   */
  this.originalDisc = null;

  /**
   * @name Tax1099OID#otherPerInt
   * @type String
   * @access private
   */
  this.otherPerInt = null;

  /**
   * @name Tax1099OID#erlWithPen
   * @type String
   * @access private
   */
  this.erlWithPen = null;

  /**
   * @name Tax1099OID#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099OID#desc
   * @type String
   * @access private
   */
  this.desc = null;

  /**
   * @name Tax1099OID#oidOnUstres
   * @type String
   * @access private
   */
  this.oidOnUstres = null;

  /**
   * @name Tax1099OID#investExp
   * @type String
   * @access private
   */
  this.investExp = null;

  /**
   * @name Tax1099OID#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099OID#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099OID#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099OID#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099OID#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099OID_V100", Tax1099OID);


Tax1099OID.prototype.getSrvrtId = function() {
  return this.srvrtId;
};
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099OID, /*type: String,*/ readMethod: "getSrvrtId", writeMethod: "setSrvrtId"});


Tax1099OID.prototype.setSrvrtId = function(/*String*/ srvrtId) {
  this.srvrtId = srvrtId;
};


Tax1099OID.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099OID, /*type: String,*/ readMethod: "getTaxYear", writeMethod: "setTaxYear"});


Tax1099OID.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};


/**
 * @return {String} the originalDisc
 */
Tax1099OID.prototype.getOriginalDisc = function() {
  return this.originalDisc;
};
Element.add({name: "ORIGISDISC", required: false, order: 2, owner: Tax1099OID, /*type: String,*/ readMethod: "getOriginalDisc", writeMethod: "setOriginalDisc"});


/**
 * @param {String} originalDisc the originalDisc to set
 */
Tax1099OID.prototype.setOriginalDisc = function(originalDisc) {
  this.originalDisc = originalDisc;
};


/**
 * @return {String} the otherPerInt
 */
Tax1099OID.prototype.getOtherPerInt = function() {
  return this.otherPerInt;
};
Element.add({name: "OTHERPERINT", required: false, order: 3, owner: Tax1099OID, /*type: String,*/ readMethod: "getOtherPerInt", writeMethod: "setOtherPerInt"});


/**
 * @param {String} otherPerInt the otherPerInt to set
 */
Tax1099OID.prototype.setOtherPerInt = function(otherPerInt) {
  this.otherPerInt = otherPerInt;
};


/**
 * @return {String} the erlWithPen
 */
Tax1099OID.prototype.getErlWithPen = function() {
  return this.erlWithPen;
};
Element.add({name: "ERLWITHPEN", required: false, order: 4, owner: Tax1099OID, /*type: String,*/ readMethod: "getErlWithPen", writeMethod: "setErlWithPen"});


/**
 * @param {String} erlWithPen the erlWithPen to set
 */
Tax1099OID.prototype.setErlWithPen = function(erlWithPen) {
  this.erlWithPen = erlWithPen;
};


/**
 * @return {String} the fedTaxWh
 */
Tax1099OID.prototype.getFedTaxWh = function() {
  return this.fedTaxWh;
};
Element.add({name: "FEDTAXWH", required: false, order: 5, owner: Tax1099OID, /*type: String,*/ readMethod: "getFedTaxWh", writeMethod: "setFedTaxWh"});


/**
 * @param {String} fedTaxWh the fedTaxWh to set
 */
Tax1099OID.prototype.setFedTaxWh = function(fedTaxWh) {
  this.fedTaxWh = fedTaxWh;
};


/**
 * @return {String} the desc
 */
Tax1099OID.prototype.getDesc = function() {
  return this.desc;
};
Element.add({name: "DESCRIPTION", required: true, order: 6, owner: Tax1099OID, /*type: String,*/ readMethod: "getDesc", writeMethod: "setDesc"});


/**
 * @param {String} desc the desc to set
 */
Tax1099OID.prototype.setDesc = function(desc) {
  this.desc = desc;
};


/**
 * @return {String} the oidOnUstres
 */
Tax1099OID.prototype.getOidOnUstres = function() {
  return this.oidOnUstres;
};
Element.add({name: "OIDONUSTRES", required: false, order: 7, owner: Tax1099OID, /*type: String,*/ readMethod: "getOidOnUstres", writeMethod: "setOidOnUstres"});


/**
 * @param {String} oidOnUstres the oidOnUstres to set
 */
Tax1099OID.prototype.setOidOnUstres = function(oidOnUstres) {
  this.oidOnUstres = oidOnUstres;
};


/**
 * @return {String} the investExp
 */
Tax1099OID.prototype.getInvestExp = function() {
  return this.investExp;
};
Element.add({name: "INVESTEXP", required: false, order: 8, owner: Tax1099OID, /*type: String,*/ readMethod: "getInvestExp", writeMethod: "setInvestExp"});


/**
 * @param {String} investExp the investExp to set
 */
Tax1099OID.prototype.setInvestExp = function(investExp) {
  this.investExp = investExp;
};


/**
 * @return {PayerAddress} the payerAddress
 */
Tax1099OID.prototype.getPayerAddress = function() {
  return this.payerAddress;
};
ChildAggregate.add({required:true, order: 9, owner: Tax1099OID, /*type: PayerAddress,*/ readMethod: "getPayerAddress", writeMethod: "setPayerAddress"});


/**
 * @param {PayerAddress} payerAddress the payerAddress to set
 */
Tax1099OID.prototype.setPayerAddress = function(payerAddress) {
  this.payerAddress = payerAddress;
};


/**
 * @return {String} the payerId
 */
Tax1099OID.prototype.getPayerId = function() {
  return this.payerId;
};
Element.add({name: "PAYERID", required: true, order: 10, owner: Tax1099OID, /*type: String,*/ readMethod: "getPayerId", writeMethod: "setPayerId"});


/**
 * @param {String} payerId the payerId to set
 */
Tax1099OID.prototype.setPayerId = function(payerId) {
  this.payerId = payerId;
};


/**
 * @return {RecAddress} the recAddress
 */
Tax1099OID.prototype.getRecAddress = function() {
  return this.recAddress;
};
ChildAggregate.add({required:true, order: 11, owner: Tax1099OID, /*type: RecAddress,*/ readMethod: "getRecAddress", writeMethod: "setRecAddress"});


/**
 * @param {RecAddress} recAddress the recAddress to set
 */
Tax1099OID.prototype.setRecAddress = function(recAddress) {
  this.recAddress = recAddress;
};


/**
 * @return {String} the recId
 */
Tax1099OID.prototype.getRecId = function() {
  return this.recId;
};
Element.add({name: "RECID", required: true, order: 12, owner: Tax1099OID, /*type: String,*/ readMethod: "getRecId", writeMethod: "setRecId"});


/**
 * @param {String} recId the recId to set
 */
Tax1099OID.prototype.setRecId = function(recId) {
  this.recId = recId;
};


/**
 * @return {String} the recAcct
 */
Tax1099OID.prototype.getRecAcct = function() {
  return this.recAcct;
};
Element.add({name: "RECACCT", required: true, order: 13, owner: Tax1099OID, /*type: String,*/ readMethod: "getRecAcct", writeMethod: "setRecAcct"});


/**
 * @param {String} recAcct the recAcct to set
 */
Tax1099OID.prototype.setRecAcct = function(recAcct) {
  this.recAcct = recAcct;
};




module.exports = Tax1099OID;
