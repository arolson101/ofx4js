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


inherit.isAssignableFrom = function(entryType, assignableTo) {
  return (assignableTo === entryType) ||
    ((typeof entryType === "function") && (assignableTo.prototype instanceof entryType));
};


module.exports = inherit;
