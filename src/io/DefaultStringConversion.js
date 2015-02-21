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

var inherit = require("../util/inherit");

var Status = require("../domain/data/common/Status");
var StatusCode = require("../domain/data/common/StatusCode");
var UnknownStatusCode = require("../domain/data/common/UnknownStatusCode");
var StringConversion = require("./StringConversion");

/**
 * Utility class for conversion to/from OFX strings.
 *
 * @class
 */
function DefaultStringConversion () {
}


inherit(DefaultStringConversion, "implements", StringConversion);


DefaultStringConversion.prototype.toString = function(/*Object*/ value) {
  if (!value) {
    return null;
  }
  else if (value instanceof Boolean) {
    return value ? "Y" : "N";
  }
  else if (value instanceof Date) {
    return this.formatDate(value);
  }
  else if (typeof value === "number") {
    return value + "";
  }
  else {
    return value;
  }
};


DefaultStringConversion.prototype.fromString = function(/*Class<E>*/ clazz, /*String*/ value) {
  if (!value) {
    return null;
  }
  else if (typeof clazz === "object") {
    // enum
    console.assert(value in clazz);
    if(value in clazz) {
      return clazz[value];
    }
  }
  else if (inherit.isAssignableFrom(StatusCode, clazz)) {
    var code = value;
    var statusCode = Status.KnownCode.fromCode(code);
    if (!statusCode) {
      statusCode = new UnknownStatusCode(code, "Unknown status code.", Status.Severity.ERROR);
    }
    
    return statusCode;
  }
  else if (inherit.isAssignableFrom(Boolean, clazz)) {
    return "Y" === value.toUpperCase();
  }
  else if (inherit.isAssignableFrom(Date, clazz)) {
    return this.parseDate(value);
  }
  return value;
};


/**
 * Parses a date according to OFX.
 *
 * @param {String} value The value of the date.
 * @return {Date} The date value.
 */
DefaultStringConversion.prototype.parseDate = function(value) {
  var year = parseInt(value.substr(0, 4));
  var month = parseInt(value.substr(4, 2)) - 1; // javascript month numbers are zero-based
  var day = parseInt(value.substr(6, 2));
  var hour = parseInt(value.substr(8, 2));
  var minute = parseInt(value.substr(10, 2));
  var second = parseInt(value.substr(12, 2));
  var milli = parseInt(value.substr(15, 3));

  // add timezone offset
  var bracket = value.indexOf("[");
  if(bracket != -1) {
    var close = value.indexOf(":");
    if(close === -1) {
      close = value.indexOf("]");
    }
    var gmtOffset = value.substring(bracket+1, close);
    hour -= 1.0 * gmtOffset;
  }
  
  // create date as UTC
  return new Date(Date.UTC(year, month, day, hour, minute, second, milli));
};


/**
 * Pad a number with leading zeroes until it is of <tt>size</tt> length
 *
 * @param {int} num number
 * @param {int} size number of digits in final number
 * @return {string} padded number
 */
function pad(num, size) {
  var s = num+"";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

/**
 * Pad a number with trailing zeroes until it is of <tt>size</tt> length.
 * Intended for numbers after a decimal point to get a fixed number of decimals
 *
 * @param {int} num number
 * @param {int} size number of digits in final number
 * @return {string} padded number
 */
function dpad(num, size) {
  var s = num+"";
  while (s.length < size) {
    s = s + "0";
  }
  return s;
}

/**
 * Format the date according to the OFX spec.
 *
 * @param {Date} date The date.
 * @return {String} The date format.
 */
DefaultStringConversion.prototype.formatDate = function(date) {
  var gmt = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  return pad(gmt.getFullYear(), 4) +
    pad(gmt.getMonth() + 1, 2) +
    pad(gmt.getDay(), 2) +
    pad(gmt.getHours(), 2) +
    pad(gmt.getMinutes(), 2) +
    pad(gmt.getSeconds(), 2) +
    "." +
    dpad(gmt.getMilliseconds(), 3);
};




module.exports = DefaultStringConversion;
