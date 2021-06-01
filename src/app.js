const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const winston = require('winston');

winston.configure({
  level: 'info',
  format: winston.format.simple(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console({ level: 'info' }),
  ],
});

import unsubscribeMeService from './services/unsubscribeMeService';

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongoose = require('./mongoose');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(mongoose);
app.configure(express.rest());
app.configure(socketio());

// Add additional headers
app.use(function(req, res, next) {
  req.feathers.headers = req.headers;
  next();
});

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);

// Set up our services (see `services/index.js`)
app.configure(services);

app.hooks(appHooks);

// set view engine to react for server side rendering
if (app.get('env') === 'development') {
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
} else {
  app.set('view engine', 'js');
  app.engine('js', require('express-react-views').createEngine());
}
app.set('views', path.join(__dirname, 'views'));

// route for our unsubscribe page
app.get('/unsubscribe-me', (req, res) => {
  unsubscribeMeService(app, req, res);
});

app.use(express.notFound({verbose: false}));

// Configure a middleware for 404s and the error handler
const publicUri = app.get('public');

app.use(express.errorHandler({
  html: {
    // console.log('error', error);
    // strings should point to html files
    403: publicUri + '/403.html',
    404: publicUri + '/404.html',
    500: publicUri + '/404.html'
  }
}));


module.exports = app;
