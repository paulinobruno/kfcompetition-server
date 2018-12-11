'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema(require('domain/Competitor'));

module.exports = mongoose.model('Competitor', schema);
