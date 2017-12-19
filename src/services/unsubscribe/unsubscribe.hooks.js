import onlyInternal from './../../hooks/onlyInternal';

const unsubscribe = () => (hook) => {
  const { params, data, service, app } = hook;
  
  console.log(params, data);  
  return hook;
}


module.exports = {
  before: {
    all: [],
    find: [unsubscribe()],
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
