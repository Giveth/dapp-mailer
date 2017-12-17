import isAuthorized from './../../hooks/isAuthorized';
const fs = require('fs');

const loadTemplate = (app, type) => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.PWD + app.get('templates') + '/' + type + '.html', (err, data) => {
      if (err) { reject() };
      resolve(data.toString());
    });
  })
}

const sendEmail = () => (hook) => {
  const { params, data, service, app } = hook;

  const host = app.get('env') === 'development' ? "127.0.0.1:3030" : app.get('host');
  console.log('host', host);

  return loadTemplate(app, data.type).then((template) => {
    app.get('mqClient').sendMail({
      to: 'satya.vh@gmail.com',
      subject: 'You\'ve got an email!',
      user: "Satya",
      html: template,
      template: "{{{html}}}",
      baseUrl: host
    }, (err, res) => {
      console.log('queue email', err, res);
    });  

    hook.result = {
      success: true
    }  

    return hook;
  })
}

module.exports = {
  before: {
    all: [isAuthorized()],
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
