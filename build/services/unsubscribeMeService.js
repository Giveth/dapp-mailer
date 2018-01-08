'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, req, res) {
  var _req$query = req.query,
      recipient = _req$query.recipient,
      type = _req$query.type;

  var service = app.service('/unsubscribe');
  var message = void 0;

  // check if there's already an unsubscribe
  return service.find({ query: { email: recipient, type: type } }).then(function (unsubscribes) {

    if (unsubscribes.data.length > 0) {
      res.render('UnsubscribeMessage', {
        message: 'You are already unsubscribed :-)'
      });
    } else {

      // create a new unsubscribe for this email
      service.create({
        email: recipient,
        type: type
      }).then(function (e) {
        res.render('UnsubscribeMessage', {
          message: "You've been successfully unsubscribed from this type of email!"
        });
      }).catch(function (e) {
        res.render('UnsubscribeMessage', {
          message: "Oops, something went wrong :-( Please contact support at support@giveth.io"
        });
      });
    }
  });
};

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }