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
import { ok as assert } from "assert";
import { ElementParams, Element } from "./Element";
import { AggregateIntrospector } from "../io/AggregateIntrospector";


export function Element_add<Type>(clazz: any, params: ElementParams<Type>): void {
  assert(params.type != null);
  AggregateIntrospector.addElement(clazz, new Element(params));
}
