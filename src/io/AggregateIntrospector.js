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

var AggregateInfo = require("./AggregateInfo");
var clone = require("clone");

var AGGREGATE_CLASSES_BY_NAME = {};
var placeholderName = "##PLACEHOLDER##";

/**
 * Introspector for aggregate information.
 *
 * @class
 */
var AggregateIntrospector = {};

AggregateIntrospector.AGGREGATE_CLASSES_BY_NAME = AGGREGATE_CLASSES_BY_NAME;
AggregateIntrospector.placeholderName = placeholderName;

/**
 * Get the aggregate meta information for the specified class.
 *
 * @param clazz the aggregate class.
 * @return {AggregateInfo} The aggregate meta information, or null if the class isn't an aggregate.
 */
AggregateIntrospector.getAggregateInfo = function(clazz) {
  return clazz.Aggregate;
};

/**
 * Find the aggregate class by name.
 *
 * @param {String} aggregateName The name of the aggregate.
 * @return The aggregate class.
 */
AggregateIntrospector.findAggregateByName = function(aggregateName) {
  return AGGREGATE_CLASSES_BY_NAME[aggregateName];
};


/**
 * Add parent's aggregate data to child
 *
 * @param clazz the child class
 * @return parent the parent class
 */
AggregateIntrospector.extend = function(clazz, parent) {
  var parentAggregate = AggregateIntrospector.getAggregateInfo(parent);
  if(parentAggregate) {
    clazz.Aggregate = clone(parentAggregate);
    clazz.Aggregate.setName(AggregateIntrospector.placeholderName);
  }
};


AggregateIntrospector.getAggregateName = function(clazz) {
  if(!clazz.Aggregate || clazz.Aggregate.getName() === AggregateIntrospector.placeholderName) {
    return null;
  } else {
    return clazz.Aggregate.getName();
  }
};


AggregateIntrospector.addAggregate = function(name, clazz) {
//  console.assert(!(name in AGGREGATE_CLASSES_BY_NAME));
  AGGREGATE_CLASSES_BY_NAME[name] = clazz;
  
  if(clazz.Aggregate) {
    console.assert(clazz.Aggregate.getName() === AggregateIntrospector.placeholderName);
    clazz.Aggregate.setName(name);
  } else {
    clazz.Aggregate = new AggregateInfo(name, clazz);
  }
};


AggregateIntrospector.addChildAggregate = function(clazz, options) {
  var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
  if(!aggregateInfo) {
    aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz);
  }
  console.assert(aggregateInfo);
  if(aggregateInfo) {
    aggregateInfo.addChildAggregate(options);
  }
};


AggregateIntrospector.addElement = function(clazz, options) {
  var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
  if(!aggregateInfo) {
    aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz);
  }
  console.assert(aggregateInfo);
  if(aggregateInfo) {
    aggregateInfo.addElement(options);
  }
};

AggregateIntrospector.addHeader = function(clazz, options) {
  var aggregateInfo = AggregateIntrospector.getAggregateInfo(clazz);
  if(!aggregateInfo) {
    aggregateInfo = clazz.Aggregate = new AggregateInfo(AggregateIntrospector.placeholderName, clazz);
  }
  console.assert(aggregateInfo);
  if(aggregateInfo) {
    aggregateInfo.addHeader(options);
  }
};


module.exports = AggregateIntrospector;
