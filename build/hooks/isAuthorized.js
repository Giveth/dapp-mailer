'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return function (hook) {
    var app = hook.app;

    // make sure the authorization header is set
    if (hook.params.headers['authorization'] !== app.get('apiSecret')) {
      throw new _errors2.default.NotAuthenticated('Not authorized');
    }

    return hook;
  };
};