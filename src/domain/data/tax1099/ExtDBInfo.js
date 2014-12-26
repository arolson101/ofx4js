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
function ExtDBInfo () {

  /**
   * @name ExtDBInfo#procDet
   * @type List<ProcDet>
   * @access private
   */
  this.procDet = null;

  /**
   * @name ExtDBInfo#teInterest
   * @type String
   * @access private
   */
  this.teInterest = null;

  /**
   * @name ExtDBInfo#pabInterest
   * @type String
   * @access private
   */
  this.pabInterest = null;

  /**
   * @name ExtDBInfo#teIntDividend
   * @type String
   * @access private
   */
  this.teIntDividend = null;

  /**
   * @name ExtDBInfo#pabDividend
   * @type String
   * @access private
   */
  this.pabDividend = null;
}



Aggregate.add("EXTDBINFO_V100", ExtDBInfo);


/**
 * @return {ProcDet[]} the procDet
 */
ExtDBInfo.prototype.getProcDet = function() {
  return this.procDet;
};
ChildAggregate.add({required:false, order: 0, owner: ExtDBInfo, /*type: ProcDet[],*/ readMethod: "getProcDet", writeMethod: "setProcDet"});


/**
 * @param {ProcDet[]} procDet the procDet to set
 */
ExtDBInfo.prototype.setProcDet = function(procDet) {
  this.procDet = procDet;
};


/**
 * @return {String} the teInterest
 */
ExtDBInfo.prototype.getTeInterest = function() {
  return this.teInterest;
};
Element.add({name: "TEINTEREST",required: false , order: 1, owner: ExtDBInfo, /*type: String,*/ readMethod: "getTeInterest", writeMethod: "setTeInterest"});


/**
 * @param {String} teInterest the teInterest to set
 */
ExtDBInfo.prototype.setTeInterest = function(teInterest) {
  this.teInterest = teInterest;
};


/**
 * @return {String} the pabInterest
 */
ExtDBInfo.prototype.getPabInterest = function() {
  return this.pabInterest;
};
Element.add({name: "PABINTEREST",required: false , order: 2, owner: ExtDBInfo, /*type: String,*/ readMethod: "getPabInterest", writeMethod: "setPabInterest"});


/**
 * @param {String} pabInterest the pabInterest to set
 */
ExtDBInfo.prototype.setPabInterest = function(pabInterest) {
  this.pabInterest = pabInterest;
};


/**
 * @return {String} the teIntDividend
 */
ExtDBInfo.prototype.getTeIntDividend = function() {
  return this.teIntDividend;
};
Element.add({name: "TEINTDIVIDEND",required: false , order: 3, owner: ExtDBInfo, /*type: String,*/ readMethod: "getTeIntDividend", writeMethod: "setTeIntDividend"});


/**
 * @param {String} teIntDividend the teIntDividend to set
 */
ExtDBInfo.prototype.setTeIntDividend = function(teIntDividend) {
  this.teIntDividend = teIntDividend;
};


/**
 * @return {String} the pabDividend
 */
ExtDBInfo.prototype.getPabDividend = function() {
  return this.pabDividend;
};
Element.add({name: "PABDIVIDEND",required: false , order: 4, owner: ExtDBInfo, /*type: String,*/ readMethod: "getPabDividend", writeMethod: "setPabDividend"});


/**
 * @param {String} pabDividend the pabDividend to set
 */
ExtDBInfo.prototype.setPabDividend = function(pabDividend) {
  this.pabDividend = pabDividend;
};




module.exports = ExtDBInfo;
