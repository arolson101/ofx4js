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

var VersionSpecificMessageSetInfo = require("domain/data/profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("domain/data/MessageSetType");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

/**
 * @see "Section 13.7.1.1, OFX Spec"
 *
 * @author Jon Perlow
 * @author Ryan Heaton
 */
function InvestmentV1MessageSetInfo () {

  /**
   * @name InvestmentV1MessageSetInfo#supportsStatementsDownload
   * @type Boolean
   * @access private
   */
  this.supportsStatementsDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsOpenOrdersDownload
   * @type Boolean
   * @access private
   */
  this.supportsOpenOrdersDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsPositionsDownload
   * @type Boolean
   * @access private
   */
  this.supportsPositionsDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsBalanceDownload
   * @type Boolean
   * @access private
   */
  this.supportsBalanceDownload = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsEmail
   * @type Boolean
   * @access private
   */
  this.supportsEmail = null;

  /**
   * @name InvestmentV1MessageSetInfo#supports401kInformation
   * @type Boolean
   * @access private
   */
  this.supports401kInformation = null;

  /**
   * @name InvestmentV1MessageSetInfo#supportsClosingStatements
   * @type Boolean
   * @access private
   */
  this.supportsClosingStatements = null;
}

inherit(InvestmentV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("INVSTMTMSGSETV1", InvestmentV1MessageSetInfo);


InvestmentV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.investment;
};


InvestmentV1MessageSetInfo.prototype.getSupportsStatementsDownload = function() {
  return supportsStatementsDownload;
};
Element.add({name: "TRANDNLD", required:true, order: 10, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsStatementsDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsStatementsDownload = function(/*Boolean*/ supportsStatementsDownload) {
  this.supportsStatementsDownload = supportsStatementsDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsOpenOrdersDownload = function() {
  return supportsOpenOrdersDownload;
};
Element.add({name: "OODNLD", required:true, order: 20, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsOpenOrdersDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsOpenOrdersDownload = function(/*Boolean*/ supportsOpenOrdersDownload) {
  this.supportsOpenOrdersDownload = supportsOpenOrdersDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsPositionsDownload = function() {
  return supportsPositionsDownload;
};
Element.add({name: "POSDNLD", required:true, order: 30, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsPositionsDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsPositionsDownload = function(/*Boolean*/ supportsPositionsDownload) {
  this.supportsPositionsDownload = supportsPositionsDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsBalanceDownload = function() {
  return supportsBalanceDownload;
};
Element.add({name: "BALDNLD", required:true, order: 40, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsBalanceDownload"});


InvestmentV1MessageSetInfo.prototype.setSupportsBalanceDownload = function(/*Boolean*/ supportsBalanceDownload) {
  this.supportsBalanceDownload = supportsBalanceDownload;
};


InvestmentV1MessageSetInfo.prototype.getSupportsEmail = function() {
  return supportsEmail;
};
Element.add({name: "CANEMAIL", required:true, order: 50, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsEmail"});


InvestmentV1MessageSetInfo.prototype.setSupportsEmail = function(/*Boolean*/ supportsEmail) {
  this.supportsEmail = supportsEmail;
};


InvestmentV1MessageSetInfo.prototype.getSupports401kInformation = function() {
  return supports401kInformation;
};
Element.add({name: "INV401KDNLD", order: 60, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupports401kInformation"});


InvestmentV1MessageSetInfo.prototype.setSupports401kInformation = function(/*Boolean*/ supports401kInformation) {
  this.supports401kInformation = supports401kInformation;
};


InvestmentV1MessageSetInfo.prototype.getSupportsClosingStatements = function() {
  return supportsClosingStatements;
};
Element.add({name: "CLOSINGAVAIL", order: 70, owner: InvestmentV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsClosingStatements"});


InvestmentV1MessageSetInfo.prototype.setSupportsClosingStatements = function(/*Boolean*/ supportsClosingStatements) {
  this.supportsClosingStatements = supportsClosingStatements;
};




module.exports = InvestmentV1MessageSetInfo;
