import isAuthorized from './../../hooks/isAuthorized';
import checkRequiredKeys from './../../hooks/checkRequiredKeys';
const logger = require('winston');
const fs = require('fs');
const Mustache = require('mustache');
const _ = require('lodash');
import errors from '@feathersjs/errors';

const loadTemplate = (app, type) => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.PWD + app.get('templates') + '/' + type + '.html', (err, data) => {
      if (err || data === undefined) { 
        reject(); 
        return 
      };
      resolve(data.toString());
    });
  })
}

const sendEmail = () => (hook) => {
  const { params, data, service, app } = hook;
  const baseUrl = app.get('env') === 'development' ? "http://127.0.0.1:" + app.get('port') : app.get('host');
  const unsubscribeUrl = baseUrl + '/unsubscribe-me?recipient=' + data.recipient + '&type=' + data.unsubscribeType

  logger.info('request sending email', data)

  checkRequiredKeys(['recipient', 'template', 'subject', 'secretIntro', 'unsubscribeType', 'unsubscribeReason'], data);

  // props should come from data
  const templateProps = _.extend(data, {
    baseUrl: baseUrl,
    unsubscribeUrl: unsubscribeUrl     
  })

  // first we do a quick check if recipient is unsubscribed for this type of email before sending
  return app.service('/unsubscribe').find({ query: {email: data.recipient, type: data.unsubscribeType, $limit: 0}})
    .then((unsubscribes) => {
      if(unsubscribes.total > 0) {
        hook.result = {
          success: false,
          reason: 'recipient is unsubscribed'
        }  
        return hook;
      }

      logger.info(`no unsubscribes found for ${data.recipient}, proceed with sending`);

      return loadTemplate(app, data.template)
        .then((template) => {

          // render the template Mustach tags with the props
          // we don't use MailQueue for rendering props, it does not work
          template = Mustache.render(template, templateProps);

          // now send the email
          app.get('mqClient').sendMail({
            to: data.recipient,
            subject: data.subject,
            html: template,
          });

          hook.result = { success: true }  
          return hook;
        })
        .catch((e) => {
          logger.error('Email type not found ', e)
          
          hook.result = {
            success: false,
            reason: 'email type not found'
          }  
          return hook;      
        })

    })
    .catch((e) => logger.error('Could not query unsubscribe service ', e));        
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
