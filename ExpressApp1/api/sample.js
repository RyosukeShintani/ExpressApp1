'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('This is sample api call success.');
});

module.exports = router;
