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
function PayerAddress () {

  /**
   * @name PayerAddress#payerName1
   * @type String
   * @access private
   */
  this.payerName1 = null;

  /**
   * @name PayerAddress#payerName2
   * @type String
   * @access private
   */
  this.payerName2 = null;

  /**
   * @name PayerAddress#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name PayerAddress#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name PayerAddress#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name PayerAddress#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name PayerAddress#postalCode
   * @type String
   * @access private
   */
  this.postalCode = null;

  /**
   * @name PayerAddress#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("PAYERADDR", PayerAddress);


/**
 * @return {String} the payerName1
 */
PayerAddress.prototype.getPayerName1 = function() {
  return this.payerName1;
};
Element.add({name: "PAYERNAME1",required: true , order: 0, owner: PayerAddress, /*type: String,*/ readMethod: "getPayerName1", writeMethod: "setPayerName1"});


/**
 * @param {String} payerName1 the payerName1 to set
 */
PayerAddress.prototype.setPayerName1 = function(payerName1) {
  this.payerName1 = payerName1;
};


/**
 * @return {String} the payerName2
 */
PayerAddress.prototype.getPayerName2 = function() {
  return this.payerName2;
};
Element.add({name: "PAYERNAME2",required: false , order: 1, owner: PayerAddress, /*type: String,*/ readMethod: "getPayerName2", writeMethod: "setPayerName2"});


/**
 * @param {String} payerName2 the payerName2 to set
 */
PayerAddress.prototype.setPayerName2 = function(payerName2) {
  this.payerName2 = payerName2;
};


/**
 * @return {String} the address1
 */
PayerAddress.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1",required: true , order: 2, owner: PayerAddress, /*type: String,*/ readMethod: "getAddress1", writeMethod: "setAddress1"});


/**
 * @param {String} address1 the address1 to set
 */
PayerAddress.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * @return {String} the address2
 */
PayerAddress.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2",required: true , order: 3, owner: PayerAddress, /*type: String,*/ readMethod: "getAddress2", writeMethod: "setAddress2"});


/**
 * @param {String} address2 the address2 to set
 */
PayerAddress.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * @return {String} the city
 */
PayerAddress.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY",required: true , order: 4, owner: PayerAddress, /*type: String,*/ readMethod: "getCity", writeMethod: "setCity"});


/**
 * @param {String} city the city to set
 */
PayerAddress.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * @return {String} the state
 */
PayerAddress.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE",required: true , order: 5, owner: PayerAddress, /*type: String,*/ readMethod: "getState", writeMethod: "setState"});


/**
 * @param {String} state the state to set
 */
PayerAddress.prototype.setState = function(state) {
  this.state = state;
};


/**
 * @return {String} the postalCode
 */
PayerAddress.prototype.getPostalCode = function() {
  return this.postalCode;
};
Element.add({name: "POSTALCODE",required: true , order: 6, owner: PayerAddress, /*type: String,*/ readMethod: "getPostalCode", writeMethod: "setPostalCode"});


/**
 * @param {String} postalCode the postalCode to set
 */
PayerAddress.prototype.setPostalCode = function(postalCode) {
  this.postalCode = postalCode;
};


/**
 * @return {String} the phone
 */
PayerAddress.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE",required: false , order: 7, owner: PayerAddress, /*type: String,*/ readMethod: "getPhone", writeMethod: "setPhone"});


/**
 * @param {String} phone the phone to set
 */
PayerAddress.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = PayerAddress;
