
export enum OFXParseEventType {
  CHARACTERS,
  ELEMENT
}

/**
 * An event during OFX parsing.
 */
export class OFXParseEvent {
  private eventType: OFXParseEventType;
  private eventValue: string;

  constructor(eventType: OFXParseEventType, eventValue: string) {
    this.eventType = eventType;
    this.eventValue = eventValue;
  }

  public getEventType(): OFXParseEventType {
    return this.eventType;
  }

  public getEventValue(): string {
    return this.eventValue;
  }
}
