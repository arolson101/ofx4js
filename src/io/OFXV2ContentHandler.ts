/*
 * Copyright 2008 Web Cohesion
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
///<reference path='../collections/Stack'/>
///<reference path='OFXParseEvent'/>
///<reference path='OFXHandler'/>

module ofx4js.io {

import Log = ofx4js.log.Log;
import LogFactory = ofx4js.log.LogFactory;
import Stack = ofx4js.collections.Stack;

var LOG: Log;

/**
 * @author Ryan Heaton
 */
export class OFXV2ContentHandler {

  private eventStack: Stack<OFXParseEvent>;
  private ofxHandler: OFXHandler;
  private startedEvents: Array<OFXParseEvent>;

  constructor(ofxHandler: OFXHandler) {
    this.eventStack = new Stack<OFXParseEvent>();
    this.startedEvents = new Array<OFXParseEvent>();

    if (ofxHandler == null) {
      throw new OFXException("An OFX handler must be supplied.");
    }

    this.ofxHandler = ofxHandler;
  }
  
  public install(parser: SAXParser) {
    parser.ontext = this.ontext.bind(this);
    parser.onopentag = this.onopentag.bind(this);
    parser.onclosetag = this.onclosetag.bind(this);
  }

  public onopentag(node: SAXTag): void {
    var qName: string = node.name;
    if (LOG.isDebugEnabled()) {
      LOG.debug("START ELEMENT: " + qName);
    }

    if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEventType.ELEMENT) && (!this.isAlreadyStarted(this.eventStack.peek()))) {
      var eventValue: string = this.eventStack.peek().getEventValue();
      if (LOG.isDebugEnabled()) {
        LOG.debug("Element " + qName + " is starting aggregate " + eventValue);
      }

      //the last element started was not ended; we are assuming we've started a new aggregate.
      this.ofxHandler.startAggregate(eventValue);

      this.startedEvents.push(this.eventStack.peek());
    }

    this.eventStack.push(new OFXParseEvent(OFXParseEventType.ELEMENT, qName));
  }

  /**
   * Whether the specified element aggregate has already been started.
   *
   * @param event The event containing the start.
   * @return Whether the specified element aggregate has already been started.
   */
  protected isAlreadyStarted(event: OFXParseEvent): boolean {
    return this.startedEvents.indexOf(event) != -1;
  }

  public onclosetag(qName: string): void {
    if (LOG.isDebugEnabled()) {
      LOG.debug("END ELEMENT: " + qName);
    }

    var eventToFinish: OFXParseEvent = this.eventStack.pop();
    if (eventToFinish.getEventType() == OFXParseEventType.CHARACTERS) {
      var chars: string = eventToFinish.getEventValue().trim();

      if (this.eventStack.isEmpty()) {
        throw new OFXException("Illegal character data outside main OFX root element: \"" + chars + "\".");
      }
      else {
        var elementEvent: OFXParseEvent = this.eventStack.pop();
        if (elementEvent.getEventType() != OFXParseEventType.ELEMENT) {
          throw new OFXException("Illegal OFX event before characters \"" + chars + "\" (" + elementEvent.getEventType() + ")!");
        }
        else {
          var value: string = elementEvent.getEventValue();
          if (LOG.isDebugEnabled()) {
            LOG.debug("Element " + value + " processed with value " + chars);
          }
          this.ofxHandler.onElement(value, chars);
        }
      }
    }
    else if (eventToFinish.getEventType() == OFXParseEventType.ELEMENT) {
      //we're ending an aggregate (no character data on the stack).
      if (qName === eventToFinish.getEventValue()) {
        //the last element on the stack is ours; we're ending an OFX aggregate.
        var value: string = eventToFinish.getEventValue();
        if (LOG.isDebugEnabled()) {
          LOG.debug("Ending aggregate " + value);
        }
        this.ofxHandler.endAggregate(value);

        var i = this.startedEvents.indexOf(eventToFinish);
        console.assert(i !== -1);
        if (i > -1) {
          this.startedEvents.splice(i, 1);
        }
      }
      else {
        throw new OFXException("Unexpected end tag: " + eventToFinish.getEventValue());
      }
    }
    else {
      throw new OFXException("Illegal OFX event: " + eventToFinish.getEventType());
    }
  }
  
  public ontext(value: string): void {
    if (value.trim().length > 0) {
      var event: OFXParseEvent;
      if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEventType.CHARACTERS)) {
        //append the characters...
        event = new OFXParseEvent(OFXParseEventType.CHARACTERS, this.eventStack.pop().getEventValue() + value);
      }
      else {
        event = new OFXParseEvent(OFXParseEventType.CHARACTERS, value);
      }
      this.eventStack.push(event);
    }
  }
}

LOG = LogFactory.getLog(OFXV2ContentHandler);

}
