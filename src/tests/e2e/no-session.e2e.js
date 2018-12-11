'use strict';

const pkg = require('../../../package');
const { OK, UNAUTHORIZED, NOT_FOUND } = require('controllers/HttpStatus');

describe('(no session endpoints)', () => {
  it('/health', done => {
    const expectedKeys = [
      'status',
      'pid',
      'memory',
      'uptime',
      'env',
      'host',
      'hostname',
      'version'
    ].sort();

    request
      .get('/health')
      .expect(OK)
      .end((err, response) => {
        const responseKeys = Object.keys(response.body).sort();

        assert.deepEqual(responseKeys, expectedKeys);
        done();
      });
  });

  it('/version', done => {
    const { version } = pkg;
    request.get('/version')
      .expect(OK, { version })
      .end(done);
  });

  it('/x/y/z should be unauthorized', done => {
    request
      .get('/x/y/z')
      .expect(UNAUTHORIZED)
      .end(done);
  });

  it('/x/y/z with invalid token should be unauthorized', done => {
    request
      .get('/x/y/z')
      .set('Authorization', 'Bearer xyz')
      .expect(UNAUTHORIZED)
      .end(done);
  });

  it('/x/y/z with expired token should be not found', done => {
    request
      .get('/x/y/z')
      .set('Authorization', 'Bearer expired-token')
      .expect(NOT_FOUND)
      .end(done);
  });
});
