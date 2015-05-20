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
import {AggregateInfo} from "AggregateInfo";
import {AggregateIntrospector} from "AggregateIntrospector";
import {SortedSet} from "../collections/SortedSet";
import {ReadMethod} from "../meta/PropertyDescriptor";
import {WriteMethod} from "../meta/PropertyDescriptor";
import {ChildAggregate} from "../meta/ChildAggregate";
import {Element} from "../meta/Element";
import {PropertyDescriptor} from "../meta/PropertyDescriptor";

//import Log = org.apache.commons.logging.Log;
//import LogFactory = org.apache.commons.logging.LogFactory;


export enum AggregateAttributeType {

  CHILD_AGGREGATE,

  ELEMENT

}


/**
 * A generic descriptor for an attribute of an OFX aggregate.
 *
 * @author Ryan Heaton
 */
export class AggregateAttribute {

  private readMethod: ReadMethod<any>;
  private writeMethod: WriteMethod<any>;
  private attributeType: any;
  private collectionEntryType: any;
  private name: string;
  private order: number;
  private required: boolean;
  private type: AggregateAttributeType;
  private toString_: string;
  private collection: boolean;
  
  constructor(arg: Element | ChildAggregate) {
    if(arg instanceof Element) {
      this.AggregateAttributeFromElement(arg);
    } else if(arg instanceof ChildAggregate) {
      this.AggregateAttributeFromChildAggregate(arg);
    } else {
      throw new Error("invalid type");
    }
  }

  AggregateAttributeFromElement(elementInfo: Element) {
    this.readMethod = elementInfo.getReadMethod();
    this.writeMethod = elementInfo.getWriteMethod();
    if (this.readMethod == null) {
      throw new Error("Illegal property for aggregate: no read method.");
    }
    else if (this.writeMethod == null) {
      throw new Error("Illegal property for aggregate: no write method.");
    }

    this.attributeType = elementInfo.getPropertyType();
    this.collectionEntryType = null;
    this.name = elementInfo.name();
    this.order = elementInfo.order();
    this.required = elementInfo.required();
    this.type = AggregateAttributeType.ELEMENT;
    this.toString_ = "Element '" + this.name + "'";
    this.collection = false;

    //todo: validate known/supported element types here?
  }

  AggregateAttributeFromChildAggregate(childAggregate: ChildAggregate) {
    this.readMethod = childAggregate.getReadMethod();
    this.writeMethod = childAggregate.getWriteMethod();
    if (this.readMethod == null) {
      throw new Error("Illegal property for aggregate: no read method.");
    }
    else if (this.writeMethod == null) {
      throw new Error("Illegal property for aggregate: no write method.");
    }

    this.attributeType = childAggregate.getPropertyType();
    this.collection = false;
    if (childAggregate.collectionEntryType()) {
      this.collection = true;
      this.name = null;
      this.collectionEntryType = childAggregate.collectionEntryType();
    }
    else if ("##not_specified##" === childAggregate.name()) {
      var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(this.attributeType);
      if (aggregateInfo == null) {
        throw new Error("Illegal child aggregate type '" + childAggregate.getPropertyType() + "': no aggregate information available.");
      }

      this.name = aggregateInfo.getName();
      if ("##not_specified##" === this.name) {
        throw new Error("Illegal child aggregate type '" + childAggregate.getPropertyType() + "': a child aggregate name must be specified.");
      }
      this.collectionEntryType = null;
    }
    else {
      this.name = childAggregate.name();
      this.collectionEntryType = null;
    }

    this.order = childAggregate.order();
    this.required = childAggregate.required();
    this.type = AggregateAttributeType.CHILD_AGGREGATE;
    this.toString_ = "ChildAggregate '" + this.name + "'";
  }

  public get(instance: Object) /*throws Exception*/: any {
    return this.readMethod.call(instance);
  }

  public set(value: any, instance: Object) /*throws Exception*/: void {
    if(this.collection) {
      var collection: Array<Object> = this.get(instance);
      if (collection == null) {
        if(this.attributeType === SortedSet) {
          console.assert("contentCompare" in this.collectionEntryType);
          collection = <any>new SortedSet((<any>this.collectionEntryType).contentCompare);
        } else {
          collection = new this.attributeType();
        }
      }
      collection.push(value);
      value = collection;
    }
    
    this.writeMethod.call(instance, value);
  }

  public getAttributeType(): any {
    return this.attributeType;
  }

  public getArrayEntryType(): any {
    return this.collectionEntryType;
  }

  public getName(): string {
    return this.name;
  }

  public isRequired(): boolean {
    return this.required;
  }

  public getOrder(): number {
    return this.order;
  }

  public getType(): AggregateAttributeType {
    return this.type;
  }

  public static contentCompare(left: AggregateAttribute, right: AggregateAttribute): number {
    return left.order - right.order;
  }

//  public int compareTo(other: AggregateAttribute) {
//    return this.order - other.order;
//  }

  public isArray(): boolean {
    return this.collection;
  }

  //@Override
  public toString(): string {
    return this.toString_;
  }
}



