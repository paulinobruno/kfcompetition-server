'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domains/Token'));

module.exports = mongoose.model('Token', schema);
