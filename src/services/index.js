const send = require('./send/send.service.js');
const unsubscribe = require('./unsubscribe/unsubscribe.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(send);
  app.configure(unsubscribe);
};
