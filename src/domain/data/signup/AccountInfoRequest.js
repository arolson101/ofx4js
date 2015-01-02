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

var RequestMessage = require("../RequestMessage");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments RequestMessage
 */
function AccountInfoRequest () {
  RequestMessage.call(this);

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
  return this.lastUpdated;
};
Element.add(AccountInfoRequest, {name: "DTACCTUP", required: true, order: 0, attributeType: Date, readMethod: "getLastUpdated", writeMethod: "setLastUpdated"});


/**
 * When the account info was last updated.
 *
 * @param {Date} lastUpdated When the account info was last updated.
 */
AccountInfoRequest.prototype.setLastUpdated = function(lastUpdated) {
  this.lastUpdated = lastUpdated;
};




module.exports = AccountInfoRequest;
