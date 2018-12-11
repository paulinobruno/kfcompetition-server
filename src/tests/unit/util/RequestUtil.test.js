'use strict';

const util = require('util/RequestUtil');

describe('RequestUtil', () => {
  describe('#getClientRealIp', () => {
    const defaultIp = '127.0.0.1';

    it('given no headers supplied then should return supplied ip', () => {
      const realIp = util.getClientRealIp(null, defaultIp);

      assert.equal(realIp, defaultIp);
    });

    it('given headers with none of expected headers present then should return supplied ip', () => {
      const realIp = util.getClientRealIp({ accept: 'application/json' }, defaultIp);

      assert.equal(realIp, defaultIp);
    });

    it('given headers with one of expected headers present then should return it', () => {
      const currIp = '192.168.1.10';
      assert.equal(util.getClientRealIp({ 'x-real-ip': currIp }, defaultIp), currIp);
      assert.equal(util.getClientRealIp({ 'x-forwarded-for': currIp }, defaultIp), currIp);
    });

    it('given both headers of expected headers then should return "x-real-ip"', () => {
      const expected = '10.0.0.1';
      const headers = {
        'x-real-ip': expected,
        'x-forwarded-for': '192.168.1.250'
      };

      assert.equal(util.getClientRealIp(headers, defaultIp), expected);
    });
  });
});
