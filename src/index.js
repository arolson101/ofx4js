"use strict";

var ofx4js = {
  client: require("./client/index"),
  domain: require("./domain/index"),
  io: require("./io/index"),
  meta: require("./meta/index"),
  util: require("./util/index"),
};

window.ofx4js = ofx4js;

module.exports = ofx4js;
