const mongoose = require('mongoose');
const mt = require('./InitMailTime');
const logger = require('winston');

module.exports = function () {
  const app = this;

  const mongoUrl = app.get('mongodb');

  logger.info('Using mongo url', mongoUrl);

  mongoose.connect(mongoUrl,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  const db = mongoose.connection;

  db.on('open', function() {
    // we need to create the mailtime server and client after database loads
    // because db instance needs to be passed
    mt.createServer(app, db);
    mt.createClient(app, db);
  }).catch(err => logger.error('could not connect to mongo', err));

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
