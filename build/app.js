'use strict';

var _unsubscribeMeService = require('./services/unsubscribeMeService');

var _unsubscribeMeService2 = _interopRequireDefault(_unsubscribeMeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var favicon = require('serve-favicon');
var compress = require('compression');
var cors = require('cors');
var helmet = require('helmet');
var bodyParser = require('body-parser');

var feathers = require('feathers');
var configuration = require('feathers-configuration');
var hooks = require('feathers-hooks');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');

var errorHandler = require('feathers-errors/handler');
var notFound = require('feathers-errors/not-found');


var middleware = require('./middleware');
var services = require('./services');
var appHooks = require('./app.hooks');

var mongoose = require('./mongoose');

var app = feathers();

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
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(mongoose);
app.configure(rest());
app.configure(socketio());

// Add additional headers
app.use(function (req, res, next) {
  req.feathers.headers = req.headers;
  req.useragent = req.useragent;
  next();
});

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);

// Set up our services (see `services/index.js`)
app.configure(services);

// set view engine to react for server side rendering
if (app.get('env') === 'development') {
  app.set('view engine', 'jsx');
  app.engine('jsx', require('express-react-views').createEngine());
} else {
  app.set('view engine', 'js');
  app.engine('js', require('express-react-views').createEngine());
}

// Configure a middleware for 404s and the error handler
var publicUri = app.get('public');

app.use(errorHandler({
  html: {
    // strings should point to html files
    403: publicUri + "/403.html",
    404: publicUri + "/404.html"
  }
}));

// route for our unsubscribe page
app.get('/unsubscribe-me', function (req, res) {
  (0, _unsubscribeMeService2.default)(app, req, res);
});

app.hooks(appHooks);

module.exports = app;