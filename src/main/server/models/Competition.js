'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domain/Competition'));

module.exports = mongoose.model('Competition', schema);
