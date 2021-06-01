// Initializes the `unsubscribe` service on path `/unsubscribe`
const createService = require('feathers-mongoose');
const createModel = require('../../models/unsubscribe.model');
const hooks = require('./unsubscribe.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'unsubscribe',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/unsubscribe', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('unsubscribe');

  service.hooks(hooks);
};
