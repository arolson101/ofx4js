"use strict";

function inherit(child, type, parent) {
  switch(type) {
    case 'extends':
      child.prototype = Object.create(parent);
      child.prototype.constructor = child;
      break;
      
    case 'implements':
      break;
      
    default:
      throw new Error("unknown inheritance type");
  }
}

module.exports = inherit;
