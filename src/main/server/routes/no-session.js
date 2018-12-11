'use strict';

const router = require('express').Router();
const controller = require('controllers/AppController');

router.get('/health', controller.health);
router.get('/version', controller.version);

module.exports = router;
