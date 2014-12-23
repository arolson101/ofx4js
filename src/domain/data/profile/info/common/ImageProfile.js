/*
 * Copyright 2012 TheStash
 *
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

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

/**
 * Image Profile
 * @author Scott Priddy
 * @see "Section 3.1.6.2 OFX Spec"
 */
function ImageProfile () {

  /**
   * @name ImageProfile#closingImageAvailable
   * @type Boolean
   * @access private
   */
  this.closingImageAvailable = null;

  /**
   * @name ImageProfile#transactionImageAvailable
   * @type Boolean
   * @access private
   */
  this.transactionImageAvailable = null;
}



Aggregate.add("IMAGEPROF", ImageProfile);


ImageProfile.prototype.getClosingImageAvailable = function() {
  return closingImageAvailable;
};
Element.add({name: "CLOSINGIMGAVAIL", required: true, order: 10, owner: ImageProfile, /*type: Boolean,*/ fcn: "getClosingImageAvailable"});


ImageProfile.prototype.setClosingImageAvailable = function(/*Boolean*/ closingImageAvailable) {
  this.closingImageAvailable = closingImageAvailable;
};


ImageProfile.prototype.getTransactionImageAvailable = function() {
  return transactionImageAvailable;
};
Element.add({name: "TRANIMGAVAIL", required: true, order: 20, owner: ImageProfile, /*type: Boolean,*/ fcn: "getTransactionImageAvailable"});


ImageProfile.prototype.setTransactionImageAvailable = function(/*Boolean*/ transactionImageAvailable) {
  this.transactionImageAvailable = transactionImageAvailable;
};




module.exports = ImageProfile;
