'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return function (context) {
    if (context.params.provider !== undefined) {
      throw new _feathersErrors2.default.Forbidden();
    }

    return context;
  };
};