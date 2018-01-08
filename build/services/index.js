'use strict';

var send = require('./send/send.service.js');
var unsubscribe = require('./unsubscribe/unsubscribe.service.js');

module.exports = function () {
  var app = this; // eslint-disable-line no-unused-vars
  app.configure(send);
  app.configure(unsubscribe);
};