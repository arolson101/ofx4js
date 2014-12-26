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
function Payee () {

  /**
   * @name Payee#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name Payee#address1
   * @type String
   * @access private
   */
  this.address1 = null;

  /**
   * @name Payee#address2
   * @type String
   * @access private
   */
  this.address2 = null;

  /**
   * @name Payee#address3
   * @type String
   * @access private
   */
  this.address3 = null;

  /**
   * @name Payee#city
   * @type String
   * @access private
   */
  this.city = null;

  /**
   * @name Payee#state
   * @type String
   * @access private
   */
  this.state = null;

  /**
   * @name Payee#zip
   * @type String
   * @access private
   */
  this.zip = null;

  /**
   * @name Payee#country
   * @type String
   * @access private
   */
  this.country = null;

  /**
   * @name Payee#phone
   * @type String
   * @access private
   */
  this.phone = null;
}



Aggregate.add("PAYEE", Payee);


/**
 * The name of the payee.
 *
 * @return {String} The name of the payee.
 */
Payee.prototype.getName = function() {
  return this.name;
};
Element.add({name: "NAME", order: 30, owner: Payee, /*type: String,*/ readMethod: "getName", writeMethod: "setName"});


/**
 * The name of the payee.
 *
 * @param {String} name The name of the payee.
 */
Payee.prototype.setName = function(name) {
  this.name = name;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress1 = function() {
  return this.address1;
};
Element.add({name: "ADDR1", required: true, order: 40, owner: Payee, /*type: String,*/ readMethod: "getAddress1", writeMethod: "setAddress1"});


/**
 * The address of the payee.
 *
 * @param {String} address1 The address of the payee.
 */
Payee.prototype.setAddress1 = function(address1) {
  this.address1 = address1;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress2 = function() {
  return this.address2;
};
Element.add({name: "ADDR2", order: 50, owner: Payee, /*type: String,*/ readMethod: "getAddress2", writeMethod: "setAddress2"});


/**
 * The address of the payee.
 *
 * @param {String} address2 The address of the payee.
 */
Payee.prototype.setAddress2 = function(address2) {
  this.address2 = address2;
};


/**
 * The address of the payee.
 *
 * @return {String} The address of the payee.
 */
Payee.prototype.getAddress3 = function() {
  return this.address3;
};
Element.add({name: "ADDR3", order: 60, owner: Payee, /*type: String,*/ readMethod: "getAddress3", writeMethod: "setAddress3"});


/**
 * The address of the payee.
 *
 * @param {String} address3 The address of the payee.
 */
Payee.prototype.setAddress3 = function(address3) {
  this.address3 = address3;
};


/**
 * The city of the payee.
 *
 * @return {String} The city of the payee.
 */
Payee.prototype.getCity = function() {
  return this.city;
};
Element.add({name: "CITY", required: true, order: 70, owner: Payee, /*type: String,*/ readMethod: "getCity", writeMethod: "setCity"});


/**
 * The city of the payee.
 *
 * @param {String} city The city of the payee.
 */
Payee.prototype.setCity = function(city) {
  this.city = city;
};


/**
 * The state of this payee.
 *
 * @return {String} The state of this payee.
 */
Payee.prototype.getState = function() {
  return this.state;
};
Element.add({name: "STATE", required: true, order: 80, owner: Payee, /*type: String,*/ readMethod: "getState", writeMethod: "setState"});


/**
 * The state of this payee.
 *
 * @param {String} state The state of this payee.
 */
Payee.prototype.setState = function(state) {
  this.state = state;
};


/**
 * The postal code of this payee.
 *
 * @return {String} The postal code of this payee.
 */
Payee.prototype.getZip = function() {
  return this.zip;
};
Element.add({name: "POSTALCODE", required: true, order: 90, owner: Payee, /*type: String,*/ readMethod: "getZip", writeMethod: "setZip"});


/**
 * The postal code of this payee.
 *
 * @param {String} zip The postal code of this payee.
 */
Payee.prototype.setZip = function(zip) {
  this.zip = zip;
};


/**
 * The country code for this payee.
 *
 * @return {String} The country code for this payee.
 * @see java.util.Locale#getISO3Country()
 */
Payee.prototype.getCountry = function() {
  return this.country;
};
Element.add({name: "COUNTRY", required: true, order: 100, owner: Payee, /*type: String,*/ readMethod: "getCountry", writeMethod: "setCountry"});


/**
 * The country code for this payee.
 *
 * @param {String} country The country code for this payee.
 */
Payee.prototype.setCountry = function(country) {
  this.country = country;
};


/**
 * The phone number.
 *
 * @return {String} The phone number.
 */
Payee.prototype.getPhone = function() {
  return this.phone;
};
Element.add({name: "PHONE", order: 110, owner: Payee, /*type: String,*/ readMethod: "getPhone", writeMethod: "setPhone"});


/**
 * The phone number.
 *
 * @param {String} phone The phone number.
 */
Payee.prototype.setPhone = function(phone) {
  this.phone = phone;
};




module.exports = Payee;
