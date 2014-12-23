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

var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * @author Ryan Heaton
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


var Type = BalanceRecord.Type = {

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
  return name;
};
Element.add({name: "NAME", required: true, order: 0, owner: BalanceRecord, /*type: String,*/ fcn: "getName"});


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
  return description;
};
Element.add({name: "DESC", required: true, order: 10, owner: BalanceRecord, /*type: String,*/ fcn: "getDescription"});


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
  return type;
};
Element.add({name: "BALTYPE", required: true, order: 20, owner: BalanceRecord, /*type: Type,*/ fcn: "getType"});


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
  return value;
};
Element.add({name: "VALUE", required: true, order: 30, owner: BalanceRecord, /*type: String,*/ fcn: "getValue"});


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
  return timestamp;
};
Element.add({name: "DTASOF", order: 40, owner: BalanceRecord, /*type: Date,*/ fcn: "getTimestamp"});


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
  return currency;
};
ChildAggregate.add({order: 50, owner: BalanceRecord, /*type: Currency,*/ fcn: "getCurrency"});


/**
 * Currency.
 *
 * @param {Currency} currency Currency.
 */
BalanceRecord.prototype.setCurrency = function(currency) {
  this.currency = currency;
};




module.exports = BalanceRecord;
