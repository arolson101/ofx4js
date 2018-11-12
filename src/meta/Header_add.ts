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
import { HeaderParams, Header } from "./Header";
import { AggregateIntrospector } from "../io/AggregateIntrospector";


export function Header_add<Type>(clazz: any, params: HeaderParams<Type>): void {
  console.assert(params.type != null);
  AggregateIntrospector.addHeader(clazz, new Header(params));
}
