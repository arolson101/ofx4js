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
 * Security request aggregate.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @class
 */
function SecurityRequest () {

  /**
   * @name SecurityRequest#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name SecurityRequest#tickerSymbol
   * @type String
   * @access private
   */
  this.tickerSymbol = null;

  /**
   * @name SecurityRequest#fiId
   * @type String
   * @access private
   */
  this.fiId = null;
}



Aggregate.add("SECRQ", SecurityRequest);


SecurityRequest.prototype.getSecurityId = function() {
  return this.securityId;
};
Element.add(SecurityRequest, {name: "SECID", order: 10, attributeType: SecurityId, readMethod: "getSecurityId", writeMethod: "setSecurityId"});


SecurityRequest.prototype.setSecurityId = function(/*SecurityId*/ securityId) {
  this.securityId = securityId;
  this.tickerSymbol = null;
  this.fiId = null;
};


SecurityRequest.prototype.getTickerSymbol = function() {
  return this.tickerSymbol;
};
Element.add(SecurityRequest, {name: "TICKER", order: 20, attributeType: String, readMethod: "getTickerSymbol", writeMethod: "setTickerSymbol"});


SecurityRequest.prototype.setTickerSymbol = function(/*String*/ tickerSymbol) {
  this.tickerSymbol = tickerSymbol;
  this.securityId = null;
  this.fiId = null;
};


SecurityRequest.prototype.getFiId = function() {
  return this.fiId;
};
Element.add(SecurityRequest, {name: "FIID", order: 30, attributeType: String, readMethod: "getFiId", writeMethod: "setFiId"});


SecurityRequest.prototype.setFiId = function(/*String*/ fiId) {
  this.fiId = fiId;
  this.securityId = null;
  this.tickerSymbol = null;
};




module.exports = SecurityRequest;
