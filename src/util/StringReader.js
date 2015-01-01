"use strict";

function StringReader(text) {
  this._text = text;
  this._cursor = 0;
  this._mark = 0;
}

StringReader.prototype.read = function() {
  if(this._cursor >= this._text.length) {
    return -1;
  } else {
    if(arguments.length === 0) {
      return this.readChar();
    } else {
      var cbuf = arguments[0];
      var offset = arguments[1] || 0;
      var length = arguments[2] || cbuf.length;
      length = Math.min(length, this._text.length - this._cursor);
      for(var i=0; i<length; i++) {
        cbuf[offset + i] = this.readChar();
      }
      return length;
    }
  }
};


StringReader.prototype.readChar = function() {
  console.assert(this._cursor < this._text.length);
  var ch = this._text[this._cursor];
  this._cursor++;
  return ch;
};


StringReader.prototype.close = function() {
  this._text = null;
  this._cursor = null;
  this._mark = null;
};


StringReader.prototype.mark = function(/*readLimit*/) {
  this._mark = this._cursor;
};


StringReader.prototype.reset = function() {
  this._cursor = this._mark;
};


StringReader.prototype.remainder = function() {
  return this._text.substring(this._cursor);
};


module.exports = StringReader;
