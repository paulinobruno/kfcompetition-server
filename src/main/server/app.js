'use strict';

global.APP_ROOT = require('path').join(`${__dirname}/../`);

const debug = require('debug')('paal:app');

const express = require('express');
const bearerToken = require('express-bearer-token');
const app = express();

const compression = require('compression');
const bodyParser = require('body-parser');

const AppController = require('controllers/AppController');
const AuthController = require('controllers/AuthController');

const NODE_ENV = process.env.NODE_ENV;

global.logger = require('config/logger');

app.set('json replacer', null);
app.set('json spaces', false);
app.set('port', process.env.PORT);

app.disable('etag');
app.disable('x-powered-by');

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(bearerToken());

app.use(require('routes/no-session'));
app.use(AuthController.checkAccessTokenState, AppController.unauthorized);
app.use(require('routes'));

app.use(AppController.notFound);
app.use(AppController.handleErrors);

module.exports = app;
