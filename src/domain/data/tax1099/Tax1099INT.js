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

var inherit = require("../inherit");

var PayerAddress = require("domain/data/tax1099/PayerAddress");
var RecAddress = require("domain/data/tax1099/RecAddress");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

var Element = require("meta/Element");

/**
 * @author Aparna Gawali
 * aparna.gawali@sungard.com
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
	    return srvrtId;
	  };
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099INT, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099INT.prototype.setSrvrtId = function(/*String*/ srvrtId) {
	    this.srvrtId = srvrtId;
	  };


Tax1099INT.prototype.getTaxYear = function() {
	    return taxYear;
	  };
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099INT, /*type: String,*/ fcn: "getTaxYear"});


Tax1099INT.prototype.setTaxYear = function(/*String*/ taxYear) {
	    this.taxYear = taxYear;
	  };


	/**
	 * @return {String} the intIncome
	 */
Tax1099INT.prototype.getIntIncome = function() {
		return intIncome;
	};
Element.add({name: "INTINCOME",required: false , order: 2, owner: Tax1099INT, /*type: String,*/ fcn: "getIntIncome"});


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
		return erlWithPen;
	};
Element.add({name: "ERLWITHPEN",required: false , order: 3, owner: Tax1099INT, /*type: String,*/ fcn: "getErlWithPen"});


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
		return intUsbndtrs;
	};
Element.add({name: "INTUSBNDTRS",required: false , order: 4, owner: Tax1099INT, /*type: String,*/ fcn: "getIntUsbndtrs"});


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
		return fedTaxWh;
	};
Element.add({name: "FEDTAXWH", required: false, order: 5, owner: Tax1099INT, /*type: String,*/ fcn: "getFedTaxWh"});


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
		return investExp;
	};
Element.add({name: "INVESTEXP", required: false, order: 6, owner: Tax1099INT, /*type: String,*/ fcn: "getInvestExp"});


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
		return forTaxPd;
	};
Element.add({name: "FORTAXPD", required: false, order: 7, owner: Tax1099INT, /*type: String,*/ fcn: "getForTaxPd"});


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
		return payerAddress;
	};
ChildAggregate.add({required:true, order: 8, owner: Tax1099INT, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


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
		return payerId;
	};
Element.add({name: "PAYERID", required: true, order: 9, owner: Tax1099INT, /*type: String,*/ fcn: "getPayerId"});


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
		return recAddress;
	};
ChildAggregate.add({required:true, order: 10, owner: Tax1099INT, /*type: RecAddress,*/ fcn: "getRecAddress"});


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
		return recId;
	};
Element.add({name: "RECID", required: true, order: 11, owner: Tax1099INT, /*type: String,*/ fcn: "getRecId"});


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
		return recAcct;
	};
Element.add({name: "RECACCT", required: true, order: 12, owner: Tax1099INT, /*type: String,*/ fcn: "getRecAcct"});


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
		return taxExemptInt;
	};
Element.add({name: "TAXEXEMPTINT", required: false, order: 13, owner: Tax1099INT, /*type: String,*/ fcn: "getTaxExemptInt"});


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
		return specifiedPabInt;
	};
Element.add({name: "SPECIFIEDPABINT", required: false, order: 14, owner: Tax1099INT, /*type: String,*/ fcn: "getSpecifiedPabInt"});


	/**
	 * @param {String} specifiedPabInt the specifiedPabInt to set
	 */
Tax1099INT.prototype.setSpecifiedPabInt = function(specifiedPabInt) {
		this.specifiedPabInt = specifiedPabInt;
	};




module.exports = Tax1099INT;
