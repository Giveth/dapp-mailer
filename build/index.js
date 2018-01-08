'use strict';

/* eslint-disable no-console */
var logger = require('winston');
var app = require('./app');
var port = app.get('port');
var server = app.listen(port);

process.on('unhandledRejection', function (reason, p) {
  return logger.error('Unhandled Rejection at: Promise ', p, reason);
});

server.on('listening', function () {
  return logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
});