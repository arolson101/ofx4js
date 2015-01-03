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
var moment = require("moment");

/**
 * Utility class for conversion to/from OFX strings.
 *
 * @class
 */
function DefaultStringConversion () {

//  /**
//   * @name DefaultStringConversion#GMT_TIME_ZONE
//   * @type TimeZone
//   */
//  this.GMT_TIME_ZONE = TimeZone.getTimeZone("GMT");
}

inherit(DefaultStringConversion, "implements", StringConversion);

//var DATE_FORMAT = "YYYYMMDDHHmmss.SSS[Z]";
//var DATE_FORMAT_LENGTH = "yyyyMMddHHmmss.SSS".length;
//var TIME_FORMAT_LENGTH = "HHmmss.SSS".length;



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
//  else if (Time.class.isAssignableFrom(clazz)) {
//    return parseTime(value);
//  }
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
 * Format the date according to the OFX spec.
 *
 * @param {Date} date The date.
 * @return {String} The date format.
 */
DefaultStringConversion.prototype.formatDate = function(date) {
//  GregorianCalendar calendar = new GregorianCalendar(GMT_TIME_ZONE);
//  calendar.setTime(date);
//  return String.format("%1$tY%1$tm%1$td%1$tH%1$tM%1$tS.%1$tL", calendar);
  
  return pad(date.getFullYear(), 4) +
    pad(date.getMonth() + 1, 2) +
    pad(date.getDay(), 2) +
    pad(date.getHours(), 2) +
    pad(date.getMinutes(), 2) +
    pad(date.getSeconds(), 2) +
    "." +
    date.getMilliseconds() +
    "[" +
    (date.getTimezoneOffset() / 60) +
    "]";
};


/**
 * Parses a time according to OFX.
 *
 * @param {String} value The value of the date.
 * @return {Time} The date value.
 */
DefaultStringConversion.prototype.parseTime = function(value) {
//  var parseableTime = new char[TIME_FORMAT_LENGTH];
//  Arrays.fill(parseableTime, '0');
//  parseableTime[parseableTime.length - 4] = '.';
//  value.getChars(0, Math.min(parseableTime.length, value.length), parseableTime, 0);
//
//  int hour = Integer.parseInt(new String(parseableTime, 0, 2));
//  int minute = Integer.parseInt(new String(parseableTime, 2, 2));
//  int second = Integer.parseInt(new String(parseableTime, 4, 2));
//  int milli = Integer.parseInt(new String(parseableTime, 7, 3));
//
//  //set up a new calendar at zero, then set all the fields.
//  GregorianCalendar calendar = new GregorianCalendar(0, 0, 0, hour, minute, second);
//  if (value.length > parseableTime.length) {
//    String tzoffset = value.substring(parseableTime.length);
//    calendar.setTimeZone(parseTimeZone(tzoffset));
//  }
//  else {
//    calendar.setTimeZone(GMT_TIME_ZONE);
//  }
//  calendar.add(GregorianCalendar.MILLISECOND, milli);
//
//  return new Time(calendar.getTimeInMillis());
  return Date.parse(value);
};


/**
 * Format the time according to the OFX spec.
 *
 * @param {Time} time The time to format.
 * @return {String} The formatted time.
 */
DefaultStringConversion.prototype.formatTime = function(time) {
//  GregorianCalendar calendar = new GregorianCalendar(GMT_TIME_ZONE);
//  calendar.setTime(time);
//  return String.format("%1$tH%1$tM%1$tS.%1$tL", calendar);
  return moment(time).format("YYYYMMDDHHmmss.SSS[Z]");
  //return time.toTimeString();
};


///**
// * Parse the timezone offset of the form [HOURS_OFF_GMT:TZ_ID]
// *
// * @param {String} tzoffset The offset pattern.
// * @return {TimeZone} The timezone.
// */
//DefaultStringConversion.prototype.parseTimeZone = function(tzoffset) {
//  StringTokenizer tokenizer = new StringTokenizer(tzoffset, "[]:");
//  TimeZone tz = GMT_TIME_ZONE;
//  if (tokenizer.hasMoreTokens()) {
//    String hoursOff = tokenizer.nextToken();
//    tz = TimeZone.getTimeZone("GMT" + hoursOff);
//  }
//
//  return tz;
//};




module.exports = DefaultStringConversion;
