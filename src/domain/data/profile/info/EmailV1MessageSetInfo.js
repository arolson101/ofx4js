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
 * Email Message Set Profile Information
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 9.4.2 OFX Spec"
 */
function EmailV1MessageSetInfo () {

  /**
   * @name EmailV1MessageSetInfo#supportsMail
   * @type Boolean
   * @access private
   */
  this.supportsMail = null;

  /**
   * @name EmailV1MessageSetInfo#supportsMimeType
   * @type Boolean
   * @access private
   */
  this.supportsMimeType = null;
}

inherit(EmailV1MessageSetInfo, "extends", VersionSpecificMessageSetInfo);


Aggregate.add("EMAILMSGSETV1", EmailV1MessageSetInfo);


EmailV1MessageSetInfo.prototype.getMessageSetType = function() {
  return MessageSetType.email;
};


/**
 * Y if server supports <MAILRQ> request.
 * N if server supports only the <MAILSYNCRQ> request.
 * @return {Boolean} Boolean
 */
EmailV1MessageSetInfo.prototype.getSupportsMail = function() {
  return supportsMail;
};
Element.add({name: "MAILSUP", required: true, order: 10, owner: EmailV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsMail"});


EmailV1MessageSetInfo.prototype.setSupportsMail = function(/*Boolean*/ supportsMail) {
  this.supportsMail = supportsMail;
};


/**
 * Y if server supports get MIME message
 * @return {Boolean} Boolean
 */
EmailV1MessageSetInfo.prototype.getSupportsMimeType = function() {
  return supportsMimeType;
};
Element.add({name: "GETMIMESUP", required: true, order: 20, owner: EmailV1MessageSetInfo, /*type: Boolean,*/ fcn: "getSupportsMimeType"});


EmailV1MessageSetInfo.prototype.setSupportsMimeType = function(/*Boolean*/ supportsMimeType) {
  this.supportsMimeType = supportsMimeType;
};




module.exports = EmailV1MessageSetInfo;
