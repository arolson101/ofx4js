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

var Aggregate = require("meta/Aggregate");
var Element = require("meta/Element");

/**
 * Represents an options position.
 * @see "Section 13.9.2.6.1, OFX Spec"
 *
 * @author Jon Perlow
 */
function OptionsPosition () {

  /**
   * @name OptionsPosition#secured
   * @type String
   * @access private
   */
  this.secured = null;
}

inherit(OptionsPosition, "extends", BasePosition);


Aggregate.add("POSOPT", OptionsPosition);


/**
 * Gets how the options position is secured (for short positions).
 *
 * @return {String} how the options position is secured
 */
OptionsPosition.prototype.getSecured = function() {
  return secured;
};
Element.add({name: "SECURED", order: 20, owner: OptionsPosition, /*type: String,*/ fcn: "getSecured"});


/**
 * Sets how the options position is secured (for short positions).
 *
 * @param {String} secured how the options position is secured
 */
OptionsPosition.prototype.setSecured = function(secured) {
  this.secured = secured;
};


/**
 * Gets how the options position is secured as a well-known type.
 *
 * @return {ShortOptionSecurity} how the option position is secured or null if it's not a well-known type
 */
OptionsPosition.prototype.getSecuredEnum = function() {
  return ShortOptionSecurity.fromOfx(getSecured());
};




module.exports = OptionsPosition;
