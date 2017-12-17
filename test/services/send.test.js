const assert = require('assert');
const app = require('../../src/app');

describe('\'send\' service', () => {
  it('registered the service', () => {
    const service = app.service('send');

    assert.ok(service, 'Registered the service');
  });
});
