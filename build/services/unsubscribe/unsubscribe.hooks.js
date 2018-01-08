'use strict';

var _onlyInternal = require('./../../hooks/onlyInternal');

var _onlyInternal2 = _interopRequireDefault(_onlyInternal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unsubscribe = function unsubscribe() {
  return function (hook) {
    var params = hook.params,
        data = hook.data,
        service = hook.service,
        app = hook.app;


    console.log(params, data);
    return hook;
  };
};

module.exports = {
  before: {
    all: [],
    find: [unsubscribe()],
    get: [(0, _onlyInternal2.default)()],
    create: [],
    update: [(0, _onlyInternal2.default)()],
    patch: [(0, _onlyInternal2.default)()],
    remove: [(0, _onlyInternal2.default)()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};