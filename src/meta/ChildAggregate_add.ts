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
///<reference path='../io/AggregateIntrospector'/>
///<reference path='PropertyDescriptor'/>

module ofx4js.meta {

import AggregateIntrospector = ofx4js.io.AggregateIntrospector;

export function ChildAggregate_add<Type>(clazz: any, params: ChildAggregateParams<Type>): void {
  console.assert(params.type != null);
  AggregateIntrospector.addChildAggregate(clazz, new ChildAggregate(params));
}

}
