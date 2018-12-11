'use strict';

const def = {
  username: {
    type: String,
    unique: true
  },
  appToken: {
    type: String,
    unique: true
  },
  access_token: String,
  refresh_token: String,
  id_token: String,
  scope: String,
  expires_in: Number,
  token_type: String
};

module.exports = def;
