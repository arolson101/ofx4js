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

var Stack = require("../util/stack");
var OFXParseEvent = require("./OFXParseEvent");
var LOG = require("../util/log");


/**
 * @class
 * @param {sax.parser} parser
 * @param {OFXHandler} ofxHandler
 */
function OFXV2ContentHandler(ofxHandler) {
  if (!ofxHandler) {
    throw new Error("An OFX handler must be supplied.");
  }
  
  /**
   * @name OFXV2ContentHandler#eventStack
   * @type Stack<OFXParseEvent>
   * @access private
   */
  this.eventStack = new Stack();

  /**
   * @name OFXV2ContentHandler#ofxHandler
   * @type OFXHandler
   * @access private
   */
  this.ofxHandler = ofxHandler;

  /**
   * @name OFXV2ContentHandler#startedEvents
   * @type OFXParseEvent[]
   * @access private
   */
  this.startedEvents = [];
}



OFXV2ContentHandler.prototype.install = function(parser) {
  var self = this;
  parser.ontext = function(value) { self.ontext(value); };
  parser.onopentag = function(params) { self.onopentag(params); };
  parser.onclosetag = function(name) { self.onclosetag(name); };
};



// @Override
OFXV2ContentHandler.prototype.onopentag = function(params) {
  var qName = params.name;

  if (LOG.parse) {
    console.log("START ELEMENT: " + qName);
  }

  if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEvent.Type.ELEMENT) && (!this.isAlreadyStarted(this.eventStack.peek()))) {
    var eventValue = this.eventStack.peek().getEventValue();
    if (LOG.parse) {
      console.log("Element " + qName + " is starting aggregate " + eventValue);
    }

    //the last element started was not ended; we are assuming we've started a new aggregate.
    this.ofxHandler.startAggregate(eventValue);
    this.startedEvents.push(this.eventStack.peek());
  }

  this.eventStack.push(new OFXParseEvent(OFXParseEvent.Type.ELEMENT, qName));
};


/**
 * Whether the specified element aggregate has already been started.
 *
 * @param {OFXParseEvent} event The event containing the start.
 * @return {boolean} Whether the specified element aggregate has already been started.
 */
OFXV2ContentHandler.prototype.isAlreadyStarted = function(event) {
  return this.startedEvents.indexOf(event) != -1;
};


// @Override
OFXV2ContentHandler.prototype.onclosetag = function(qName) {
  if (LOG.parse) {
    console.log("END ELEMENT: " + qName);
  }

  var eventToFinish = this.eventStack.pop();
  if (eventToFinish.getEventType() == OFXParseEvent.Type.CHARACTERS) {
    var chars = eventToFinish.getEventValue().trim();

    if (this.eventStack.isEmpty()) {
      throw new Error("Illegal character data outside main OFX root element: \"" + chars + "\".");
    }
    else {
      var elementEvent = this.eventStack.pop();
      if (elementEvent.getEventType() != OFXParseEvent.Type.ELEMENT) {
        throw new Error("Illegal OFX event before characters \"" + chars + "\" (" + elementEvent.getEventType() + ")!");
      }
      else {
        var value = elementEvent.getEventValue();
        if (LOG.parse) {
          console.log("Element " + value + " processed with value " + chars);
        }
        this.ofxHandler.onElement(value, chars);
      }
    }
  }
  else if (eventToFinish.getEventType() == OFXParseEvent.Type.ELEMENT) {
    //we're ending an aggregate (no character data on the stack).
    if (qName === eventToFinish.getEventValue()) {
      //the last element on the stack is ours; we're ending an OFX aggregate.
      /*jshint -W004*/
      var value = eventToFinish.getEventValue();
      if (LOG.parse) {
        console.log("Ending aggregate " + value);
      }
      this.ofxHandler.endAggregate(value);
      var i = this.startedEvents.indexOf(eventToFinish);
      console.assert(i !== -1);
      if (i > -1) {
        this.startedEvents.splice(i, 1);
      }
    }
    else {
      throw new Error("Unexpected end tag: " + eventToFinish.getEventValue());
    }
  }
  else {
    throw new Error("Illegal OFX event: " + eventToFinish.getEventType());
  }
};


// @Override
OFXV2ContentHandler.prototype.ontext = function(value) {
  if (value.trim().length > 0) {
    var event;
    if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEvent.Type.CHARACTERS)) {
      //append the characters...
      event = new OFXParseEvent(OFXParseEvent.Type.CHARACTERS, this.eventStack.pop().getEventValue() + value);
    }
    else {
      event = new OFXParseEvent(OFXParseEvent.Type.CHARACTERS, value);
    }
    this.eventStack.push(event);
  }
};




module.exports = OFXV2ContentHandler;
