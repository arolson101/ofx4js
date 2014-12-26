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

var inherit = require("../../../../util/inherit");

var VersionSpecificMessageSetInfo = require("../../profile/VersionSpecificMessageSetInfo");
var MessageSetType = require("../../MessageSetType");
var Aggregate = require("../../../../meta/Aggregate");
var Element = require("../../../../meta/Element");

/**
 * @see "Section 13.7.2.1, OFX Spec"
 *
 * @class
 * @augments VersionSpecificMessageSetInfo
 */
function SecurityListV1MessageSetInfo () {

  /**
   * @name SecurityListV1MessageSetInfo#supportsSecurityListDownload
   * @type Boolean
   * @access private
   */
  this.supportsSecurityListDownload = null;
}

inherit(SecurityListV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("SECLISTMSGSETV1", SecurityListV1MessageSetInfo);


SecurityListV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.investment_security;
};


SecurityListV1MessageSetInfo.prototype.getSupportsSecurityListDownload = function() {
  return this.supportsSecurityListDownload;
};
Element.add({name: "SECLISTRQDNLD", required:true, order: 10, owner: SecurityListV1MessageSetInfo, /*type: Boolean,*/ readMethod: "getSupportsSecurityListDownload", writeMethod: "setSupportsSecurityListDownload"});


SecurityListV1MessageSetInfo.prototype.setSupportsSecurityListDownload = function(/*Boolean*/ supportsSecurityListDownload) {
  this.supportsSecurityListDownload = supportsSecurityListDownload;
};




module.exports = SecurityListV1MessageSetInfo;
