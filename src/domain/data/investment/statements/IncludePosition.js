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

//import java.util.Date;


/**
 * Aggreate to indicate whether position information is requested as part of the statement
 * @see "Section 13.9.1.2, OFX Spec"
 *
 * @author Jon Perlow
 */
function IncludePosition () {

  /**
   * @name IncludePosition#sentDownDate
   * @type Date
   * @access private
   */
  this.sentDownDate = null;

  /**
   * @name IncludePosition#includePositions
   * @type Boolean
   * @access private
   */
  this.includePositions = Boolean.TRUE;
}



Aggregate.add("INCPOS", IncludePosition);


/**
 * Gets the date that the position should be sent down for. This is an optional field according
 * to the OFX spec.
 *
 * @return {Date} the date for the position
 */
IncludePosition.prototype.getDateSentDown = function() {
  return sentDownDate;
};
Element.add({name: "DTASOF", order: 0, owner: IncludePosition, /*type: Date,*/ fcn: "getDateSentDown"});


/**
 * Sets the date that the position should be sent down for. This is an optional field according
 * to the OFX spec.
 *
 * @param {Date} sentDownDate the date for the position
 */
IncludePosition.prototype.setDateSentDown = function(sentDownDate) {
  this.sentDownDate = sentDownDate;
};


/**
 * Gets whether to include positions in the statement download.
 *
 * @return {Boolean} whether to include positions in the statement download
 */
IncludePosition.prototype.getIncludePositions = function() {
  return includePositions;
};
Element.add({name: "INCLUDE", order: 10, owner: IncludePosition, /*type: Boolean,*/ fcn: "getIncludePositions"});


/**
 * Sets whether to include positions in the statement download.
 *
 * @param {Boolean} includePositions whether to include positions in the statement download
 */
IncludePosition.prototype.setIncludePositions = function(includePositions) {
  this.includePositions = includePositions;
};




module.exports = IncludePosition;
