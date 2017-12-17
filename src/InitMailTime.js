const nodemailer = require('nodemailer');
const MailTime = require('mail-time');
const transports = [];

transports.push(nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  from: 'no-reply@giveth.io',
  auth: {
    user: 'postmaster@mg.giveth.io',
    pass: '6a21583a4a3b9850bbd3a12037232f5e'
  },
}));

const createServer = (app, db) => {
  const mongo = app.get('MongoDB');

  const MailQueue = new MailTime({
    db, // MongoDB
    type: 'server',
    strategy: 'balancer', // Transports will be used in round robin chain
    transports,
    from(transport) {
      // To pass spam-filters `from` field should be correctly set
      // for each transport, check `transport` object for more options
      return '"Awesome App" <' + transport._options.from + '>';
    },
    concatEmails: true, // Concatenate emails to the same addressee
    concatDelimiter: '<h1>{{{subject}}}</h1>', // Start each concatenated email with it's own subject
    template: MailTime.Template // Use default template
  });
}

const createClient = (app,   db) => {
  console.log('MongoDB', call);  
  const mongo = app.get('MongoDB');


  const MailQueue = new MailTime({
    mongo, // MongoDB
    type: 'client',
    strategy: 'balancer', // Transports will be used in round robin chain
    concatEmails: true // Concatenate emails to the same address
  });  

  app.set('MailQueue', MailQueue);
}

module.exports = {
  createServer,
  createClient
}