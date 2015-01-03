"use strict";

function OutputStreamWriter(/*array*/ out, /*string*/ encoding) {
  this.out = out;
  this.encoding = encoding;
}


OutputStreamWriter.prototype.flush = function() {
};


OutputStreamWriter.prototype.close = function() {
};


OutputStreamWriter.prototype.write = function(data) {
  Array.prototype.push.apply(this.out, data.split(''));
};



module.exports = OutputStreamWriter;
