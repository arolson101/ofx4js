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

var ChildAggregate = require("meta/ChildAggregate");

//import java.util.Date;

/**
 * Base class for info about the various types of securities.
 * @see "Section 13.8.5.1, OFX Spec"
 * <br>
 * This class exposes a read-only view of the flattened aggregates that are
 * common to all security info as a convenience to application
 * developers who may not find the ofx aggregation model intuitive.
 *
 * @author Jon Perlow
 */
function BaseSecurityInfo () {

  /**
   * @name BaseSecurityInfo#securityInfo
   * @type SecurityInfo
   * @access private
   */
  this.securityInfo = null;
}





/**
 * Gets the security info aggregate.
 *
 * @return {SecurityInfo} the security info aggregate.
 */
BaseSecurityInfo.prototype.getSecurityInfo = function() {
  return securityInfo;
};
ChildAggregate.add({required: true, order: 10, owner: BaseSecurityInfo, /*type: SecurityInfo,*/ fcn: "getSecurityInfo"});


/**
 * Sets the security info aggregate.
 *
 * @param {SecurityInfo} securityInfo the security info aggregate.
 */
BaseSecurityInfo.prototype.setSecurityInfo = function(securityInfo) {
  this.securityInfo = securityInfo;
};


/**
 * Gets the unique security id for the security. This is a required field according to the OFX
 * spec.
 *
 * @return {SecurityId} the security id
 */
BaseSecurityInfo.prototype.getSecurityId = function() {
  return getSecurityInfo().getSecurityId();
};


/**
 * Gets the full name of the security. This is a required field according to the OFX spec.
 *
 * @return {String} the full name of the security.
 */
BaseSecurityInfo.prototype.getSecurityName = function() {
  return getSecurityInfo().getSecurityName();
};


/**
 * Gets the ticker symbol for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the ticket symbol or null if there's no ticker symbol
 */
BaseSecurityInfo.prototype.getTickerSymbol = function() {
  return getSecurityInfo().getTickerSymbol();
};


/**
 * Gets the FI ID number for the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the FI ID number for the security
 */
BaseSecurityInfo.prototype.getFiId = function() {
  return getSecurityInfo().getFiId();
};


/**
 * Gets the rating of the security. This is an optional field according to the OFX spec.
 *
 * @return {String} the rating
 */
BaseSecurityInfo.prototype.getRating = function() {
  return getSecurityInfo().getRating();
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a noptional field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
BaseSecurityInfo.prototype.getUnitPrice = function() {
  return getSecurityInfo().getUnitPrice();
};


/**
 * Gets the date as-of for the unit price. This is an optional field according to the OFX spec.
 *
 * @return {Date} the date as-of for the unit price
 */
BaseSecurityInfo.prototype.getUnitPriceAsOfDate = function() {
  return getSecurityInfo().getUnitPriceAsOfDate();
};


/**
 * Gets the overriding currency code for the security. If not set, implies the default currency.
 * This is an optional field according to the OFX spec.
 *
 * @return {String} the overriding currency code or null to mean the default currency
 */
BaseSecurityInfo.prototype.getCurrencyCode = function() {
  return getSecurityInfo().getCurrencyCode();
};


/**
 * Gets any memo associated with the security. This is an optional field according to the OFX
 * spec.
 *
 * @return {String} the memo
 */
BaseSecurityInfo.prototype.getMemo = function() {
  return getSecurityInfo().getMemo();
};




module.exports = BaseSecurityInfo;
