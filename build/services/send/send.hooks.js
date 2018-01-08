'use strict';

var _isAuthorized = require('./../../hooks/isAuthorized');

var _isAuthorized2 = _interopRequireDefault(_isAuthorized);

var _checkRequiredKeys = require('./../../hooks/checkRequiredKeys');

var _checkRequiredKeys2 = _interopRequireDefault(_checkRequiredKeys);

var _errors = require('@feathersjs/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var Mustache = require('mustache');
var _ = require('lodash');


var loadTemplate = function loadTemplate(app, type) {
  return new Promise(function (resolve, reject) {
    fs.readFile(process.env.PWD + app.get('templates') + '/' + type + '.html', function (err, data) {
      if (err || data === undefined) {
        reject();
        return;
      };
      resolve(data.toString());
    });
  });
};

var sendEmail = function sendEmail() {
  return function (hook) {
    var params = hook.params,
        data = hook.data,
        service = hook.service,
        app = hook.app;

    var host = app.get('env') === 'development' ? "http://127.0.0.1:" + app.get('port') : app.get('host');
    var unsubscribeUrl = host + '/unsubscribe-me?recipient=' + data.recipient + '&type=' + data.type;

    (0, _checkRequiredKeys2.default)(['recipient', 'subject', 'type'], data);

    // props should come from data
    var templateProps = _.extend(data, {
      baseUrl: host,
      unsubscribeUrl: unsubscribeUrl
    });

    // first we do a quick check if recipient is unsubscribed for this type of email before sending
    return app.service('/unsubscribe').find({ query: { email: data.recipient, type: data.type, $limit: 0 } }).then(function (unsubscribes) {
      if (unsubscribes.total > 0) {
        hook.result = {
          success: false,
          reason: 'recipient is unsubscribed'
        };
        return hook;
      }

      console.log('proceed with sending', unsubscribeUrl);

      return loadTemplate(app, data.type).then(function (template) {

        // render the template Mustach tags with the props
        // we don't use MailQueue for rendering props, it does not work
        template = Mustache.render(template, templateProps);

        // now send the email
        app.get('mqClient').sendMail({
          to: data.recipient,
          subject: data.subject,
          html: template
        });

        hook.result = { success: true };
        return hook;
      }).catch(function (e) {
        hook.result = {
          success: false,
          reason: 'email type not found'
        };
        return hook;
      });
    }).catch(function (e) {
      return console.log(e);
    });
  };
};

module.exports = {
  before: {
    all: [(0, _isAuthorized2.default)()],
    find: [],
    get: [],
    create: [sendEmail()],
    update: [],
    patch: [],
    remove: []
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