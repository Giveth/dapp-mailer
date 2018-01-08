'use strict';

// Initializes the `send` service on path `/send`
var createService = require('./send.class.js');
var hooks = require('./send.hooks');
var filters = require('./send.filters');

module.exports = function () {
  var app = this;
  var paginate = app.get('paginate');

  var options = {
    name: 'send',
    paginate: paginate
  };

  // Initialize our service with any options it requires
  app.use('/send', createService(options));

  // Get our initialized service so that we can register hooks and filters
  var service = app.service('send');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};