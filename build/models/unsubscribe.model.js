'use strict';

// unsubscribe-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  var mongooseClient = app.get('mongooseClient');
  var Schema = mongooseClient.Schema;

  var unsubscribe = new Schema({
    email: { type: String, required: true, index: 1 },
    type: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('unsubscribe', unsubscribe);
};