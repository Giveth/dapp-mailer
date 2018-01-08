'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (requiredKeys, data) {
  if (!requiredKeys.every(function (k) {
    return k in data;
  })) {
    throw new _errors2.default.BadRequest();
  }
};