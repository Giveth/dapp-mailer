const nodemailer = require('nodemailer');
const MailTime = require('mail-time');
const transports = [];

const createServer = (app, db) => {
  console.log('creating mailtime server');  

  transports.push(nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    from: app.get('mailSender'),
    auth: {
      user: app.get('nodemailer').transportUser,
      pass: app.get('nodemailer').transportPass
    },
  }));

  const MailQueue = new MailTime({
    db, // MongoDB
    type: 'server',
    strategy: 'backup', // Transports will be used in round robin chain
    transports,
    from() {
      // To pass spam-filters `from` field should be correctly set
      // for each transport, check `transport` object for more options
      return app.get('mailSender');
    },
    concatEmails: false, // Concatenate emails to the same addressee
    debug: true
  });
}

const createClient = (app, db) => {
  console.log('creating mailtime client mqClient');  

  const MailQueue = new MailTime({
    db, // MongoDB
    transports,
    type: 'client',
    debug: true
  });  

  app.set('mqClient', MailQueue);
}

module.exports = {
  createServer,
  createClient
}