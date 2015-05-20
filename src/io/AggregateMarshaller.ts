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
import {StringConversion} from "StringConversion";
import {DefaultStringConversion} from "DefaultStringConversion";
import {AggregateIntrospector} from "AggregateIntrospector";
import {AggregateInfo, HeaderValues} from "AggregateInfo";
import {AggregateAttribute, AggregateAttributeType} from "AggregateAttribute";
import {OFXWriter} from "OFXWriter";
import {SortedSet} from "../collections/SortedSet";
import {Log} from "../log/Log";
import {LogFactory} from "../log/Log";

var LOG: Log;

/**
 * Marshaller for aggregate objects.
 *
 * @author Ryan Heaton
 */
export class AggregateMarshaller {

  private conversion: StringConversion;
  
  constructor() {
    this.conversion = new DefaultStringConversion();
  }

  /**
   * Marshal the specified aggregate object.
   *
   * @param aggregate The aggregate to marshal.
   * @param writer    The writer.
   */
  public marshal(aggregate: Object, writer: OFXWriter) /*throws IOException*/: void {
    var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(aggregate.constructor);
    if (aggregateInfo == null) {
      throw new Error("Unable to marshal object (no aggregate metadata found).");
    }

    if (aggregateInfo.hasHeaders()) {
      var headerValues: HeaderValues = aggregateInfo.getHeaders(aggregate);
      var convertedValues: StringMap = {};
      for (var header_ in headerValues) {
        var header: string = header;
        convertedValues[header] = this.getConversion().toString(headerValues[header]);
      }
      writer.writeHeaders(convertedValues);
    }

    writer.writeStartAggregate(aggregateInfo.getName());
    var AggregateAttributes: SortedSet<AggregateAttribute> = aggregateInfo.getAttributes();
    this.writeAggregateAttributes(aggregate, writer, AggregateAttributes);
    writer.writeEndAggregate(aggregateInfo.getName());
  }

  /**
   * Write the aggregate attributes for the specified aggregate.
   *
   * @param aggregate           The aggregate.
   * @param writer              The writer.
   * @param aggregateAttributes The aggregate attributes.
   */
  protected writeAggregateAttributes(aggregate: Object, writer: OFXWriter, aggregateAttributes: SortedSet<AggregateAttribute>) /*throws IOException*/: void {
    for (var i in aggregateAttributes.values()) {
      var aggregateAttribute: AggregateAttribute = aggregateAttributes.values()[i];
      var childValue: Object = null;
      try {
        childValue = aggregateAttribute.get(aggregate);
      }
      catch (e) {
        LOG.error("Unable to get " + aggregateAttribute.toString(), e);
      }

      if (childValue != null) {
        switch (aggregateAttribute.getType()) {
          case AggregateAttributeType.CHILD_AGGREGATE:
            var childValues: Array<Object>;
            if (childValue instanceof Array) {
              childValues = childValue;
            }
            else {
              childValues = [childValue];
            }

            for (var value_ in childValues) {
              var objValue: Object = value_;
              var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(objValue.constructor);
              if (aggregateInfo == null) {
                throw new Error("Unable to marshal object of type " + objValue.constructor.name + " (no aggregate metadata found).");
              }

              var attributeName: string = aggregateAttribute.getName();
              if (aggregateAttribute.isArray()) {
                attributeName = aggregateInfo.getName();
              }
              
              writer.writeStartAggregate(attributeName);
              this.writeAggregateAttributes(objValue, writer, aggregateInfo.getAttributes());
              writer.writeEndAggregate(attributeName);
            }
            break;
          case AggregateAttributeType.ELEMENT:
            var strValue: string = this.getConversion().toString(childValue);
            if ((strValue != null) && ("" !== strValue.trim())) {
              writer.writeElement(aggregateAttribute.getName(), strValue);
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
  }

  /**
   * The conversion.
   *
   * @return The conversion.
   */
  public getConversion(): StringConversion {
    return this.conversion;
  }

  /**
   * The conversion.
   *
   * @param conversion The conversion.
   */
  public setConversion(conversion: StringConversion): void {
    this.conversion = conversion;
  }
}

LOG = LogFactory.getLog(AggregateMarshaller);


