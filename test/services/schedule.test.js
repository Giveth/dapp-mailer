const assert = require('assert');
const app = require('../../src/app');

describe('\'schedule\' service', () => {
  it('registered the service', () => {
    const service = app.service('schedule');

    assert.ok(service, 'Registered the service');
  });
});
