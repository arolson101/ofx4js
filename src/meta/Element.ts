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


export interface ElementParams<T> extends PropertyDescriptorParams<T> {
  order: number;
  name: string;
  required?: boolean;
  collectionEntryType?: any;
}


/**
 * An OFX element, applied to a javabean property.
 *
 * @author Ryan Heaton
 */
export class Element extends PropertyDescriptor {
  private _name: string;
  private _required: boolean;
  private _order: number;
  private _collectionEntryType: any;

  constructor(params: ElementParams<any>) {
    super(params);
    this._name = params.name;
    this._required = _default(params.required, false);
    this._order = params.order;
    this._collectionEntryType = _default(params.collectionEntryType, null);
  }

  /**
   * The name of the element.
   *
   * @return The name of the element.
   */
  public name(): string {
    return this._name;
  }

  /**
   * Whether this element is required.
   *
   * @return Whether this element is required.
   */
  public required(): boolean {
    return this._required;
  }

  /**
   * The order this element comes in its parent aggregate.
   *
   * @return The order this element comes in its parent aggregate.
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
