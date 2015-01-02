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
var DefaultStringConversion = require("./DefaultStringConversion");
var AggregateAttribute = require("./AggregateAttribute");

/**
 * Marshaller for aggregate objects.
 *
 * @class
 */
function AggregateMarshaller () {
  /**
   * @name AggregateMarshaller#conversion
   * @type StringConversion
   * @access private
   */
  this.conversion = new DefaultStringConversion();
}


/**
 * Marshal the specified aggregate object.
 *
 * @param {Object} aggregate The aggregate to marshal.
 * @param {OFXWriter} writer    The writer.
 */
AggregateMarshaller.prototype.marshal = function(aggregate, writer) {
  var aggregateInfo = AggregateIntrospector.getAggregateInfo(aggregate.constructor);
  if (!aggregateInfo) {
    throw new Error("Unable to marshal object: no aggregate metadata found.");
  }

  if (aggregateInfo.hasHeaders()) {
    var headerValues = aggregateInfo.getHeaders(aggregate);
    var convertedValues = {};
    for (var header in headerValues) {
      convertedValues.put(header, this.getConversion().toString(headerValues[header]));
    }
    writer.writeHeaders(convertedValues);
  }

  writer.writeStartAggregate(aggregateInfo.getName());
  var aggregateAttributes = aggregateInfo.getAttributes();
  this.writeAggregateAttributes(aggregate, writer, aggregateAttributes);
  writer.writeEndAggregate(aggregateInfo.getName());
};


/**
 * Write the aggregate attributes for the specified aggregate.
 *
 * @param {Object} aggregate           The aggregate.
 * @param {OFXWriter} writer              The writer.
 * @param {Object} aggregateAttributes The aggregate attributes.
 */
AggregateMarshaller.prototype.writeAggregateAttributes = function(aggregate, writer, /*AggregateAttribute[]*/ aggregateAttributes) {
  for (var i=0; i<aggregateAttributes.length; i++) {
    var aggregateAttribute = aggregateAttributes[i];
    var childValue = aggregateAttribute.get(aggregate);
    if (childValue) {
      switch (aggregateAttribute.getType()) {
        case AggregateAttribute.Type.CHILD_AGGREGATE:
          var childValues;
          if (childValue instanceof Array) {
            childValues = childValue;
          }
          else {
            childValues = [childValue];
          }

          for (var value in childValues) {
            var aggregateInfo = AggregateIntrospector.getAggregateInfo(value.constructor);
            if (!aggregateInfo) {
              throw new Error("Unable to marshal object of type " + value.constructor.name + " (no aggregate metadata found).");
            }

            var attributeName = aggregateAttribute.getName();
            if (aggregateAttribute.isCollection()) {
              attributeName = aggregateInfo.getName();
            }
            
            writer.writeStartAggregate(attributeName);
            this.writeAggregateAttributes(value, writer, aggregateInfo.getAttributes());
            writer.writeEndAggregate(attributeName);
          }
          break;
        case AggregateAttribute.Type.ELEMENT:
          /*jshint -W004*/
          var value = this.getConversion().toString(childValue);
          if ((value) && ("" !== value.trim())) {
            writer.writeElement(aggregateAttribute.getName(), value);
          }
          break;
        default:
          throw new Error("Unknown aggregate attribute type: " + aggregateAttribute.getType());
      }
    }
    else if (aggregateAttribute.isRequired()) {
      throw new Error("Required " + aggregateAttribute.toString() + " is null or empty.");
    }
  }
};


/**
 * The conversion.
 *
 * @return {StringConversion} The conversion.
 */
AggregateMarshaller.prototype.getConversion = function() {
  return this.conversion;
};


/**
 * The conversion.
 *
 * @param {StringConversion} conversion The conversion.
 */
AggregateMarshaller.prototype.setConversion = function(conversion) {
  this.conversion = conversion;
};




module.exports = AggregateMarshaller;
