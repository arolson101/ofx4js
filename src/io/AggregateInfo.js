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

var AggregateAttribute = require("./AggregateAttribute");

/**
 * Holder for meta information about an aggregate class.
 *
 * @class
 */
function AggregateInfo(name, clazz) {
  
  /**
   * @name AggregateInfo#clazz
   * @type Class
   * @access private
   */
  this.clazz = clazz;

  /**
   * @name AggregateInfo#name
   * @type String
   * @access private
   */
  this.name = name;

  /**
   * @name AggregateInfo#attributes
   * @type AggregateAttribute[]
   * @access private
   */
  this.attributes = [];

  /**
   * @name AggregateInfo#headers
   * @type object
   */
  this.headers = {};
}


AggregateInfo.prototype.addChildAggregate = function(childAggregateInfo) {
  var attribute = new AggregateAttribute(AggregateAttribute.Type.CHILD_AGGREGATE, childAggregateInfo);
  this.attributes.push(attribute);
};

AggregateInfo.prototype.addElement = function(elementInfo) {
  var attribute = new AggregateAttribute(AggregateAttribute.Type.ELEMENT, elementInfo);
  this.attributes.push(attribute);
};

AggregateInfo.prototype.addHeader = function(options) {
  console.assert(options.name);
  this.headers[options.name] = options;
};


/**
 * The name of the aggregate.
 *
 * @return {String} The name of the aggregate.
 */
AggregateInfo.prototype.getName = function() {
  return this.name;
};


/**
 * The name of the aggregate.
 *
 * @param {String} value The name of the aggregate.
 */
AggregateInfo.prototype.setName = function(value) {
  this.name = value;
};


/**
 * The attributes.
 *
 * @return {AggregateAttribute[]} The attributes.
 */
AggregateInfo.prototype.getAttributes = function() {
  return this.attributes;
};


function isAssignableFrom(entryType, assignableTo) {
  return (assignableTo === entryType) ||
    (assignableTo.prototype instanceof entryType);
}


/**
 * Get the attribute by the specified name.
 *
 * @param {String} name The name of the attribute.
 * @param {int} orderHint The order at which the attribute should come after in case there are more than one candidates.
 * @param {Class} [assignableTo=null] The class this attribute must be assignable to
 * @return {AggregateAttribute} The attribute by the specified name,
 * or if there are more than one by that name,
 * the first one after the specified order,
 * or if there are none then the first collection that
 * comes after the order hint, or the latest if there
 * are none that come after the order hint, or null.
 */
AggregateInfo.prototype.getAttribute = function(name, orderHint, assignableTo) {
  var candidates = [];
  var collectionBucket = null;
  for (var attributeIdx=0; attributeIdx<this.attributes.length; attributeIdx++) {
    var attribute = this.attributes[attributeIdx];
    if (name === attribute.getName()) {
      candidates.push(attribute);
    }
    else if (attribute.isCollection()) {
      if (assignableTo) {
        // Verify it's the right generic type.
        var entryType = attribute.getCollectionEntryType();
        if (entryType && !isAssignableFrom(entryType, assignableTo)) {
          // Collection is of wrong type.
          continue;
        }
      }
      if (!collectionBucket || collectionBucket.getOrder() < orderHint) {
        //the default is the first collection that comes after the order hint, or the latest if there are none that come after the order hint.
        collectionBucket = attribute;
      }
    }
  }

  if (candidates.length > 0) {
    if (candidates.length === 1) {
      return candidates[0];
    }
    else {
      for (var candidateIdx=0; candidateIdx<candidates.length; candidateIdx++) {
        var candidate = candidates[candidateIdx];
        if (candidate.getOrder() >= orderHint) {
          return candidate;
        }
      }
    }
  }

  return collectionBucket;
};


/**
 * Whether this aggregate has headers.
 *
 * @return {boolean} Whether this aggregate has headers.
 */
AggregateInfo.prototype.hasHeaders = function() {
  return this.headers.length > 0;
};


AggregateInfo.prototype.getMethod = function(header, name) {
  console.assert(header[name]);
  var fcn = this.clazz[header[name]];
  console.assert(fcn && (typeof(fcn) === "function"));
  return fcn;
};

/**
 * Get the headers defined by the specific aggregate instance.
 *
 * @param {Object} instance The aggregate instance.
 * @return {Object} The headers.
 */
AggregateInfo.prototype.getHeaders = function(instance) {
  var headers = {};
  for (var name in this.headers) {
    var header = this.headers[name];
    var readMethod = this.getMethod(header, "readMethod");
    var headerValue = readMethod.call(instance);
    headers[header.name] = headerValue;
  }
  return headers;
};


/**
 * The type of the specified header.
 *
 * @param {String} name The header name.
 * @return {Class} The header type, or null if no header by the specified name exists.
 */
AggregateInfo.prototype.getHeaderType = function(name) {
  if (this.headers[name]) {
    var header = this.headers[name];
    return header.attributeType;
  }
  return null;
};


/**
 * Set the header value for the specified instance.
 *
 * @param {Object} instance The instance.
 * @param {String} name     The name of the header.
 * @param {Object} value    the value of the header.
 */
AggregateInfo.prototype.setHeader = function(instance, name, value) {
  if (this.headers[name]) {
    var header = this.headers[name];
    var writeMethod = this.getMethod(header, "writeMethod");
    writeMethod.call(instance, value);
  }
};




module.exports = AggregateInfo;
