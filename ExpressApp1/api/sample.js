'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('This is sample api call success.');
    console.log(req.query)
});

module.exports = router;
