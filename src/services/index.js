const send = require('./send/send.service.js');

const schedule = require('./schedule/schedule.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(send);
  app.configure(schedule);
};
