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
var ChildAggregate = require("../../../meta/ChildAggregate");
var SecurityRequest = require("./SecurityRequest");

/**
 * Request aggregate for the security list.
 * @see "Section 13.8.2.2, OFX Spec"
 *
 * @class
 */
function SecurityListRequest () {
  RequestMessage.call(this);

  /**
   * @name SecurityListRequest#securityRequests
   * @type SecurityRequest[]
   * @access private
   */
  this.securityRequests = null;
}

inherit(SecurityListRequest, "extends", RequestMessage);


Aggregate.add("SECLISTRQ", SecurityListRequest);


SecurityListRequest.prototype.getSecurityRequests = function() {
  return this.securityRequests;
};
ChildAggregate.add(SecurityListRequest, {required: true, order: 10, attributeType: Array, collectionEntryType: SecurityRequest, readMethod: "getSecurityRequests", writeMethod: "setSecurityRequests"});


SecurityListRequest.prototype.setSecurityRequests = function(/*SecurityRequest[]*/ securityRequests) {
  this.securityRequests = securityRequests;
};




module.exports = SecurityListRequest;
