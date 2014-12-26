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

var inherit = require("../../../util/inherit");

var TransactionWrappedResponseMessage = require("../TransactionWrappedResponseMessage");
var Aggregate = require("../../../meta/Aggregate");
var ChildAggregate = require("../../../meta/ChildAggregate");
var Tax1099Response = require("./Tax1099Response");

/**
 * @class
 * @augments TransactionWrappedResponseMessage
 */
function Tax1099ResponseTransaction () {

  /**
   * @name Tax1099ResponseTransaction#tax1099Response
   * @type Tax1099Response
   * @access private
   */
  this.tax1099Response = null;
}

inherit(Tax1099ResponseTransaction, "extends", new TransactionWrappedResponseMessage(Tax1099Response));


Aggregate.add("TAX1099TRNRS", Tax1099ResponseTransaction);


/**
 * The tax1099Response.
 *
 * @return {Tax1099Response} The tax1099Response.
 */
Tax1099ResponseTransaction.prototype.getTax1099Response = function() {
  return this.tax1099Response;
};
ChildAggregate.add({required:false, order: 2, owner: Tax1099ResponseTransaction, /*type: Tax1099Response,*/ readMethod: "getTax1099Response", writeMethod: "setTax1099Response"});


/**
 * The tax1099Response.
 *
 * @param {Tax1099Response} tax1099Response The message.
 */
Tax1099ResponseTransaction.prototype.setTax1099Response = function(tax1099Response) {
  this.tax1099Response = tax1099Response;
};


// Inherited.
Tax1099ResponseTransaction.prototype.getWrappedMessage = function() {
  return this.getTax1099Response();
};




module.exports = Tax1099ResponseTransaction;
