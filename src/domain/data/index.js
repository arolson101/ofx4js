"use strict";

module.exports = {
  banking: require("./banking/index"),
  common: require("./common/index"),
  creditcard: require("./creditcard/index"),
  investment: require("./investment/index"),
  profile: require("./profile/index"),
  seclist: require("./seclist/index"),
  signon: require("./signon/index"),
  signup: require("./signup/index"),
  tax1099: require("./tax1099/index"),

  ApplicationSecurity: require("./ApplicationSecurity"),
  MessageSetProfile: require("./MessageSetProfile"),
  MessageSetType: require("./MessageSetType"),
  RequestEnvelope: require("./RequestEnvelope"),
  RequestMessage: require("./RequestMessage"),
  RequestMessageSet: require("./RequestMessageSet"),
  ResponseEnvelope: require("./ResponseEnvelope"),
  ResponseMessage: require("./ResponseMessage"),
  ResponseMessageSet: require("./ResponseMessageSet"),
  SignonProfile: require("./SignonProfile"),
  TransactionWrappedRequestMessage: require("./TransactionWrappedRequestMessage"),
  TransactionWrappedResponseMessage: require("./TransactionWrappedResponseMessage")
};
