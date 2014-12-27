/*
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

"use strict";

var AggregateIntrospector = require("./AggregateIntrospector");

/**
 * A generic descriptor for an attribute of an OFX aggregate.
 *
 * @class
 */
function AggregateAttribute(type, info) {

  /**
   * @name AggregateAttribute#readMethod
   * @type Method
   * @access private
   */
  this.readMethod = null;

  /**
   * @name AggregateAttribute#writeMethod
   * @type Method
   * @access private
   */
  this.writeMethod = null;

  /**
   * @name AggregateAttribute#attributeType
   * @type Class
   * @access private
   */
  this.attributeType = null;

  /**
   * @name AggregateAttribute#collectionEntryType
   * @type Class
   * @access private
   */
  this.collectionEntryType = null;

  /**
   * @name AggregateAttribute#name
   * @type String
   * @access private
   */
  this.name = null;

  /**
   * @name AggregateAttribute#order
   * @type int
   * @access private
   */
  this.order = null;

  /**
   * @name AggregateAttribute#required
   * @type boolean
   * @access private
   */
  this.required = null;

  /**
   * @name AggregateAttribute#type
   * @type Type
   * @access private
   */
  this.type = type;

  /**
   * @name AggregateAttribute#toString_
   * @type String
   * @access private
   */
  this.toString_ = null;

  /**
   * @name AggregateAttribute#collection
   * @type boolean
   * @access private
   */
  this.collection = null;
  
  switch(type) {
    case AggregateAttribute.Type.CHILD_AGGREGATE:
      this.AggregateAttributeForChildAggregate(info);
      break;
      
    case AggregateAttribute.Type.ELEMENT:
      this.AggregateAttributeForElement(info);
      break;
      
    default:
      throw new Error("illegal invocation");
  }
}


var Type = AggregateAttribute.Type = {
  CHILD_AGGREGATE: 0,
  ELEMENT: 1
};


AggregateAttribute.prototype.AggregateAttributeForElement = function(elementInfo) {
  this.readMethod = elementInfo.readMethod;
  this.writeMethod = elementInfo.writeMethod;
  if (this.readMethod === null) {
    throw new Error("Illegal property '" + elementInfo.name + "' for aggregate: no read method.");
  }
  else if (this.writeMethod === null) {
    throw new Error("Illegal property '" + elementInfo.name + "' for aggregate: no write method.");
  }

  this.attributeType = elementInfo.attributeType;
  this.collectionEntryType = null;
  this.name = elementInfo.name;
  this.order = elementInfo.order;
  this.required = elementInfo.required;
  this.type = Type.ELEMENT;
  this.toString_ = "Element '" + this.name + "'";
  this.collection = false;

  //todo: validate known/supported element types here?
};


AggregateAttribute.prototype.AggregateAttributeForChildAggregate = function(childAggregate) {
  this.readMethod = childAggregate.readMethod;
  this.writeMethod = childAggregate.writeMethod;
  if (this.readMethod === null) {
    throw new Error("Illegal property '" + childAggregate.name + "' for aggregate: no read method.");
  }
  else if (this.writeMethod === null) {
    throw new Error("Illegal property '" + childAggregate.name + "' for aggregate: no write method.");
  }

  this.collection = (childAggregate.collectionEntryType !== null);
  if (this.collection) {
    this.name = null;
    this.collectionEntryType = childAggregate.collectionEntryType;
  }
  else if ("##not_specified##".equals(childAggregate.name)) {
    var aggregateInfo = AggregateIntrospector.getAggregateInfo(childAggregate.attributeType);
    if (aggregateInfo === null) {
      throw new Error("Illegal child aggregate type '" + childAggregate.attributeType + "': no aggregate information available.");
    }

    this.name = aggregateInfo.getName();
    if ("##not_specified##".equals(this.name)) {
      throw new Error("Illegal child aggregate type '" + childAggregate.attributeType + "': a child aggregate name must be specified.");
    }
    this.collectionEntryType = null;
  }
  else {
    this.name = childAggregate.name;
    this.collectionEntryType = null;
  }

  this.order = childAggregate.order();
  this.required = childAggregate.required();
  this.type = Type.CHILD_AGGREGATE;
  this.toString_ = "ChildAggregate '" + this.name + "'";
};


AggregateAttribute.prototype.get = function(/*Object*/ instance) {
  return this.readMethod.invoke(instance);
};


AggregateAttribute.prototype.set = function(/*Object*/ value, /*Object*/ instance) {
  if (this.collection) {
    var collection = this.get(instance);
    if (collection === null) {
      collection = [];
    }
    collection.push(value);
    value = collection;
  }

  this.writeMethod.invoke(instance, value);
};


AggregateAttribute.prototype.getAttributeType = function() {
  return this.attributeType;
};


AggregateAttribute.prototype.getCollectionEntryType = function() {
  return this.collectionEntryType;
};


AggregateAttribute.prototype.getName = function() {
  return this.name;
};


AggregateAttribute.prototype.isRequired = function() {
  return this.required;
};


AggregateAttribute.prototype.getOrder = function() {
  return this.order;
};


AggregateAttribute.prototype.getType = function() {
  return this.type;
};


AggregateAttribute.prototype.compareTo = function(/*AggregateAttribute*/ other) {
  return this.order - other.order;
};


AggregateAttribute.prototype.isCollection = function() {
  return this.collection;
};


// @Override
AggregateAttribute.prototype.toString = function() {
  return this.toString_;
};




module.exports = AggregateAttribute;
