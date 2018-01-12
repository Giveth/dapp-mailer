const mongoose = require('mongoose');
const mt = require('./InitMailTime');
const logger = require('winston');

module.exports = function () {
  const app = this;

  const mongoUrl = app.get('mongodb');

  logger.info('Using mongo url', mongoUrl);

  let promise =  mongoose.connect(mongoUrl, {
    useMongoClient: true
  });  

  promise.then(function(db) {
    // we need to create the mailtime server and client after database loads
    // because db instance needs to be passed
    mt.createServer(app, db);
    mt.createClient(app, db);    
  }).catch(() => logger.error('could not connect to mongo'));

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};