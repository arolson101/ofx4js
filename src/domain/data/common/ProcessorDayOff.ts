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

/**
 * Day of week used in "PROCDAYSOFF" lists.
 *
 * @author Scott Priddy
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
