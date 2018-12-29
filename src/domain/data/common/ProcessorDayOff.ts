
/**
 * Day of week used in "PROCDAYSOFF" lists.
 *
 * @see "OFX Spec, Section 13.6.2"
 */
export enum ProcessorDayOff {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY
}

export function ProcessorDayOff_fromOfx(ofxVal: string): ProcessorDayOff {
  if ("MONDAY" === ofxVal) {
    return ProcessorDayOff.MONDAY;
  } else if ("TUESDAY" === ofxVal) {
    return ProcessorDayOff.TUESDAY;
  } else if ("WEDNESDAY" === ofxVal) {
    return ProcessorDayOff.WEDNESDAY;
  } else if ("THURSDAY" === ofxVal) {
    return ProcessorDayOff.THURSDAY;
  } else if ("FRIDAY" === ofxVal) {
    return ProcessorDayOff.FRIDAY;
  } else if ("SATURDAY" === ofxVal) {
    return ProcessorDayOff.SATURDAY;
  } else if ("SUNDAY" === ofxVal) {
    return ProcessorDayOff.SUNDAY;
  } else {
    return null;
  }
}
