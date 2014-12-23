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

'use strict';


/**
 * An OFX element, applied to a javabean property.
 *
 * @typedef {Object} ElementParams
 * @property {string} name - The name of the element.
 * @property {bool} [required=false] - Whether this element is required.
 * @property {int} order - The order this element comes in its parent aggregate.
 */
function Element() {
  
}
public @interface Element {

  /**
   * The name of the element.
   *
   * @return The name of the element.
   */
  String name();

  /**
   * Whether this element is required.
   *
   * @return Whether this element is required.
   */
  boolean required() default false;

  /**
   * The order this element comes in its parent aggregate.
   *
   * @return The order this element comes in its parent aggregate.
   */
  int order();
}
