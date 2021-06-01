// Initializes the `send` service on path `/send`
const createService = require('./send.class.js');
const hooks = require('./send.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'send',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/send', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('send');

  service.hooks(hooks);
};
