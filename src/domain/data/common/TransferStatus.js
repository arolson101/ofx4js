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

var Aggregate = require("../../../meta/Aggregate");
var Element = require("../../../meta/Element");

//import java.util.Date;

/**
 * @class
 */
function TransferStatus () {

  /**
   * @name TransferStatus#event
   * @type TransferStatusEvent
   * @access private
   */
  this.event = null;

  /**
   * @name TransferStatus#date
   * @type Date
   * @access private
   */
  this.date = null;
}



Aggregate.add("XFERPRCSTS", TransferStatus);


/**
 * The event.
 *
 * @return {TransferStatusEvent} The event.
 */
TransferStatus.prototype.getEvent = function() {
  return this.event;
};
Element.add({name: "XFERPRCCODE", required: true, order: 0, owner: TransferStatus, /*type: TransferStatusEvent,*/ fcn: "getEvent"});


/**
 * The event.
 *
 * @param {TransferStatusEvent} event The event.
 */
TransferStatus.prototype.setEvent = function(event) {
  this.event = event;
};


/**
 * The date of the event.
 *
 * @return {Date} The date of the event.
 */
TransferStatus.prototype.getDate = function() {
  return this.date;
};
Element.add({name: "DTXFERPRC", required: true, order: 10, owner: TransferStatus, /*type: Date,*/ fcn: "getDate"});


/**
 * The date of the event.
 *
 * @param {Date} date The date of the event.
 */
TransferStatus.prototype.setDate = function(date) {
  this.date = date;
};




module.exports = TransferStatus;
