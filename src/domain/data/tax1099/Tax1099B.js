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
	    return srvrtId;
	  };
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099B, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099B.prototype.setSrvrtId = function(/*String*/ srvrtId) {
	    this.srvrtId = srvrtId;
	  };


Tax1099B.prototype.getTaxYear = function() {
	    return taxYear;
	  };
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099B, /*type: String,*/ fcn: "getTaxYear"});


Tax1099B.prototype.setTaxYear = function(/*String*/ taxYear) {
	    this.taxYear = taxYear;
	  };


	/**
	 * @return {ExtDBInfo} the extDBInfo
	 */
Tax1099B.prototype.getExtDBInfo = function() {
		return extDBInfo;
	};
ChildAggregate.add({required:true, order: 2, owner: Tax1099B, /*type: ExtDBInfo,*/ fcn: "getExtDBInfo"});


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
		return payerAddress;
	};
ChildAggregate.add({required:true, order: 3, owner: Tax1099B, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


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
		return payerId;
	};
Element.add({name: "PAYERID", required: true, order: 4, owner: Tax1099B, /*type: String,*/ fcn: "getPayerId"});


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
		return recAddress;
	};
ChildAggregate.add({required:true, order: 5, owner: Tax1099B, /*type: RecAddress,*/ fcn: "getRecAddress"});


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
		return recId;
	};
Element.add({name: "RECID", required: true, order: 6, owner: Tax1099B, /*type: String,*/ fcn: "getRecId"});


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
		return recAcct;
	};
Element.add({name: "RECACCT", required: true, order: 7, owner: Tax1099B, /*type: String,*/ fcn: "getRecAcct"});


	/**
	 * @param {String} recAcct the recAcct to set
	 */
Tax1099B.prototype.setRecAcct = function(recAcct) {
		this.recAcct = recAcct;
	};




module.exports = Tax1099B;
