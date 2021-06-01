const assert = require('assert');
const fetch = require('node-fetch');
const app = require('../src/app');

describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return fetch('http://localhost:3030')
      .then(res => res.text())
      .then(body =>
        assert.ok(body.indexOf('<html>') !== -1)
      );
  });

  describe('404', function() {
    it('shows a 404 HTML page', () => {
      return fetch('http://localhost:3030/path/to/nowhere', {
        headers: {
          'Accept': 'text/html'
        }
      }).then(res => {
        assert.equal(res.status, 404);
        res.text().then(error => {
          assert.ok(error);
          assert.ok(error.indexOf('<html>') !== -1);
        });
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      return fetch('http://localhost:3030/path/to/nowhere', {
        json: true
      }).then(res => {
        assert.equal(res.status, 404);
        res.json().then(error => {
          assert.equal(error.code, 404);
          assert.equal(error.message, 'Page not found');
          assert.equal(error.name, 'NotFound');
        });
      });
    });
  });
});
