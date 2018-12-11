'use strict';

const debug = require('debug')('paal:config:mongo');
const mongoose = require('mongoose');

module.exports = (connectionURI, options = {}) => {
  return mongoose.connect(connectionURI, { useNewUrlParser: true, ...options })
    .then(conn => {
      debug('Connection with MongoDB Server estabilished.');
      mongoose.set('useCreateIndex', true);
      return Promise.resolve(conn);
    })
    .catch(err => {
       debug('Error connectiong to MongoDB server: ', {
         connectionURI,
         err
       });

       return Promise.reject(err);
    });
};
