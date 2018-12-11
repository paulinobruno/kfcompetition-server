'use strict';

const log4js = require('log4js');

const _configureLogger = level =>
  log4js.configure({
    appenders: {
      out: { type: 'stdout' },
      app: {
        type: 'dateFile',
        filename: 'logs/application.log',
        pattern: '.yyyy-MM-dd'
      }
    },
    categories: {
      default: {
        appenders: ['out', 'app'],
        level
      }
    }
  });

_configureLogger('debug');

module.exports = log4js.getLogger();
