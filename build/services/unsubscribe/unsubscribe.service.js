'use strict';

// Initializes the `unsubscribe` service on path `/unsubscribe`
var createService = require('feathers-mongoose');
var createModel = require('../../models/unsubscribe.model');
var hooks = require('./unsubscribe.hooks');
var filters = require('./unsubscribe.filters');

module.exports = function () {
  var app = this;
  var Model = createModel(app);
  var paginate = app.get('paginate');

  var options = {
    name: 'unsubscribe',
    Model: Model,
    paginate: paginate
  };

  // Initialize our service with any options it requires
  app.use('/unsubscribe', createService(options));

  // Get our initialized service so that we can register hooks and filters
  var service = app.service('unsubscribe');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};