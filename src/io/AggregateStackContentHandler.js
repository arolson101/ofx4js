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

var inherit = require("../util/inherit");
var Stack = require("../util/stack");
var AggregateIntrospector = require("./AggregateIntrospector");
var OFXHandler = require("./OFXHandler");
var AggregateAttribute = require("./AggregateAttribute");
var LOG = require("../util/log");

function AggregateInfoHolder() {

  /**
   * @name AggregateInfoHolder#aggregate
   * @type Object
   */
  this.aggregate = null;

  /**
   * @name AggregateInfoHolder#info
   * @type AggregateInfo
   */
  this.info = null;

  /**
   * @name AggregateInfoHolder#aggregateName
   * @type String
   */
  this.aggregateName = null;

  /**
   * @name AggregateInfoHolder#currentAttributeIndex
   * @type int
   */
  this.currentAttributeIndex = 0;

  switch(arguments.length) {
    case 1:
      var ignoredAggregateName = arguments[0];
      this.aggregate = null;
      this.info = null;
      this.aggregateName = ignoredAggregateName;
      break;
      
    case 3:
      var aggregate = arguments[0],
          info = arguments[1],
          aggregateName = arguments[2];
      this.aggregateName = aggregateName;
      this.aggregate = aggregate;
      this.info = info;
      break;
  }
}


/**
 * @returns boolean
 */
AggregateInfoHolder.prototype.isBeingSkipped = function() {
  return !this.aggregate || !this.info;
};

/**
 * @param {String} aggregateName
 * @returns boolean
 */
AggregateInfoHolder.prototype.isSkipping = function(aggregateName) {
  return this.isBeingSkipped() && aggregateName === this.aggregateName;
};



/**
 * Content handler that manages the aggregate using a stack-based implementation.
 * @param {Object} root
 * @param {StringConversion} conversion
 *
 * @class
 */
function AggregateStackContentHandler(root, conversion) {
  /**
   * @name AggregateStackContentHandler#stack
   * @type Stack<AggregateInfoHolder>
   * @access private
   */
  this.stack = new Stack();

  /**
   * @name AggregateStackContentHandler#conversion
   * @type StringConversion
   * @access private
   */
  this.conversion = conversion;

  /**
   * @name AggregateStackContentHandler#parsingRoot
   * @type boolean
   * @access private
   */
  this.parsingRoot = false;

  var aggregateInfo = AggregateIntrospector.getAggregateInfo(root.constructor);
  if (!aggregateInfo) {
    throw new Error("Unable to marshal object of type '" + root.constructor.name + "' (no aggregate metadata found).");
  }

  this.stack.push(new AggregateInfoHolder(root, aggregateInfo, aggregateInfo.getName()));
}

inherit(AggregateStackContentHandler, 'implements', OFXHandler);



/**
 * @param {String} name
 * @param {String} value
 */
AggregateStackContentHandler.prototype.onHeader = function(name, value) {
  var headerType = this.stack.peek().info.getHeaderType(name);
  if (headerType) {
    this.stack.peek().info.setHeader(this.stack.peek().aggregate, name, this.conversion.fromString(headerType, value));
  }
};

/**
 * @param {String} name
 * @param {String} value
 */
AggregateStackContentHandler.prototype.onElement = function(name, value) {
  if (!this.stack.peek().isBeingSkipped()) {
    var attribute = this.stack.peek().info.getAttribute(name, this.stack.peek().currentAttributeIndex);
    if (attribute && attribute.getType() === AggregateAttribute.Type.ELEMENT) {
      try {
        attribute.set(this.conversion.fromString(attribute.getAttributeType(), value), this.stack.peek().aggregate);
      }
      catch (e) {
        console.log("Unable to set " + attribute.toString(), e);
      }
      this.stack.peek().currentAttributeIndex = attribute.getOrder();
    }
    else {
      console.log("Element " + name + " is not supported on aggregate " + this.stack.peek().info.getName() + " at index " + this.stack.peek().currentAttributeIndex);
    }
  }
};

/**
 * @param {String} aggregateName
 */
AggregateStackContentHandler.prototype.startAggregate = function(aggregateName) {
  if (this.stack.peek().isBeingSkipped()) {
    this.stack.push(new AggregateInfoHolder(aggregateName));
  }
  else if (!this.parsingRoot) {
    if (aggregateName !== this.stack.peek().info.getName()) {
      throw new Error("Unexpected root element: " + aggregateName);
    }

    this.parsingRoot = true;
  }
  else {
    var infoHolder;

    var attribute = this.stack.peek().info.getAttribute(aggregateName, this.stack.peek().currentAttributeIndex);
    if (attribute) {
      if (attribute.getType() == AggregateAttribute.Type.CHILD_AGGREGATE) {
        var aggregateType;
        if (attribute.isCollection()) {
          aggregateType = AggregateIntrospector.findAggregateByName(aggregateName);
        }
        else {
          aggregateType = attribute.getAttributeType();
        }

        if (aggregateType) {
          var aggregateInfo = AggregateIntrospector.getAggregateInfo(aggregateType);
          if (!aggregateInfo) {
            throw new Error("Unable to locate aggregate info for type " + aggregateType.getName());
          }

          /*jshint -W055*/
          var aggregate = new aggregateType();
          infoHolder = new AggregateInfoHolder(aggregate, aggregateInfo, aggregateName);
        }
        else {
          if (LOG.warning) {
            console.log("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": name not assigned a type.");
          }

          //element not supported.  push a skipping aggregate on the stack.
          infoHolder = new AggregateInfoHolder(aggregateName);
        }

        this.stack.peek().currentAttributeIndex = attribute.getOrder();
      }
      else {
        if (LOG.warning) {
          console.log("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no child aggregate, but there does exist an element by that name.");
        }

        //child aggregate not supported.  push a skipping aggregate on the stack.
        infoHolder = new AggregateInfoHolder(aggregateName);
      }
    }
    else {
      if (LOG.warning) {
        console.log("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
      }

      //child aggregate not supported.  push a skipping aggregate on the stack.
      infoHolder = new AggregateInfoHolder(aggregateName);
    }

    this.stack.push(infoHolder);
  }
};

/**
 * @param {String} aggregateName
 */
AggregateStackContentHandler.prototype.endAggregate = function(aggregateName) {
  var infoHolder = this.stack.pop();
  if (aggregateName !== infoHolder.aggregateName) {
    throw new Error("Unexpected end aggregate " + aggregateName + ". (Perhaps " +
      infoHolder.aggregateName + " is an element with an empty value, making it impossible to parse.)");
  }

  if (!this.stack.isEmpty()) {
    if (!infoHolder.isSkipping(aggregateName)) {
      //we're not skipping the top aggregate, so process it.
      var attribute = this.stack.peek().info.getAttribute(
          aggregateName, this.stack.peek().currentAttributeIndex, infoHolder.aggregate.constructor);
      try {
        if (attribute) {
          attribute.set(infoHolder.aggregate, this.stack.peek().aggregate);
        } else {
          if (LOG.warning) {
            console.log("Child aggregate " + aggregateName + " is not supported on aggregate " + this.stack.peek().info.getName() + ": no attributes found by that name after index " + this.stack.peek().currentAttributeIndex);
          }
        }
      }
      catch (e) {
        console.log("Unable to set " + attribute.toString(), e);
      }
      if(attribute) {
        this.stack.peek().currentAttributeIndex = attribute.getOrder();
      }
    }
  }
  else {
    //ended the root element.
  }
};


module.exports = AggregateStackContentHandler;
