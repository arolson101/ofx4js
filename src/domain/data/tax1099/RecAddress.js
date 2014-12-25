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
var Element = require("../../../meta/Element");

/**
 * @class
 */
function RecAddress () {

  /**
   * @name RecAddress#recName1
   * @type String
   * @access private
   */
  this.recName1 = null;

  /**
   * @name RecAddress#recName2
   * @type String
   * @access private
   */
  this.recName2 = null;

  /**
   * @name RecAddress#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name RecAddress#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name RecAddress#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name RecAddress#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name RecAddress#postalCode
   * @type String
   * @access private
   */
  this.postalCode = null;

  /**
   * @name RecAddress#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("RECADDR", RecAddress);


/**
 * @return {String} the recName1
 */
RecAddress.prototype.getRecName1 = function() {
  return this.recName1;
};
Element.add({name: "RECNAME1",required: true , order: 0, owner: RecAddress, /*type: String,*/ fcn: "getRecName1"});


/**
 * @param {String} recName1 the recName1 to set
 */
RecAddress.prototype.setRecName1 = function(recName1) {
  this.recName1 = recName1;
};


/**
 * @return {String} the recName2
 */
RecAddress.prototype.getRecName2 = function() {
  return this.recName2;
};
Element.add({name: "RECNAME2",required: false , order: 1, owner: RecAddress, /*type: String,*/ fcn: "getRecName2"});


/**
 * @param {String} recName2 the recName2 to set
 */
RecAddress.prototype.setRecName2 = function(recName2) {
  this.recName2 = recName2;
};


/**
 * @return {String} the address1
 */
RecAddress.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1",required: true , order: 2, owner: RecAddress, /*type: String,*/ fcn: "getAddress1"});


/**
 * @param {String} address1 the address1 to set
 */
RecAddress.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * @return {String} the address2
 */
RecAddress.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2",required: true , order: 3, owner: RecAddress, /*type: String,*/ fcn: "getAddress2"});


/**
 * @param {String} address2 the address2 to set
 */
RecAddress.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * @return {String} the city
 */
RecAddress.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY",required: true , order: 4, owner: RecAddress, /*type: String,*/ fcn: "getCity"});


/**
 * @param {String} city the city to set
 */
RecAddress.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * @return {String} the state
 */
RecAddress.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE",required: true , order: 5, owner: RecAddress, /*type: String,*/ fcn: "getState"});


/**
 * @param {String} state the state to set
 */
RecAddress.prototype.setState = function(state) {
  this.state = state;
};


/**
 * @return {String} the postalCode
 */
RecAddress.prototype.getPostalCode = function() {
  return this.postalCode;
};
Element.add({name: "POSTALCODE",required: true , order: 6, owner: RecAddress, /*type: String,*/ fcn: "getPostalCode"});


/**
 * @param {String} postalCode the postalCode to set
 */
RecAddress.prototype.setPostalCode = function(postalCode) {
  this.postalCode = postalCode;
};


/**
 * @return {String} the phone
 */
RecAddress.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE",required: false , order: 7, owner: RecAddress, /*type: String,*/ fcn: "getPhone"});


/**
 * @param {String} phone the phone to set
 */
RecAddress.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = RecAddress;
