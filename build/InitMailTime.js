'use strict';

var nodemailer = require('nodemailer');
var MailTime = require('mail-time');
var transports = [];

transports.push(nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  from: 'no-reply@giveth.io',
  auth: {
    user: 'postmaster@mg.giveth.io',
    pass: '3c6aeaaa77ed25ab504909cc43b5f1d7'
  }
}));

var createServer = function createServer(app, db) {
  console.log('creating mailtime server');

  var MailQueue = new MailTime({
    db: db, // MongoDB
    type: 'server',
    strategy: 'backup', // Transports will be used in round robin chain
    transports: transports,
    from: function from() {
      // To pass spam-filters `from` field should be correctly set
      // for each transport, check `transport` object for more options
      return "Giveth <no-reply@giveth.io>";
    },

    concatEmails: false, // Concatenate emails to the same addressee
    debug: true
  });
};

var createClient = function createClient(app, db) {
  console.log('creating mailtime client mqClient');

  var MailQueue = new MailTime({
    db: db, // MongoDB
    transports: transports,
    type: 'client',
    debug: true
  });

  app.set('mqClient', MailQueue);
};

module.exports = {
  createServer: createServer,
  createClient: createClient
};