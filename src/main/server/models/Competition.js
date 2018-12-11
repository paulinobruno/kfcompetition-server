'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domains/Competition'));

module.exports = mongoose.model('Competition', schema);
