const mongoose = require('mongoose');
const mt = require('./InitMailTime');

module.exports = function () {
  const app = this;

  let promise = mongoose.connect(app.get('mongodb'), {
    useMongoClient: true
  });

  promise.then(function(db) {
    console.log('db ready', MailTime);
    // // app.set('MongoDB', db);
    // mt.createServer(app, db);
    // mt.createClient(app, db);    
  })

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};