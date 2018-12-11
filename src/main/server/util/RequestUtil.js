'use strict';

const RequestUtil = {
  getClientRealIp(headers, ip) {
    headers = headers || {};
    const realIp = headers['x-real-ip'] || headers['x-forwarded-for'];

    return realIp || ip;
  }
};

module.exports = RequestUtil;
