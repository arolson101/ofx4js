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
 * @see "Section 3.1.3, OFX Spec"
 */
function BalanceRecord () {

  /**
   * @name BalanceRecord#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name BalanceRecord#description
   * @type String
   * @access private
   */
  this.description = null;

  /**
   * @name BalanceRecord#type
   * @type Type
   * @access private
   */
  this.type = null;

  /**
   * @name BalanceRecord#value
   * @type String
   * @access private
   */
  this.value = null;

  /**
   * @name BalanceRecord#timestamp
   * @type Date
   * @access private
   */
  this.timestamp = null;

  /**
   * @name BalanceRecord#currency
   * @type Currency
   * @access private
   */
  this.currency = null;
}



Aggregate.add("BAL", BalanceRecord);


/**
 * @enum
 */
BalanceRecord.Type = {

  DOLLAR: 0,

  PERCENT: 1,

  NUMBER: 2
};

/**
 * Name of the balance.
 *
 * @return {String} Name of the balance.
 */
BalanceRecord.prototype.getName = function() {
  return this.name;
};
Element.add(BalanceRecord, {name: "NAME", required: true, order: 0, attributeType: String, readMethod: "getName", writeMethod: "setName"});


/**
 * Name of the balance.
 *
 * @param {String} name Name of the balance.
 */
BalanceRecord.prototype.setName = function(name) {
  this.name = name;
};


/**
 * Description of the balance.
 *
 * @return {String} Description of the balance.
 */
BalanceRecord.prototype.getDescription = function() {
  return this.description;
};
Element.add(BalanceRecord, {name: "DESC", required: true, order: 10, attributeType: String, readMethod: "getDescription", writeMethod: "setDescription"});


/**
 * Description of the balance.
 *
 * @param {String} description Description of the balance.
 */
BalanceRecord.prototype.setDescription = function(description) {
  this.description = description;
};


/**
 * Type of the balance.
 *
 * @return {Type} Type of the balance.
 */
BalanceRecord.prototype.getType = function() {
  return this.type;
};
Element.add(BalanceRecord, {name: "BALTYPE", required: true, order: 20, attributeType: Type, readMethod: "getType", writeMethod: "setType"});


/**
 * Type of the balance.
 *
 * @param {Type} type Type of the balance.
 */
BalanceRecord.prototype.setType = function(type) {
  this.type = type;
};


/**
 * The value of the balance.
 *
 * @return {String} The value of the balance.
 */
BalanceRecord.prototype.getValue = function() {
  return this.value;
};
Element.add(BalanceRecord, {name: "VALUE", required: true, order: 30, attributeType: String, readMethod: "getValue", writeMethod: "setValue"});


/**
 * The value of the balance.
 *
 * @param {String} value The value of the balance.
 */
BalanceRecord.prototype.setValue = function(value) {
  this.value = value;
};


/**
 * Timestamp of the balance.
 *
 * @return {Date} Timestamp of the balance.
 */
BalanceRecord.prototype.getTimestamp = function() {
  return this.timestamp;
};
Element.add(BalanceRecord, {name: "DTASOF", order: 40, attributeType: Date, readMethod: "getTimestamp", writeMethod: "setTimestamp"});


/**
 * Timestamp of the balance.
 *
 * @param {Date} timestamp Timestamp of the balance.
 */
BalanceRecord.prototype.setTimestamp = function(timestamp) {
  this.timestamp = timestamp;
};


/**
 * Currency.
 *
 * @return {Currency} Currency.
 */
BalanceRecord.prototype.getCurrency = function() {
  return this.currency;
};
ChildAggregate.add(BalanceRecord, {order: 50, attributeType: Currency, readMethod: "getCurrency", writeMethod: "setCurrency"});


/**
 * Currency.
 *
 * @param {Currency} currency Currency.
 */
BalanceRecord.prototype.setCurrency = function(currency) {
  this.currency = currency;
};




module.exports = BalanceRecord;
