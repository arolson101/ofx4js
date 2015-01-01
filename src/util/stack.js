"use strict";

function Stack() {
  this.values = [];
}


Stack.prototype.push = function() {
  return Array.prototype.push.apply(this.values, arguments);
};


Stack.prototype.pop = function() {
  return Array.prototype.pop.apply(this.values, arguments);
};


Stack.prototype.peek = function() {
  if(this.values.length === 0) {
    return null;
  } else {
    return this.values[this.values.length - 1];
  }
};


Stack.prototype.isEmpty = function() {
  return this.values.length === 0;
};

module.exports = Stack;
