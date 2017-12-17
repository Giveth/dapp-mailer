// Initializes the `schedule` service on path `/schedule`
const createService = require('feathers-mongoose');
const createModel = require('../../models/schedule.model');
const hooks = require('./schedule.hooks');
const filters = require('./schedule.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'schedule',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/schedule', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('schedule');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
