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
import { PropertyDescriptorParams, PropertyDescriptor, _default } from "./PropertyDescriptor";


export interface ChildAggregateParams<T> extends PropertyDescriptorParams<T> {
  order: number;
  name?: string;
  required?: boolean;
  collectionEntryType?: any;
}


/**
 * Marks a method as providing a child aggregate (or set of them to a top-level aggregate).
 *
 * @author Ryan Heaton
 */
export class ChildAggregate extends PropertyDescriptor {
  private _name: string;
  private _required: boolean;
  private _order: number;
  private _collectionEntryType: any;

  constructor(params: ChildAggregateParams<any>) {
    super(params);
    this._order = params.order;
    this._name = _default(params.name, "##not_specified##");
    this._required = _default(params.required, false);
    this._collectionEntryType = _default(params.collectionEntryType, null);
  }

  /**
   * Used to specify the name of the aggregate in its context as a child aggregate.
   *
   * @return Used to specify the name of the aggregate in its context as a child aggregate.
   */
  public name(): string {
    return this._name;
  }

  /**
   * Whether this aggregate is required.
   *
   * @return Whether this aggregate is required.
   */
  public required(): boolean {
    return this._required;
  }

  /**
   * The order this child aggregate comes in its parent aggregate.
   *
   * @return The order this child aggregate comes in its parent aggregate.
   */
  public order(): number {
    return this._order;
  }

  /**
   * If the type is a collection, return the type of the elements of the collection (otherwise null)
   */
  public collectionEntryType(): any {
    return this._collectionEntryType;
  }
}
