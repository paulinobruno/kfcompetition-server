'use strict';

const router = require('express').Router();
const controller = require('controllers/AuthController');

router.post('/login', controller.doLogin);

module.exports = router;
