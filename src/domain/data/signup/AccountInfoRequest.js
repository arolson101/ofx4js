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

var RequestMessage = require("domain/data/RequestMessage");
var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

//import java.util.Date;

/**
 * @author Ryan Heaton
 */
function AccountInfoRequest () {

  /**
   * @name AccountInfoRequest#lastUpdated
   * @type Date
   * @access private
   */
  this.lastUpdated = new Date(0);
}

inherit(AccountInfoRequest, "extends", RequestMessage);


Aggregate.add("ACCTINFORQ", AccountInfoRequest);


/**
 * When the account info was last updated.
 *
 * @return {Date} When the account info was last updated.
 */
AccountInfoRequest.prototype.getLastUpdated = function() {
  return lastUpdated;
};
Element.add({name: "DTACCTUP", required: true, order: 0, owner: AccountInfoRequest, /*type: Date,*/ fcn: "getLastUpdated"});


/**
 * When the account info was last updated.
 *
 * @param {Date} lastUpdated When the account info was last updated.
 */
AccountInfoRequest.prototype.setLastUpdated = function(lastUpdated) {
  this.lastUpdated = lastUpdated;
};




module.exports = AccountInfoRequest;
