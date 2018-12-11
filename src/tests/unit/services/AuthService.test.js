'use strict';

const { OK } = require('controllers/HttpStatus');
const service = require('services/AuthService');

describe('AuthService', () => {
  it('#accessWithPassword', done => {
    service.accessWithPassword('expired@paal.com', '123')
      .then(() => done());
  });

  it('#refreshIt', done => {
    const theToken = {
      refresh_token: '123',
      save() {
        return Promise.resolve({});
      }
    };

    service.refreshIt(theToken)
      .then(() => done());
  });
});
