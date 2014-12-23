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


function Tax1099R () {

  /**
   * @name Tax1099R#srvrtId
   * @type String
   * @access private
   */
  this.srvrtId = null;

  /**
   * @name Tax1099R#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;

  /**
   * @name Tax1099R#grossDist
   * @type String
   * @access private
   */
  this.grossDist = null;

  /**
   * @name Tax1099R#taxAmt
   * @type String
   * @access private
   */
  this.taxAmt = null;

  /**
   * @name Tax1099R#taxAmtNd
   * @type String
   * @access private
   */
  this.taxAmtNd = null;

  /**
   * @name Tax1099R#capGain
   * @type String
   * @access private
   */
  this.capGain = null;

  /**
   * @name Tax1099R#fedTaxWh
   * @type String
   * @access private
   */
  this.fedTaxWh = null;

  /**
   * @name Tax1099R#empContins
   * @type String
   * @access private
   */
  this.empContins = null;

  /**
   * @name Tax1099R#netUnapEmp
   * @type String
   * @access private
   */
  this.netUnapEmp = null;

  /**
   * @name Tax1099R#distCode
   * @type String
   * @access private
   */
  this.distCode = null;

  /**
   * @name Tax1099R#iraSepSimp
   * @type String
   * @access private
   */
  this.iraSepSimp = null;

  /**
   * @name Tax1099R#annCtrctDist
   * @type String
   * @access private
   */
  this.annCtrctDist = null;

  /**
   * @name Tax1099R#totEmpCount
   * @type String
   * @access private
   */
  this.totEmpCount = null;

  /**
   * @name Tax1099R#payerAddress
   * @type PayerAddress
   * @access private
   */
  this.payerAddress = null;

  /**
   * @name Tax1099R#payerId
   * @type String
   * @access private
   */
  this.payerId = null;

  /**
   * @name Tax1099R#recAddress
   * @type RecAddress
   * @access private
   */
  this.recAddress = null;

  /**
   * @name Tax1099R#recId
   * @type String
   * @access private
   */
  this.recId = null;

  /**
   * @name Tax1099R#recAcct
   * @type String
   * @access private
   */
  this.recAcct = null;
}



Aggregate.add("TAX1099R_V100", Tax1099R);


Tax1099R.prototype.getSrvrtId = function() {
	    return srvrtId;
	  };
Element.add({name: "SRVRTID",required: true , order: 0, owner: Tax1099R, /*type: String,*/ fcn: "getSrvrtId"});


Tax1099R.prototype.setSrvrtId = function(/*String*/ srvrtId) {
	    this.srvrtId = srvrtId;
	  };


Tax1099R.prototype.getTaxYear = function() {
	    return taxYear;
	  };
Element.add({name: "TAXYEAR", required: true, order: 1, owner: Tax1099R, /*type: String,*/ fcn: "getTaxYear"});


Tax1099R.prototype.setTaxYear = function(/*String*/ taxYear) {
	    this.taxYear = taxYear;
	  };


	  /**
		 * @return {String} the grossDist
		 */
Tax1099R.prototype.getGrossDist = function() {
			return grossDist;
		};
Element.add({name: "GROSSDIST", required: true, order: 2, owner: Tax1099R, /*type: String,*/ fcn: "getGrossDist"});


		/**
		 * @param {String} grossDist the grossDist to set
		 */
Tax1099R.prototype.setGrossDist = function(grossDist) {
			this.grossDist = grossDist;
		};


		/**
		 * @return {String} the taxAmt
		 */
Tax1099R.prototype.getTaxAmt = function() {
			return taxAmt;
		};
Element.add({name: "TAXAMT", required: false, order: 3, owner: Tax1099R, /*type: String,*/ fcn: "getTaxAmt"});


		/**
		 * @param {String} taxAmt the taxAmt to set
		 */
Tax1099R.prototype.setTaxAmt = function(taxAmt) {
			this.taxAmt = taxAmt;
		};


		/**
		 * @return {String} the taxAmtNd
		 */
Tax1099R.prototype.getTaxAmtNd = function() {
			return taxAmtNd;
		};
Element.add({name: "TAXAMTND", required: false, order: 4, owner: Tax1099R, /*type: String,*/ fcn: "getTaxAmtNd"});


		/**
		 * @param {String} taxAmtNd the taxAmtNd to set
		 */
Tax1099R.prototype.setTaxAmtNd = function(taxAmtNd) {
			this.taxAmtNd = taxAmtNd;
		};


		/**
		 * @return {String} the capGain
		 */
Tax1099R.prototype.getCapGain = function() {
			return capGain;
		};
Element.add({name: "CAPGAIN", required: false, order: 5, owner: Tax1099R, /*type: String,*/ fcn: "getCapGain"});


		/**
		 * @param {String} capGain the capGain to set
		 */
Tax1099R.prototype.setCapGain = function(capGain) {
			this.capGain = capGain;
		};


	/**
	 * @return {String} the fedTaxWh
	 */
Tax1099R.prototype.getFedTaxWh = function() {
		return fedTaxWh;
	};
Element.add({name: "FEDTAXWH", required: false, order: 6, owner: Tax1099R, /*type: String,*/ fcn: "getFedTaxWh"});


	/**
	 * @param {String} fedTaxWh the fedTaxWh to set
	 */
Tax1099R.prototype.setFedTaxWh = function(fedTaxWh) {
		this.fedTaxWh = fedTaxWh;
	};


	/**
	 * @return {String} the empContins
	 */
Tax1099R.prototype.getEmpContins = function() {
		return empContins;
	};
Element.add({name: "EMPCONTINS", required: false, order: 7, owner: Tax1099R, /*type: String,*/ fcn: "getEmpContins"});


	/**
	 * @param {String} empContins the empContins to set
	 */
Tax1099R.prototype.setEmpContins = function(empContins) {
		this.empContins = empContins;
	};


	/**
	 * @return {String} the netUnapEmp
	 */
Tax1099R.prototype.getNetUnapEmp = function() {
		return netUnapEmp;
	};
Element.add({name: "NETUNAPEMP", required: false, order: 8, owner: Tax1099R, /*type: String,*/ fcn: "getNetUnapEmp"});


	/**
	 * @param {String} netUnapEmp the netUnapEmp to set
	 */
Tax1099R.prototype.setNetUnapEmp = function(netUnapEmp) {
		this.netUnapEmp = netUnapEmp;
	};


	/**
	 * @return {String} the distCode
	 */
Tax1099R.prototype.getDistCode = function() {
		return distCode;
	};
Element.add({name: "DISTCODE", required: true, order: 9, owner: Tax1099R, /*type: String,*/ fcn: "getDistCode"});


	/**
	 * @param {String} distCode the distCode to set
	 */
Tax1099R.prototype.setDistCode = function(distCode) {
		this.distCode = distCode;
	};


	/**
	 * @return {String} the iraSepSimp
	 */
Tax1099R.prototype.getIraSepSimp = function() {
		return iraSepSimp;
	};
Element.add({name: "IRASEPSIMP", required: true, order: 10, owner: Tax1099R, /*type: String,*/ fcn: "getIraSepSimp"});


	/**
	 * @param {String} iraSepSimp the iraSepSimp to set
	 */
Tax1099R.prototype.setIraSepSimp = function(iraSepSimp) {
		this.iraSepSimp = iraSepSimp;
	};


	/**
	 * @return {String} the annCtrctDist
	 */
Tax1099R.prototype.getAnnCtrctDist = function() {
		return annCtrctDist;
	};
Element.add({name: "ANNCTRCTDIST", required: false, order: 11, owner: Tax1099R, /*type: String,*/ fcn: "getAnnCtrctDist"});


	/**
	 * @param {String} annCtrctDist the annCtrctDist to set
	 */
Tax1099R.prototype.setAnnCtrctDist = function(annCtrctDist) {
		this.annCtrctDist = annCtrctDist;
	};


	/**
	 * @return {String} the totEmpCount
	 */
Tax1099R.prototype.getTotEmpCount = function() {
		return totEmpCount;
	};
Element.add({name: "TOTEMPCONT", required: false, order: 12, owner: Tax1099R, /*type: String,*/ fcn: "getTotEmpCount"});


	/**
	 * @param {String} totEmpCount the totEmpCount to set
	 */
Tax1099R.prototype.setTotEmpCount = function(totEmpCount) {
		this.totEmpCount = totEmpCount;
	};


	/**
	 * @return {PayerAddress} the payerAddress
	 */
Tax1099R.prototype.getPayerAddress = function() {
		return payerAddress;
	};
ChildAggregate.add({required:true, order: 13, owner: Tax1099R, /*type: PayerAddress,*/ fcn: "getPayerAddress"});


	/**
	 * @param {PayerAddress} payerAddress the payerAddress to set
	 */
Tax1099R.prototype.setPayerAddress = function(payerAddress) {
		this.payerAddress = payerAddress;
	};


	/**
	 * @return {String} the payerId
	 */
Tax1099R.prototype.getPayerId = function() {
		return payerId;
	};
Element.add({name: "PAYERID", required: true, order: 14, owner: Tax1099R, /*type: String,*/ fcn: "getPayerId"});


	/**
	 * @param {String} payerId the payerId to set
	 */
Tax1099R.prototype.setPayerId = function(payerId) {
		this.payerId = payerId;
	};


	/**
	 * @return {RecAddress} the recAddress
	 */
Tax1099R.prototype.getRecAddress = function() {
		return recAddress;
	};
ChildAggregate.add({required:true, order: 15, owner: Tax1099R, /*type: RecAddress,*/ fcn: "getRecAddress"});


	/**
	 * @param {RecAddress} recAddress the recAddress to set
	 */
Tax1099R.prototype.setRecAddress = function(recAddress) {
		this.recAddress = recAddress;
	};


	/**
	 * @return {String} the recId
	 */
Tax1099R.prototype.getRecId = function() {
		return recId;
	};
Element.add({name: "RECID", required: true, order: 16, owner: Tax1099R, /*type: String,*/ fcn: "getRecId"});


	/**
	 * @param {String} recId the recId to set
	 */
Tax1099R.prototype.setRecId = function(recId) {
		this.recId = recId;
	};


	/**
	 * @return {String} the recAcct
	 */
Tax1099R.prototype.getRecAcct = function() {
		return recAcct;
	};
Element.add({name: "RECACCT", required: true, order: 17, owner: Tax1099R, /*type: String,*/ fcn: "getRecAcct"});


	/**
	 * @param {String} recAcct the recAcct to set
	 */
Tax1099R.prototype.setRecAcct = function(recAcct) {
		this.recAcct = recAcct;
	};




module.exports = Tax1099R;
