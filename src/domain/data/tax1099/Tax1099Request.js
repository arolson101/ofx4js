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

var T1099Request = require("../common/T1099Request");
var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

/**
 * @class
 * @augments T1099Request
 */
function Tax1099Request () {

  /**
   * @name Tax1099Request#taxYear
   * @type String
   * @access private
   */
  this.taxYear = null;
}

inherit(Tax1099Request, "extends", T1099Request);


Aggregate.add("TAX1099RQ", Tax1099Request);


Tax1099Request.prototype.getTaxYear = function() {
  return this.taxYear;
};
Element.add({name: "TAXYEAR", required: true, order: 0, owner: Tax1099Request, /*type: String,*/ fcn: "getTaxYear"});


Tax1099Request.prototype.setTaxYear = function(/*String*/ taxYear) {
  this.taxYear = taxYear;
};




module.exports = Tax1099Request;
