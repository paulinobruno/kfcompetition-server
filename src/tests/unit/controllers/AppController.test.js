'use strict';

const { handleErrors } = require('controllers/AppController');
const { INTERNAL_SERVER_ERROR } = require('controllers/HttpStatus');

describe('AppController', () => {
  describe('#handleErrors', () => {
    const requestMock = {};

    it('status code', () => {
      handleErrors({ status: 123 }, requestMock, _mockResponse(123));
      handleErrors({ response: { status: 456 } }, requestMock, _mockResponse(456));
      handleErrors({}, requestMock, _mockResponse(INTERNAL_SERVER_ERROR));
    });

    const _mockResponse = (targetStatusCode) => ({
      status(code) {
        assert.equal(code, targetStatusCode);
        return this;
      },
      setHeader() {},
      send() {}
    });
  });
});
