import onlyInternal from './../../hooks/onlyInternal';

module.exports = {
  before: {
    all: [],
    find: [onlyInternal()],
    get: [onlyInternal()],
    create: [],
    update: [onlyInternal()],
    patch: [onlyInternal()],
    remove: [onlyInternal()]
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
