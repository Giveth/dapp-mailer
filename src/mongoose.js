const mongoose = require('mongoose');
const mt = require('./InitMailTime');

module.exports = function () {
  const app = this;

  let promise = mongoose.connect(app.get('mongodb'), {
    useMongoClient: true
  });

  promise.then(function(db) {
    // we need to create the mailtime server and client after database loads
    // because db instance needs to be passed
    mt.createServer(app, db);
    mt.createClient(app, db);    
  })

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};