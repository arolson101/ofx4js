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
import { Log, LogFactory } from "../log/Log";
import { AggregateInfo } from "./AggregateInfo";
import { OFXException } from "../OFXException";
import { OFXHandler } from "./OFXHandler";
import { Stack } from "../collections/Stack";
import { StringConversion } from "./StringConversion";
import { AggregateIntrospector } from "./AggregateIntrospector";
import { AggregateAttribute, AggregateAttributeType } from "./AggregateAttribute";
import { OFXSyntaxException } from "./OFXSyntaxException";


var LOG: Log;

class AggregateInfoHolder {
  public aggregate: Object;
  public info: AggregateInfo;
  public aggregateName: string;
  public currentAttributeIndex: number;

  constructor(arg1: string | Object, arg2?: AggregateInfo, arg3?: string) {
    this.currentAttributeIndex = 0;
    switch(arguments.length) {
      case 1:
        this.AggregateInfoHolder1.apply(this, arguments);
        break;

      case 3:
        this.AggregateInfoHolder3.apply(this, arguments);
        break;

      default:
        throw new OFXException("invalid number of arguments");
    }
  }

  private AggregateInfoHolder1(ignoredAggregateName: string) {
    this.aggregate = null;
    this.info = null;
    this.aggregateName = ignoredAggregateName;
  }

  private AggregateInfoHolder3(aggregate: Object, info: AggregateInfo, aggregateName: string) {
    this.aggregateName = aggregateName;
    this.aggregate = aggregate;
    this.info = info;
  }

  public isBeingSkipped(): boolean {
    return this.aggregate == null || this.info == null;
  }

  public isSkipping(aggregateName: string): boolean {
    return this.isBeingSkipped() && aggregateName === this.aggregateName;
  }
}


/**
 * Content handler that manages the aggregate using a stack-based implementation.
 *
 * @author Ryan Heaton
 */
export class AggregateStackContentHandler<A> implements OFXHandler {

  private stack: Stack<AggregateInfoHolder> = new Stack<AggregateInfoHolder>();
  private conversion: StringConversion;
  private parsingRoot: boolean = false;

  constructor(root: A, conversion: StringConversion) {
    this.stack = new Stack<AggregateInfoHolder>();
    this.parsingRoot = false;

    var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(root.constructor);
    if (aggregateInfo == null) {
      throw new OFXException("Unable to marshal object of type '" + root.constructor.name + "' (no aggregate metadata found).");
    }

    this.stack.push(new AggregateInfoHolder(root, aggregateInfo, aggregateInfo.getName()));
    this.conversion = conversion;
  }

  public onHeader(name: string, value: string): void {
    var headerType: any = this.stack.peek().info.getHeaderType(name);
    if (headerType != null) {
      this.stack.peek().info.setHeader(this.stack.peek().aggregate, name, this.conversion.fromString(headerType, value));
    }
  }

  public onElement(name: string, value: string): void {
    if (!this.stack.peek().isBeingSkipped()) {
      var attribute: AggregateAttribute = this.stack.peek().info.getAttribute(name, this.stack.peek().currentAttributeIndex);
      if (attribute != null && attribute.getType() == AggregateAttributeType.ELEMENT) {
        try {
          attribute.set(this.conversion.fromString(attribute.getAttributeType(), value), this.stack.peek().aggregate);
        }
        catch (e) {
          LOG.error("Unable to set " + attribute.toString(), e);
        }
        this.stack.peek().currentAttributeIndex = attribute.getOrder();
      }
      else if (LOG.isInfoEnabled()) {
        LOG.info("Element " + name + " is not supported on aggregate " + this.stack.peek().info.getName() + " at index " + this.stack.peek().currentAttributeIndex);
      }
    }
  }

  public startAggregate(aggregateName: string): void {
    if (this.stack.peek().isBeingSkipped()) {
      this.stack.push(new AggregateInfoHolder(aggregateName));
    }
    else if (!this.parsingRoot) {
      if (aggregateName !== this.stack.peek().info.getName()) {
        throw new OFXException("Unexpected root element: " + aggregateName);
      }

      this.parsingRoot = true;
    }
    else {
      var infoHolder: AggregateInfoHolder;

      var attribute: AggregateAttribute = this.stack.peek().info.getAttribute(aggregateName, this.stack.peek().currentAttributeIndex);
      if (attribute != null) {
        if (attribute.getType() == AggregateAttributeType.CHILD_AGGREGATE) {
          var aggregateType: any;
          if (attribute.isArray()) {
            aggregateType = AggregateIntrospector.findAggregateByName(aggregateName);
          }
          else {
            aggregateType = attribute.getAttributeType();
          }

          if (aggregateType != null) {
            var aggregateInfo: AggregateInfo = AggregateIntrospector.getAggregateInfo(aggregateType);
            if (aggregateInfo == null) {
              throw new OFXException("Unable to locate aggregate info for type " + aggregateType.getName());
            }

            var aggregate: Object = aggregate = new aggregateType();
            infoHolder = new AggregateInfoHolder(aggregate, aggregateInfo, aggregateName);
          }
          else {
            if (LOG.isInfoEnabled()) {
              LOG.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": name not assigned a type.");
            }

            //element not supported.  push a skipping aggregate on the stack.
            infoHolder = new AggregateInfoHolder(aggregateName);
          }

          this.stack.peek().currentAttributeIndex = attribute.getOrder();
        }
        else {
          if (LOG.isInfoEnabled()) {
            LOG.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no child aggregate, but there does exist an element by that name.");
          }

          //child aggregate not supported.  push a skipping aggregate on the stack.
          infoHolder = new AggregateInfoHolder(aggregateName);
        }
      }
      else {
        if (LOG.isInfoEnabled()) {
          LOG.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
        }

        //child aggregate not supported.  push a skipping aggregate on the stack.
        infoHolder = new AggregateInfoHolder(aggregateName);
      }

      this.stack.push(infoHolder);
    }
  }

  public endAggregate(aggregateName: string): void {
    var infoHolder: AggregateInfoHolder = this.stack.pop();
    if (aggregateName !== infoHolder.aggregateName) {
      throw new OFXSyntaxException("Unexpected end aggregate " + aggregateName + ". (Perhaps " +
        infoHolder.aggregateName + " is an element with an empty value, making it impossible to parse.)");
    }

    if (!this.stack.isEmpty()) {
      if (!infoHolder.isSkipping(aggregateName)) {
        //we're not skipping the top aggregate, so process it.
        var attribute: AggregateAttribute = this.stack.peek().info.getAttribute(
            aggregateName, this.stack.peek().currentAttributeIndex, infoHolder.aggregate.constructor);
        try {
          if (attribute != null) {
            attribute.set(infoHolder.aggregate, this.stack.peek().aggregate);
          } else {
            if (LOG.isInfoEnabled()) {
              LOG.info("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
            }
          }
        }
        catch (e) {
          LOG.error("Unable to set " + attribute.toString(), e);
        }
        if (attribute != null) {
          this.stack.peek().currentAttributeIndex = attribute.getOrder();
        }
      }
    }
    else {
      //ended the root element.
    }
  }
}

LOG = LogFactory.getLog(AggregateStackContentHandler);
