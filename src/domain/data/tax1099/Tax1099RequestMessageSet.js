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

var MessageSetType = require("domain/data/MessageSetType");
var RequestMessageSet = require("domain/data/RequestMessageSet");
var RequestMessage = require("domain/data/RequestMessage");
var Aggregate = require("meta/Aggregate");
var ChildAggregate = require("meta/ChildAggregate");

//import java.util.List;
//import java.util.ArrayList;

/**
 * @author aparna.gawali
 * aparna.gawali@sungard.com
 * 
 */
function Tax1099RequestMessageSet () {

  /**
   * @name Tax1099RequestMessageSet#taxRequestTransaction
   * @type Tax1099RequestTransaction
   * @access private
   */
  this.taxRequestTransaction = null;
}

inherit(Tax1099RequestMessageSet, "extends", RequestMessageSet);


Aggregate.add("TAX1099MSGSRQV1", Tax1099RequestMessageSet);


Tax1099RequestMessageSet.prototype.getType = function() {
  return MessageSetType.tax1099;
};


/**
 * The statement request.
 *
 * @return {Tax1099RequestTransaction} The statement request.
 */
Tax1099RequestMessageSet.prototype.getTaxRequestTransaction = function() {
  return taxRequestTransaction;
};
ChildAggregate.add({order: 0, owner: Tax1099RequestMessageSet, /*type: Tax1099RequestTransaction,*/ fcn: "getTaxRequestTransaction"});


/**
 * The statement request.
 *
 * @param {Tax1099RequestTransaction} taxRequestTransaction The statement request.
 */
Tax1099RequestMessageSet.prototype.setTaxRequestTransaction = function(taxRequestTransaction) {
  this.taxRequestTransaction = taxRequestTransaction;
};


// Inherited.
Tax1099RequestMessageSet.prototype.getRequestMessages = function() {
  ArrayList<RequestMessage> requestMessages = new ArrayList<RequestMessage>();
  if (getTaxRequestTransaction() != null) {
    requestMessages.add(getTaxRequestTransaction());
  }
  return requestMessages;
};




module.exports = Tax1099RequestMessageSet;
