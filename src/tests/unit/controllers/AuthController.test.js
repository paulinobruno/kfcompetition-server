'use strict';

const service = require('services/AuthService');
const controller = proxyquire('controllers/AuthController', {
  'services/AuthService': service
});

require('../../auth-base');

describe('AuthController', () => {
  beforeEach(() => {
    sinon.stub(service, 'accessWithPassword');
  });

  afterEach(() => {
    service.accessWithPassword.restore();
  });

  describe('#doLogin', () => {
    it('given valid username/password then should return an access token', done => {
      const request = {
        body: {
          username: 'username',
          password: 'password'
        }
      };
      const response = {
        json(obj) {
          assert.deepEqual(obj, { access_token: 'bearer-token' });
          done();
        }
      };
      const next = () => {
        done();
        sinon.stub().throws('ShouldNotBeCalledError');
      };

      service.accessWithPassword.withArgs('username', 'password')
        .resolves({ access_token: 'bearer-token' });

      controller.doLogin(request, response, next);
    });

    it('given invalid username/password then should handle properly', done => {
      const request = {
        body: {
          username: 'username1',
          password: 'password'
        }
      };

      service.accessWithPassword.withArgs('username1', 'password')
        .rejects(new Error('Unauthorized'));

      controller.doLogin(request, {}, err => {
        assert.ok(err);
        assert.equal(err.message, 'Unauthorized');
        done();
      });
    });
  });
});
