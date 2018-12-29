import { ok as assert } from "assert";
import { Stack } from '../collections/Stack'
import { OFXParseEvent, OFXParseEventType } from './OFXParseEvent'
import { OFXHandler } from './OFXHandler'
import { LOG } from '../log/Log'
import { OFXException } from '../OFXException';
import { SAXParser, Tag as SAXTag } from 'sax';


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
    LOG.debug("START ELEMENT: " + qName);

    if ((!this.eventStack.isEmpty()) && (this.eventStack.peek().getEventType() == OFXParseEventType.ELEMENT) && (!this.isAlreadyStarted(this.eventStack.peek()))) {
      var eventValue: string = this.eventStack.peek().getEventValue();
      LOG.debug("Element " + qName + " is starting aggregate " + eventValue);

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
    LOG.debug("END ELEMENT: " + qName);

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
          LOG.debug("Element " + value + " processed with value " + chars);
          this.ofxHandler.onElement(value, chars);
        }
      }
    }
    else if (eventToFinish.getEventType() == OFXParseEventType.ELEMENT) {
      //we're ending an aggregate (no character data on the stack).
      if (qName === eventToFinish.getEventValue()) {
        //the last element on the stack is ours; we're ending an OFX aggregate.
        var value: string = eventToFinish.getEventValue();
        LOG.debug("Ending aggregate " + value);
        this.ofxHandler.endAggregate(value);

        var i = this.startedEvents.indexOf(eventToFinish);
        assert(i !== -1);
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
