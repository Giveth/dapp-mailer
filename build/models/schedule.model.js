'use strict';

// schedule-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  var mongooseClient = app.get('mongooseClient');
  var Schema = mongooseClient.Schema;

  var schedule = new Schema({
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('schedule', schedule);
};