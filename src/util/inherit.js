"use strict";

var inherits = require("inherits");


var AggregateIntrospector = require("../io/AggregateIntrospector");

function inherit(child, type, parent) {
  switch(type) {
    case 'extends':
      inherits(child, parent);
//      child.prototype = Object.create(parent);
//      child.prototype.constructor = child;
      
      AggregateIntrospector.extend(child, parent);
      break;
      
    case 'implements':
      break;
      
    default:
      throw new Error("unknown inheritance type");
  }
}

module.exports = inherit;
