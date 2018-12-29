import { LOG } from "../log/Log";
import { StringConversion } from "./StringConversion";
import { DefaultStringConversion } from "./DefaultStringConversion";
import { OFXWriter } from "./OFXWriter";
import { AggregateInfo, HeaderValues } from "./AggregateInfo";
import { AggregateIntrospector } from "./AggregateIntrospector";
import { OFXException } from "../OFXException";
import { StringMap } from "../collections/collections";
import { SortedSet } from "../collections/SortedSet";
import { AggregateAttribute, AggregateAttributeType } from "./AggregateAttribute";


/**
 * Marshaller for aggregate objects.
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
      throw new OFXException("Unable to marshal object (no aggregate metadata found).");
    }

    if (aggregateInfo.hasHeaders()) {
      var headerValues: HeaderValues = aggregateInfo.getHeaders(aggregate);
      var convertedValues: StringMap = {};
      for (var header in headerValues) {
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
        LOG.error("Unable to get " + aggregateAttribute.toString() + "%o", e);
      }

      if (childValue != null) {
        switch (aggregateAttribute.getType()) {
          case AggregateAttributeType.CHILD_AGGREGATE:
            var childValues: Array<Object>;
            if (childValue instanceof Array) {
              childValues = childValue;
            }
            else if(childValue instanceof SortedSet) {
              childValues = (<SortedSet<Object>>childValue).values();
            }
            else {
              childValues = [childValue];
            }

            for (var objValue of childValues) {
              var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(objValue.constructor);
              if (aggregateInfo == null) {
                throw new OFXException("Unable to marshal object of type " + objValue.constructor.name + " (no aggregate metadata found).");
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
            throw new OFXException("Unknown aggregate attribute type: " + aggregateAttribute.getType());
        }
      }
      else if (aggregateAttribute.isRequired()) {
        throw new OFXException("Required " + aggregateAttribute.toString() + " is null or empty.");
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
